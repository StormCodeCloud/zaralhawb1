CREATE DATABASE zaralhabdd;
USE zaralhabdd;

-- USERS
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    country varchar(100) not null,
    role ENUM('user','admin','moderator') DEFAULT 'user',
    balance DECIMAL(10,2) DEFAULT 0,
    banned BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lastLogin TIMESTAMP NULL
);

-- CATEGORIES
CREATE TABLE categories (
    categoryId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    label VARCHAR(100) NOT NULL
);

-- PRODUCTS
CREATE TABLE products (
    productsId INT AUTO_INCREMENT PRIMARY KEY,
    categoryId INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(300) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    currency ENUM('BRL','EUR','USD') DEFAULT 'BRL',
    image VARCHAR(255) NOT NULL,
    label VARCHAR(100),
    stock INT DEFAULT 0,
    FOREIGN KEY (categoryId) REFERENCES categories(categoryId)
);

-- ORDERS
CREATE TABLE orders (
    ordersId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status ENUM('pending','paid','delivered','canceled') DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- ORDER ITEMS
CREATE TABLE order_items (
    order_itemsId INT AUTO_INCREMENT PRIMARY KEY,
    ordersId INT NOT NULL,
    productsId INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (ordersId) REFERENCES orders(ordersId),
    FOREIGN KEY (productsId) REFERENCES products(productsId)
);

-- SERVERS (opcional)
CREATE TABLE servers (
    serversId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    ip VARCHAR(45) NOT NULL,
    port INT NOT NULL,
    slots VARCHAR(20) NOT NULL,
    game ENUM('Rust', 'DayZ', 'Ark', 'Minecraft', 'Palworld') DEFAULT 'Rust' NOT NULL
);

-- TRANSACTIONS (opcional)
CREATE TABLE transactions (
    transactionsId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,	
    ordersId INT NOT NULL,
    method ENUM('Paypal', 'Pix', 'Crypto', 'Mbway', 'CreditCard') DEFAULT 'Pix' NOT NULL,
    status ENUM('pending','paid','delivered','canceled') DEFAULT 'pending' NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (ordersId) REFERENCES orders(ordersId)
);

drop database zaralhabdd