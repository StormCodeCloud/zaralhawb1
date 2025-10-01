## POST METHOD

*1. User

POST http://localhost:5000/api/users
Content-Type: application/json

{
  "username": "duarte",
  "email": "duarte@example.com",
  "password_hash": "123456"
}

*2. Categories

POST http://localhost:5000/api/categories
Content-Type: application/json

{
  "name": "Armas",
  "label": "Itens de combate"
}

*3. Products

## ⚠️ Precisa de categoryId já existente.

POST http://localhost:5000/api/products
Content-Type: application/json

{
  "categoryId": 1,
  "name": "AK-47",
  "description": "Rifle de assalto poderoso",
  "price": 500.00,
  "currency": "EUR",
  "image": "https://meusite.com/images/ak47.png",
  "label": "Arma de fogo",
  "stock": 100
}

*4. Orders

## ⚠️ Precisa de userId já existente.

POST http://localhost:5000/api/orders
Content-Type: application/json

{
  "userId": 1,
  "total": 1000.00
}


*5. Order_items

## ⚠️ Precisa de ordersId e productsId já existentes.
(ainda nao existente no backend 01/10)

POST http://localhost:5000/api/order_items
Content-Type: application/json

{
  "ordersId": 1,
  "productsId": 1,
  "quantity": 2,
  "price": 500.00
}


*6. Servers

POST http://localhost:5000/api/servers
Content-Type: application/json

{
  "name": "Zaralha Rust #1",
  "ip": "127.0.0.1",
  "port": 28015,
  "slots": "200",
  "game": "Rust"
}


*7. Transictions

POST http://localhost:5000/api/transactions
Content-Type: application/json

{
  "userId": 1,
  "ordersId": 1,
  "method": "Paypal",
  "amount": 1000.00
}


