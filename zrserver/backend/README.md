##Criar user (POST)

POST http://localhost:5000/api/users
Content-Type: application/json

{
  "username": "player1",
  "email": "player1@mail.com",
  "password_hash": "123hashed"
}


##Atualizar produto (PUT)

PUT http://localhost:5000/api/products/1
Content-Type: application/json

{
  "name": "VIP Gold Plus",
  "description": "Versão melhorada do VIP Gold",
  "price": 45,
  "stock": 50
}

##Deletar user (DELETE)

DELETE http://localhost:5000/api/users/1
DELETE http://localhost:5000/api/products/:id

##GET a user 

GET http://localhost:5000/api/users
