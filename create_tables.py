import os
import sys

try:
    # Добавляем текущую директорию в путь Python
    sys.path.append(os.path.dirname(os.path.abspath(__file__)))

    from app import app, db, User


    def create_tables_and_users():
        with app.app_context():
            try:
                # Создаем таблицы
                db.create_all()
                print("Таблицы созданы успешно!")

                # Проверяем, есть ли уже пользователь admin
                if User.query.filter_by(username='admin').first() is None:
                    # Создаем администратора
                    admin = User(
                        username='admin',
                        name='Адміністратор',
                        password='admin_password',
                        role='admin'
                    )
                    db.session.add(admin)
                    print("Администратор создан")

                # Создаем официантов
                waiters = [
                    {'username': 'nazar', 'name': 'Назар', 'password': 'nazar_pass'},
                    {'username': 'karina', 'name': 'Каріна', 'password': 'karina_pass'},
                    {'username': 'yura', 'name': 'Юра', 'password': 'yura_pass'},
                ]

                for waiter in waiters:
                    if User.query.filter_by(username=waiter['username']).first() is None:
                        user = User(
                            username=waiter['username'],
                            name=waiter['name'],
                            password=waiter['password'],
                            role='waiter'
                        )
                        db.session.add(user)
                        print(f"Официант {waiter['name']} создан")

                db.session.commit()
                print("Пользователи созданы успешно!")

            except Exception as e:
                print(f"Ошибка при создании таблиц или пользователей: {str(e)}")
                db.session.rollback()


    if __name__ == '__main__':
        create_tables_and_users()

except ImportError as e:
    print(f"Ошибка импорта: {str(e)}")
    print("Убедитесь, что все зависимости установлены:")
    print("pip install flask flask-sqlalchemy flask-login psycopg2-binary")
except Exception as e:
    print(f"Неизвестная ошибка: {str(e)}")