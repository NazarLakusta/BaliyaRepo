from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

TELEGRAM_BOT_TOKEN = "8084003144:AAHiRpUk3yNxs4_AJS1eT4AsD3yMy_zrOT8"
TELEGRAM_CHANNEL_ID = "@BaliyaOrderChanel"  # Заміни на свій канал

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/send_order', methods=['POST'])
def send_order():
    data = request.json

    # Формуємо текст повідомлення
    text = format_order_message(data)

    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHANNEL_ID,
        "text": text,
        "parse_mode": "HTML"
    }
    response = requests.post(url, data=payload)

    if response.ok:
        return jsonify({"status": "success"})
    else:
        return jsonify({"status": "error", "message": response.text}), 500


def format_order_message(data):
    # Приклад форматування повідомлення в HTML
    text = f"<b>Нове замовлення</b>\n"
    text += f"<b>Час:</b> {data.get('time', '-')}\n"
    text += f"<b>Номер браслету:</b> {data.get('bracelet', '-')}\n"
    text += f"<b>Місце посадки:</b> {data.get('seat', '-')}\n"
    text += f"<b>Коментар клієнта:</b> {data.get('comment', '-')}\n\n"
    text += "<b>Замовлення:</b>\n"

    for item in data.get('order', []):
        name = item.get('name')
        qty = item.get('qty')
        price = item.get('price')
        text += f"{name} - {qty} × {price} грн = {qty * price} грн\n"

    total = sum(item['qty'] * item['price'] for item in data.get('order', []))
    text += f"\n<b>Загальна сума:</b> {total} грн"

    return text


if __name__ == "__main__":
    app.run(debug=True)
