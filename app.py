from flask import Flask, render_template, request, jsonify, send_from_directory, redirect, url_for, flash, abort
import requests
import os
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user

app = Flask(__name__, template_folder='templates', static_folder='static')

# Конфигурация приложения
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_strong_secret_key_here'  # Замените на надежный ключ!

# Инициализация расширений
db = SQLAlchemy(app)
migrate = Migrate(app, db)
login_manager = LoginManager(app)
login_manager.login_view = 'login'


# Модели данных
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(20), default='waiter')  # waiter или admin


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    bracelet_number = db.Column(db.String(20), nullable=False)
    seat_place = db.Column(db.String(50), nullable=False)
    comment = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=db.func.now())
    status = db.Column(db.String(20), default='new')  # new, partial, completed
    waiter_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    waiter = db.relationship('User', backref=db.backref('orders', lazy=True))
    items = db.relationship('OrderItem', backref='order', lazy=True)


class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'))
    item_name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    issued_quantity = db.Column(db.Integer, default=0)
    price = db.Column(db.Float, nullable=False)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


# Телеграм-бот токен та основний канал
TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "8084003144:AAHiRpUk3yNxs4_AJS1eT4AsD3yMy_zrOT8")
TELEGRAM_MAIN_CHANNEL_ID = "@BaliyaOrderChanel"

# Словник офіціантів та їх каналів
WAITER_CHANNELS = {
    "Nazar": "@Baliya_Nazar",
    "Karina": "@Baliya_Karina",
    "Oleh": "@Baliya_Yura"
}


@app.route('/')
@login_required
def index():
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()

        if user and user.password == password:
            login_user(user)
            return redirect(url_for('index'))
        else:
            flash('Невірний логін або пароль', 'danger')
    return render_template('login.html')


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))


@app.route('/send_order', methods=['POST'])
@login_required
def send_order():
    data = request.json
    try:
        # Создаем новый заказ
        new_order = Order(
            bracelet_number=data.get('bracelet', ''),
            seat_place=data.get('seat', ''),
            comment=data.get('comment', ''),
            waiter_id=current_user.id,
            status='new'
        )
        db.session.add(new_order)
        db.session.flush()  # Получаем ID заказа

        # Добавляем элементы заказа
        for item in data.get('order', []):
            order_item = OrderItem(
                order_id=new_order.id,
                item_name=item['name'],
                quantity=item['qty'],
                price=item['price']
            )
            db.session.add(order_item)

        db.session.commit()

        # Отправка в Telegram
        message = format_order_message(data,current_user)
        main_response = send_to_telegram(TELEGRAM_MAIN_CHANNEL_ID, message)

        if current_user.username in WAITER_CHANNELS:
            send_to_telegram(WAITER_CHANNELS[current_user.username], message)

        return jsonify({"status": "success"})

    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500


def send_to_telegram(chat_id, text):
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML"
    }
    return requests.post(url, data=payload)

def format_order_message(data, user):
    text = f"<b>Нове замовлення</b>\n"
    text += f"<b>Час:</b> {data.get('time', '-')}\n"
    text += f"<b>Номер браслету:</b> {data.get('bracelet', '-')}\n"
    text += f"<b>Місце посадки:</b> {data.get('seat', '-')}\n"
    text += f"<b>Коментар клієнта:</b> {data.get('comment', '-')}\n"
    text += f"<b>Офіціант:</b> {user.name} (@{user.username})\n\n"
    text += "<b>Замовлення:</b>\n"

    for item in data.get('order', []):
        name = item.get('name')
        qty = item.get('qty')
        price = item.get('price')
        text += f"{name} - {qty} × {price} грн = {qty * price} грн\n"

    total = sum(item['qty'] * item['price'] for item in data.get('order', []))
    text += f"\n<b>Загальна сума:</b> {total} грн"
    return text



@app.route('/orders')
@login_required
def view_orders():
    return render_template('orders.html')


