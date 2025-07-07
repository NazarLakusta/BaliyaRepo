const foodCategories = [
  'Салати', 'Піца', 'Дошки', 'Перші страви', 'Закуски до пива', 'Гарячі страви', 'Бургери', 'Пасти', 'Десерти'
];

const drinkCategories = [
  'Коктейлі', 'Алкогольні напої', 'Пиво', 'Безалкогольні напої', 'Гарячі напої'
];

const menuItems = {
  'Салати': [
    { name: 'Цезар з куркою', price: 145 },
    { name: 'Морський', price: 215 },
    { name: 'Із Червоною рибою', price: 250 },
    { name: 'Грецький', price: 130 },
    { name: 'Балія', price: 190 }

  ],
  'Перші страви': [
    { name: 'Сочевичний крем суп', price: 90 },
    { name: 'Грибний крем суп', price: 145 },
    { name: 'Бульйон із равіолі', price: 100 }
  ],
  'Гарячі страви': [
    { name: 'Креветки у вершках', price: 320 },
    { name: 'Лосось з овочами', price: 395 },
    { name: 'Дорадо', price: 325 },
    { name: 'Стейк курячий', price: 165 },
    { name: 'Стейк зі свинини', price: 195 },
    { name: 'Телятина з вишневим', price: 385 },
    { name: 'Картопля фрі', price: 80 },
    { name: 'Рататуй', price: 140 },
    { name: 'Батат фрі', price: 120 },
    { name: 'Запечений камамбер', price: 195 },
  ],
   'Бургери': [
    { name: 'Курячий', price: 230 },
    { name: 'Свинно-яловичний', price: 240 },
     { name: 'Рибний', price: 310 }
  ],
 'Піца': [
  { name: 'Маргарита', sizes: { 'Мала': 109, 'Велика': 175 } },
  { name: 'Пепероні', sizes: { 'Мала': 145, 'Велика': 245 } },
  { name: '4 сира', sizes: { 'Мала': 195, 'Велика': 280 } },
   { name: 'Аморе', sizes: { 'Мала': 194, 'Велика': 244 } },
   { name: 'Мясна', sizes: { 'Мала': 203, 'Велика': 340 } },
   { name: 'Діабло', sizes: { 'Мала': 165, 'Велика': 325 } },
   { name: 'З грушею та дорблю', sizes: { 'Мала': 200, 'Велика': 355 } },
   { name: 'Гавайська', sizes: { 'Мала': 190, 'Велика': 310 } },
   { name: 'З креветками', sizes: { 'Мала': 260, 'Велика': 365 } }
],

  'Дошки': [
    { name: 'Холодна пивна', price: 250 },
    { name: 'Гаряча пивна', price: 360 },
     { name: 'Гаряча мясна', price: 900 }
  ],

   'Закуси до пива': [
    { name: 'Снеки', price: 115 },
    { name: 'Кільця кальмара', price: 350 },
     { name: 'Сирні палички', price: 155 }
  ],


   'Пасти': [
    { name: 'З Морепродуктами', price: 275 },
     { name: 'з Телятиною', price: 215 },
    { name: 'З овочами', price: 100 },
     { name: 'Карбонара', price: 190 }

  ],

     'Десерти': [
    { name: 'Вафлі', price: 180 },
     { name: 'Панкейки', price: 95 },
    { name: 'Сирники', price: 165 },
     { name: 'Морозиво', price: 90 },
     { name: 'Морозиво з фруктами', price: 105 },
  ],

'Коктейлі': [
  { name: 'Блакитна лагуна', price: 150 },
  { name: 'Апероль Спріц', price: 165 },
  { name: 'Маргарита полунична', price: 175 },
  { name: 'Джин Гарден', price: 145 },
  { name: 'Джангл Джус', price: 175 },
  { name: 'Піна Колада', price: 120 },
  { name: 'Піна Колада Б/А', price: 80 },
  { name: 'Мохіто', price: 145 },
  { name: 'Мохіто Б/А', price: 85 },
  { name: 'Балія Неверт Сліп', price: 190 },
  { name: 'Зомбі', price: 190 },
  { name: 'Секс на пляжі', price: 115 },
  { name: 'Черрі Леді', price: 140 },
  { name: 'Нью їр Шайн', price: 140 },
  { name: 'Лонг Айленд', price: 230 },
  { name: 'Екзотік Холідей Б/А', price: 80 },
  { name: 'Джин Тонік', price: 135 },
  { name: 'Морська Хвиля', price: 155 },
  { name: 'Тропік Вайбс', price: 140 },
  { name: 'Тропік Вайбс Б/А', price: 85 },
  { name: 'Брамбл', price: 145 },
  { name: 'Мохіто Єгер', price: 155 },
  { name: 'Віскі Сауер', price: 230 },
  { name: 'Блю Гаваї', price: 175 },
  { name: 'Кокосовий лимонад Б/А', price: 80 },
  { name: 'Зелений Дракон Б/А', price: 85 },
  { name: 'Банановий Шейк Б/А', price: 80 }
],

'Алкогольні напої': [
  { name: 'Джеймсон', price: 115 },
  { name: 'Джек Деніелс', price: 120 },
  { name: 'Джим Бім', price: 110 },
  { name: 'Джим Бім Яблучний', price: 125 },
  { name: 'Козацька Рада', price: 30 },
  { name: 'Президентський Стандарт', price: 40 },
  { name: 'Фінляндія', price: 60 },
  { name: 'Абсолют', price: 70 },
  { name: 'Абсолют Груша', price: 70 },
  { name: 'Бренді Метакса', price: 90 },
  { name: 'Джин Гордонс', price: 100 },
  { name: 'Єгермейстер', price: 90 },
  { name: 'Ром Капітан Морган', price: 80 },
  { name: 'Текіла Сієра Сільвер', price: 120 },
  { name: 'Текіла Сієра Голд', price: 115 },
  { name: 'Просекко 0.75 л', price: 750 },
  { name: 'Мартіні Просекко 0.75 л', price: 950 },
  { name: 'Асті 0.75 л', price: 450 },
  { name: 'Брют 0.75 л', price: 330 },
  { name: 'Шателен Клеман 100 г', price: 65 },
  { name: 'Шарон Блан 100 г', price: 65 },
  { name: 'Вів’єн Руж 100 г', price: 65 },
  { name: 'Сент Турі 100 г', price: 65 }
],

'Пиво': [
  { name: 'Карлсберг 0.3 л', price: 55 },
  { name: 'Карлсберг 0.5 л', price: 70 },
  { name: 'Карлсберг Б/А 0.5 л', price: 80 },
  { name: 'Кроненбург Блан 0.3 л', price: 60 },
  { name: 'Кроненбург Блан 0.5 л', price: 80 },
  { name: 'Корона Екстра 0.33 л', price: 120 },
  { name: 'Грімберген 0.33 л', price: 120 },
  { name: 'Леффе 0.33 л', price: 120 }
],

   'Безалкогольні напої': [
    { name: 'Кока кола 0.5 л.', price: 50 },
    { name: 'Пепсі 0.5 л.', price: 50 },
    { name: 'Спрайт 0.5 л.', price: 50 },
    { name: 'фанта 0.5 л.', price: 50 },
    { name: 'Карпатська джерельна 0.5 л.', price: 45 },
    { name: 'Бонаква 0.5 л.', price: 45 },
    { name: 'Сік в асортименті 1 л.', price: 170 },
    { name: 'Сік в асортименті 200 мл.', price: 35 },
    { name: 'Глясе', price: 85 },
    { name: 'Фрапе', price: 85 },
    { name: 'Мілкшей', price: 85 },
    { name: 'Orange кава', price: 80 },
  ],

  'Гарячі напої': [
    { name: 'Американо', price: 40 },
    { name: 'Американо з молоком', price: 50 },
    { name: 'Еспрессо', price: 35 },
    { name: 'Еспрессо з молоком', price: 45 },
    { name: 'Капучіно', price: 60 },
    { name: 'Лате', price: 60 },
    { name: 'Какао', price: 60 },
    { name: 'Чай в асортименті', price: 40 },
    { name: 'Чай з фруктами і мятою', price: 60 },
    { name: 'Пряний напій', price: 140 },
  ]
};

