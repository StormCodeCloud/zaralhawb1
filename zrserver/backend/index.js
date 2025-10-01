import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ---------------------------
// Conexão MySQL
// ---------------------------
let db;
async function initDb() {
  db = await mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "zaralhabdd",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  console.log("✅ Conectado ao MySQL");
}

// ---------------------------
// Função auxiliar de LOG
// ---------------------------
function logToFile(filename, data) {
  const filePath = path.join("json", filename);
  let logs = [];

  if (fs.existsSync(filePath)) {
    try {
      logs = JSON.parse(fs.readFileSync(filePath, "utf8") || "[]");
    } catch {
      logs = [];
    }
  }

  logs.push({ ...data, timestamp: new Date().toISOString() });
  fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
}

// ---------------------------
// Middleware global de log
// ---------------------------
app.use((req, res, next) => {
  res.on("finish", () => {
    logToFile("requests.json", {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode
    });
  });
  next();
});

// ---------------------------
// Swagger Config
// ---------------------------
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Zaralha Servers API",
      version: "1.0.0",
      description: "Documentação da API CRUD (Users, Products, Categories, Orders, Transactions, Servers)"
    },
    servers: [
      { url: `http://localhost:${PORT}` }
    ],
  },
  apis: ["./index.js"], // lê os comentários JSDoc
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ---------------------------
// Rota inicial
// ---------------------------
app.get("/", (req, res) => {
  res.send("🚀 API Zaralha Servers está no ar! Documentação em /api-docs");
});

/**
 * @swagger
 * tags:
 *   - name: Users
 *   - name: Products
 *   - name: Categories
 *   - name: Orders
 *   - name: Transactions
 *   - name: Servers
 */

