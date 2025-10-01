*1. users

PUT http://localhost:5000/api/users/1
Content-Type: application/json

{
  "username": "duarte_dev",
  "email": "duarte_dev@example.com",
  "role": "admin",
  "balance": 250.50,
  "banned": false
}

*2. Categories

PUT http://localhost:5000/api/categories/1
Content-Type: application/json

{
  "name": "Armas Pesadas",
  "label": "Explosivos e Rifles"
}


*3. Products

PUT http://localhost:5000/api/products/1
Content-Type: application/json

{
  "categoryId": 1,
  "name": "AK-47 Elite",
  "description": "Rifle de assalto edição limitada",
  "price": 600.00,
  "currency": "EUR",
  "image": "https://meusite.com/images/ak47-elite.png",
  "label": "Edição Elite",
  "stock": 75
}

*4. Orders

PUT http://localhost:5000/api/orders/1
Content-Type: application/json

{
  "total": 1200.00,
  "status": "paid"
}


*5. Order_items
(nao funciona ainda 01/10)

PUT http://localhost:5000/api/order_items/1
Content-Type: application/json

{
  "ordersId": 1,
  "productsId": 1,
  "quantity": 3,
  "price": 1800.00
}

*6. Servers

PUT http://localhost:5000/api/servers/1
Content-Type: application/json

{
  "name": "Zaralha Rust #1 - Modded",
  "ip": "127.0.0.1",
  "port": 28015,
  "slots": "300",
  "game": "Rust"
}

*7. Transactions

PUT http://localhost:5000/api/transactions/1
Content-Type: application/json

{
  "userId": 1,
  "ordersId": 1,
  "amount": 1000.00,
  "status": "paid",
  "method": "CreditCard"
}