let currentCategory = '';
let order = [];

const subcategoryMenu = document.getElementById('subcategory-menu');
const itemsContainer = document.getElementById('items-container');
const orderList = document.getElementById('order-list');

function createSubcategoryButtons(categories) {
  subcategoryMenu.innerHTML = '';
  categories.forEach(sub => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-secondary m-1';
    btn.textContent = sub;
    btn.onclick = () => loadItems(sub);
    subcategoryMenu.appendChild(btn);
  });
}

function loadItems(subcategory) {
  currentCategory = subcategory;
  itemsContainer.innerHTML = '';
  const items = menuItems[subcategory] || [];
  items.forEach(item => {
    const hasSizes = item.sizes !== undefined;
    const card = document.createElement('div');
    card.className = 'col-6 col-md-3 mb-3';
    card.innerHTML = `
      <div class="card item-card" onclick='${hasSizes ? `chooseSize(${JSON.stringify(item)})` : `addItem("${item.name}", ${item.price})`}'>
        <div class="card-body text-center">
          <h5>${item.name}</h5>
          <p>${hasSizes ? 'Обрати розмір' : item.price + ' грн'}</p>
        </div>
      </div>
    `;
    itemsContainer.appendChild(card);
  });
}


function addItem(name, price) {
  const found = order.find(i => i.name === name);
  if (found) {
    found.qty++;
  } else {
    order.push({ name, price, qty: 1 });
  }
  renderOrder();
}