@app.route('/api/orders')
@login_required
def get_orders_api():
    status_filter = request.args.get('status', 'all')

    base_query = Order.query.join(User)

    # Фильтрация по статусу
    if status_filter != 'all':
        base_query = base_query.filter(Order.status == status_filter)

    # Для официантов показываем только их заказы
    if current_user.role == 'waiter':
        base_query = base_query.filter(Order.waiter_id == current_user.id)

    orders = base_query.order_by(Order.created_at.desc()).all()

    result = []
    for order in orders:
        items = OrderItem.query.filter_by(order_id=order.id).all()
        total = sum(item.price * item.quantity for item in items)

        result.append({
            'id': order.id,
            'created_at': order.created_at.isoformat(),
            'bracelet_number': order.bracelet_number,
            'seat_place': order.seat_place,
            'status': order.status,
            'waiter_name': order.waiter.name,
            'items': [{
                'item_name': item.item_name,
                'quantity': item.quantity,
                'price': item.price,
                'issued_quantity': item.issued_quantity
            } for item in items],
            'total': total
        })

    return jsonify(result)


def get_status_text(status):
    statuses = {
        'new': 'Новий',
        'partial': 'Частково',
        'completed': 'Виконано'
    }
    return statuses.get(status, status)


@app.route('/order/<int:order_id>')
@login_required
def order_detail(order_id):
    order = Order.query.get_or_404(order_id)

    # Проверка прав доступа
    if current_user.role == 'waiter' and order.waiter_id != current_user.id:
        abort(403)

    order_items = OrderItem.query.filter_by(order_id=order_id).all()
    total = sum(item.price * item.quantity for item in order_items)

    return render_template(
        'order_detail.html',
        order=order,
        order_items=order_items,
        total=total,
        get_status_text=get_status_text
    )


@app.route('/api/order_item/<int:item_id>/mark_issued', methods=['POST'])
@login_required
def mark_item_issued(item_id):
    item = OrderItem.query.get_or_404(item_id)
    order = Order.query.get(item.order_id)

    # Проверка прав доступа
    if current_user.role == 'waiter' and order.waiter_id != current_user.id:
        return jsonify({'error': 'Forbidden'}), 403

    item.issued_quantity += 1

    # Обновляем статус заказа
    if item.issued_quantity < item.quantity:
        order.status = 'partial'
    else:
        # Проверяем все ли блюда выданы
        all_issued = all(i.issued_quantity >= i.quantity
                         for i in order.items)
        order.status = 'completed' if all_issued else 'partial'

    db.session.commit()
    return jsonify({'status': 'success'})


@app.route('/api/order/<int:order_id>/complete', methods=['POST'])
@login_required
def complete_order(order_id):
    order = Order.query.get_or_404(order_id)

    # Проверка прав доступа
    if current_user.role == 'waiter' and order.waiter_id != current_user.id:
        return jsonify({'error': 'Forbidden'}), 403

    # Помечаем все блюда как выданные
    for item in order.items:
        item.issued_quantity = item.quantity

    order.status = 'completed'
    db.session.commit()
    return jsonify({'status': 'success'})


@app.cli.command("init-db")
def init_db_command():
    """Создает все таблицы в базе данных"""
    db.create_all()
    print("Таблицы созданы успешно!")


@app.cli.command("create-users")
def create_users_command():
    """Создает начальных пользователей"""
    # Создаем администратора
    admin = User(
        username='admin',
        name='Адміністратор',
        password='admin_password',
        role='admin'
    )

    # Создаем официантов
    waiters = [
        {'username': 'nazar', 'name': 'Назар', 'password': 'nazar_pass'},
        {'username': 'karina', 'name': 'Каріна', 'password': 'karina_pass'},
        {'username': 'yura', 'name': 'Юра', 'password': 'yura_pass'},
    ]

    db.session.add(admin)
    for waiter in waiters:
        user = User(
            username=waiter['username'],
            name=waiter['name'],
            password=waiter['password'],
            role='waiter'
        )
        db.session.add(user)

    db.session.commit()
    print("Пользователи созданы успешно!")

# if __name__ == "__main__":
#     port = int(os.environ.get("PORT", 8000))
#     app.run(host="0.0.0.0", port=port, debug=True)