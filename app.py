from flask import Flask, render_template, request, jsonify, send_from_directory
import requests
import os

app = Flask(__name__, template_folder='templates', static_folder='static')

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
def index():
    return render_template('index.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory('static', 'favicon.ico')

@app.route('/send_order', methods=['POST'])
def send_order():
    data = request.json
    waiter = data.get('waiter', None)
    message = format_order_message(data)

    # Надсилаємо в головний канал
    main_response = send_to_telegram(TELEGRAM_MAIN_CHANNEL_ID, message)

    # Надсилаємо офіціанту, якщо знайдений
    if waiter and waiter in WAITER_CHANNELS:
        send_to_telegram(WAITER_CHANNELS[waiter], message)

    if main_response.ok:
        return jsonify({"status": "success"})
    else:
        return jsonify({"status": "error", "message": main_response.text}), 500

def send_to_telegram(chat_id, text):
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML"
    }
    return requests.post(url, data=payload)

def format_order_message(data):
    text = f"<b>Нове замовлення</b>\n"
    text += f"<b>Час:</b> {data.get('time', '-')}\n"
    text += f"<b>Номер браслету:</b> {data.get('bracelet', '-')}\n"
    text += f"<b>Місце посадки:</b> {data.get('seat', '-')}\n"
    text += f"<b>Коментар клієнта:</b> {data.get('comment', '-')}\n"
    text += f"<b>Офіціант:</b> {data.get('waiter', '-')}\n\n"
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
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)