function changeQty(name, delta) {
  const item = order.find(i => i.name === name);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) order = order.filter(i => i.name !== name);
  renderOrder();
}

function renderOrder() {
  orderList.innerHTML = '';
  order.forEach(item => {
    const li = document.createElement('li');
    li.className = 'list-group-item order-item';
    li.innerHTML = `
      <span>${item.name} (${item.price} грн)</span>
      <div>
        <button class="btn btn-sm btn-danger order-quantity-btn" onclick="changeQty('${item.name}', -1)">-</button>
        <strong class="mx-2">${item.qty}</strong>
        <button class="btn btn-sm btn-success order-quantity-btn" onclick="changeQty('${item.name}', 1)">+</button>
      </div>
    `;
    orderList.appendChild(li);
  });
}

document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.getAttribute('data-category');
    if (type === 'Їда') createSubcategoryButtons(foodCategories);
    else if (type === 'Напої') createSubcategoryButtons(drinkCategories);
  });
});

// Функція для підрахунку загальної суми
function calculateTotal() {
  return order.reduce((sum, item) => sum + item.price * item.qty, 0);
}

// Функція для показу замовлення у модальному вікні з часом
function showOrderDetails() {
  const braceletNumberInput = document.getElementById('bracelet-number');
  const seatLocationInput = document.getElementById('seat-location');
  const clientCommentInput = document.getElementById('client-comment');

  const braceletNumber = braceletNumberInput.value.trim() || '-';
  const seatLocation = seatLocationInput.value.trim() || '-';
  const clientComment = clientCommentInput.value.trim() || '-';

  if (order.length === 0) {
    alert('Ваше замовлення порожнє!');
    return;
  }

  // Отримуємо поточний час замовлення
  const now = new Date();
  const timeStr = now.toLocaleTimeString();

  let orderHTML = `
    <p><strong>Час замовлення:</strong> ${timeStr}</p>
    <p><strong>Номер браслету:</strong> ${braceletNumber}</p>
    <p><strong>Місце посадки:</strong> ${seatLocation}</p>
    <p><strong>Коментар клієнта:</strong> ${clientComment}</p>
    <hr>
    <ul class="list-group mb-3">
  `;

  order.forEach(item => {
    orderHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${item.name} (${item.qty} × ${item.price} грн)
        <span><strong>${item.qty * item.price} грн</strong></span>
      </li>
    `;
  });

  orderHTML += `</ul>`;
  orderHTML += `<h5>Загальна сума: <strong>${calculateTotal()} грн</strong></h5>`;

  document.getElementById('orderModalBody').innerHTML = orderHTML;

  const orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
  orderModal.show();

  // Не очищаємо замовлення тут!
}

// Обробник для кнопки "Показати замовлення"
document.getElementById('show-order-btn').addEventListener('click', showOrderDetails);

// Обробник для кнопки "Очистити замовлення"
document.getElementById('clear-order-btn').addEventListener('click', () => {
  if (confirm('Ви впевнені, що хочете очистити замовлення?')) {
    order = [];
    renderOrder();

    // Очищаємо також поля замовлення
    document.getElementById('bracelet-number').value = '';
    document.getElementById('seat-location').value = '';
    document.getElementById('client-comment').value = '';
  }
});


function chooseSize(item) {
  const sizeModalBody = document.getElementById('sizeModalBody');
  sizeModalBody.innerHTML = '';

  for (const [size, price] of Object.entries(item.sizes)) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-primary w-100 mb-2';
    btn.textContent = `${item.name} – ${size} (${price} грн)`;
    btn.onclick = () => {
      addItem(`${item.name} (${size})`, price);
      const modal = bootstrap.Modal.getInstance(document.getElementById('sizeModal'));
      modal.hide();
    };
    sizeModalBody.appendChild(btn);
  }

  const sizeModal = new bootstrap.Modal(document.getElementById('sizeModal'));
  sizeModal.show();
}

document.getElementById('search-input').addEventListener('input', function () {
  const query = this.value.toLowerCase().trim();
  if (!query) {
    // Якщо поле пошуку порожнє — показати підкатегорії активної категорії
    if (currentCategory) loadItems(currentCategory);
    else itemsContainer.innerHTML = '';
    return;
  }

  const results = [];

  // Пошук по всіх категоріях
  Object.entries(menuItems).forEach(([category, items]) => {
    items.forEach(item => {
      const name = item.name.toLowerCase();
      if (name.includes(query)) {
        results.push({
          name: item.name,
          price: item.price || null,
          sizes: item.sizes || null
        });
      }
    });
  });

  // Виведення знайдених результатів
  itemsContainer.innerHTML = '';
  subcategoryMenu.innerHTML = ''; // Сховаємо підкатегорії, щоб не заважали

  results.forEach(item => {
    const card = document.createElement('div');
    card.className = 'col-6 col-md-3 mb-3';

    const hasSizes = item.sizes !== null;
    const onclick = hasSizes
      ? `chooseSize(${JSON.stringify(item).replace(/"/g, '&quot;')})`
      : `addItem("${item.name}", ${item.price})`;

    card.innerHTML = `
      <div class="card item-card" onclick='${onclick}'>
        <div class="card-body text-center">
          <h5>${item.name}</h5>
          <p>${hasSizes ? 'Обрати розмір' : item.price + ' грн'}</p>
        </div>
      </div>
    `;
    itemsContainer.appendChild(card);
  });
});


function sendOrderToTelegram() {
  const braceletNumber = document.getElementById('bracelet-number').value.trim() || '-';
  const seatLocation = document.getElementById('seat-location').value.trim() || '-';
  const clientComment = document.getElementById('client-comment').value.trim() || '-';
  const now = new Date().toLocaleTimeString();

  if (order.length === 0) {
    alert('Ваше замовлення порожнє!');
    return;
  }

  const waiterName = document.getElementById('waiter-name').value.trim();
  const orderData = {
    time: now,
    bracelet: braceletNumber,
    seat: seatLocation,
    comment: clientComment,
    waiter: waiterName,
    order: order
  };

  fetch('/send_order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      alert('Замовлення відправлено в Telegram канал!');
    } else {
      alert('Помилка при відправці замовлення: ' + data.message);
    }
  })
  .catch(err => {
    alert('Помилка мережі: ' + err);
  });
}