//
// ---------------------------
// USERS CRUD
// ---------------------------

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    logToFile("users.json", { action: "GET /api/users", count: rows.length });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password_hash:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
app.post("/api/users", async (req, res) => {
  const { username, email, password_hash, country } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO users (username, email, password_hash, country) VALUES (?, ?, ?, ?)",
      [username, email, password_hash, country]
    );
    res.status(201).json({ id: result.insertId, username, email });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 */
app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, role, balance, banned } = req.body;
  try {
    await db.query(
      "UPDATE users SET username=?, email=?, role=?, balance=?, banned=? WHERE id=?",
      [username, email, role, balance, banned, id]
    );
    res.json({ message: "User atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Usuário deletado
 */
app.delete("/api/users/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM users WHERE id=?", [req.params.id]);
    res.json({ message: "User deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

//
// ---------------------------
// PRODUCTS CRUD
// ---------------------------

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
app.get("/api/products", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Products]
 */
app.post("/api/products", async (req, res) => {
  const { categoryId, name, description, price, currency, image, label, stock } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO products (categoryId, name, description, price, currency, image, label, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [categoryId, name, description, price, currency, image, label, stock]
    );
    res.status(201).json({ id: result.insertId, name, price });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Products]
 */
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;
  try {
    await db.query(
      "UPDATE products SET name=?, description=?, price=?, stock=? WHERE productsId=?",
      [name, description, price, stock, id]
    );
    res.json({ message: "Produto atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Deleta um produto
 *     tags: [Products]
 */
app.delete("/api/products/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM products WHERE productsId=?", [req.params.id]);
    res.json({ message: "Produto deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

//
// ---------------------------
// CATEGORIES CRUD
// ---------------------------

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categories]
 */
app.get("/api/categories", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM categories");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categories]
 */
app.post("/api/categories", async (req, res) => {
  const { name, label } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO categories (name, label) VALUES (?, ?)",
      [name, label]
    );
    res.status(201).json({ id: result.insertId, name, label });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Atualiza uma categoria
 *     tags: [Categories]
 */
app.put("/api/categories/:id", async (req, res) => {
  const { id } = req.params;
  const { name, label } = req.body;
  try {
    await db.query(
      "UPDATE categories SET name=?, label=? WHERE categoryId=?",
      [name, label, id]
    );
    res.json({ message: "Categoria atualizada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Deleta uma categoria
 *     tags: [Categories]
 */
app.delete("/api/categories/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM categories WHERE categoryId=?", [req.params.id]);
    res.json({ message: "Categoria deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

//
// ---------------------------
// ORDERS CRUD
// ---------------------------

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags: [Orders]
 */
app.get("/api/orders", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM orders");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Orders]
 */
app.post("/api/orders", async (req, res) => {
  const { userId, total } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO orders (userId, total) VALUES (?, ?)",
      [userId, total]
    );
    res.status(201).json({ id: result.insertId, userId, total });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Atualiza um pedido
 *     tags: [Orders]
 */
app.put("/api/orders/:id", async (req, res) => {
  const { id } = req.params;
  const { total, status } = req.body;
  try {
    await db.query(
      "UPDATE orders SET total=?, status=? WHERE ordersId=?",
      [total, status, id]
    );
    res.json({ message: "Pedido atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Deleta um pedido
 *     tags: [Orders]
 */
app.delete("/api/orders/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM orders WHERE ordersId=?", [req.params.id]);
    res.json({ message: "Pedido deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

//
// ---------------------------
// TRANSACTIONS CRUD
// ---------------------------

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Lista todas as transações
 *     tags: [Transactions]
 */
app.get("/api/transactions", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM transactions");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Cria uma nova transação
 *     tags: [Transactions]
 */
app.post("/api/transactions", async (req, res) => {
  const { userId, orderId, amount, method } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO transactions (id, ordersId, amount, method) VALUES (?, ?, ?, ?)",
      [userId, orderId, amount, method]
    );
    res.status(201).json({ id: result.insertId, userId, orderId, amount });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

/**
 * @swagger
 * /api/transactions/{id}:
 *   put:
 *     summary: Atualiza uma transação
 *     tags: [Transactions]
 */
app.put("/api/transactions/:id", async (req, res) => {
  const { id } = req.params;
  const { amount, status } = req.body;
  try {
    await db.query(
      "UPDATE transactions SET amount=?, status=? WHERE transactionsId=?",
      [amount, status, id]
    );
    res.json({ message: "Transação atualizada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Deleta uma transação
 *     tags: [Transactions]
 */
app.delete("/api/transactions/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM transactions WHERE transactionsId=?", [req.params.id]);
    res.json({ message: "Transação deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

//
// ---------------------------
// SERVERS CRUD
// ---------------------------

/**
 * @swagger
 * /api/servers:
 *   get:
 *     summary: Lista todos os servidores
 *     tags: [Servers]
 */
app.get("/api/servers", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM servers");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

/**
 * @swagger
 * /api/servers:
 *   post:
 *     summary: Cria um novo servidor
 *     tags: [Servers]
 */
app.post("/api/servers", async (req, res) => {
  const { name, ip, port, slots, game } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO servers (name, ip, port, slots, game) VALUES (?, ?, ?, ?, ?)",
      [name, ip, port, slots, game]
    );
    res.status(201).json({ id: result.insertId, name, ip, port });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

/**
 * @swagger
 * /api/servers/{id}:
 *   put:
 *     summary: Atualiza um servidor
 *     tags: [Servers]
 */
app.put("/api/servers/:id", async (req, res) => {
  const { id } = req.params;
  const { name, ip, port, slots, game } = req.body;
  try {
    await db.query(
      "UPDATE servers SET name=?, ip=?, port=?, slots=?, game=? WHERE serversId=?",
      [name, ip, port, slots, game, id]
    );
    res.json({ message: "Servidor atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

/**
 * @swagger
 * /api/servers/{id}:
 *   delete:
 *     summary: Deleta um servidor
 *     tags: [Servers]
 */
app.delete("/api/servers/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM servers WHERE serversId=?", [req.params.id]);
    res.json({ message: "Servidor deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// ---------------------------
// Start server
// ---------------------------
app.listen(PORT, async () => {
  await initDb();
  console.log(`🌍 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📖 Documentação disponível em http://localhost:${PORT}/api-docs`);
});
