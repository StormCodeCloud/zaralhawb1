import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

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
// Rota inicial
// ---------------------------
app.get("/", (req, res) => {
  res.send("🚀 API Zaralha Servers está no ar!");
});

//
// ---------------------------
// USERS CRUD
// ---------------------------
app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    logToFile("users.json", { action: "GET /api/users", count: rows.length });
    res.json(rows);
  } catch (err) {
    logToFile("erros.json", { action: "GET /api/users", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.post("/api/users", async (req, res) => {
  const { username, email, password_hash } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
      [username, email, password_hash]
    );
    logToFile("users.json", { action: "POST /api/users", id: result.insertId, username });
    res.status(201).json({ id: result.insertId, username, email });
  } catch (err) {
    logToFile("erros.json", { action: "POST /api/users", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, role, balance, banned } = req.body;
  try {
    await db.query(
      "UPDATE users SET username=?, email=?, role=?, balance=?, banned=? WHERE id=?",
      [username, email, role, balance, banned, id]
    );
    logToFile("users.json", { action: "PUT /api/users", id, username });
    res.json({ message: "User atualizado com sucesso" });
  } catch (err) {
    logToFile("erros.json", { action: "PUT /api/users", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM users WHERE id=?", [req.params.id]);
    logToFile("users.json", { action: "DELETE /api/users", id: req.params.id });
    res.json({ message: "User deletado com sucesso" });
  } catch (err) {
    logToFile("erros.json", { action: "DELETE /api/users", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

//
// ---------------------------
// PRODUCTS CRUD
// ---------------------------
app.get("/api/products", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    logToFile("products.json", { action: "GET /api/products", count: rows.length });
    res.json(rows);
  } catch (err) {
    logToFile("erros.json", { action: "GET /api/products", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.post("/api/products", async (req, res) => {
  const { categoryId, name, description, price, currency, image, label, stock } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO products (categoryId, name, description, price, currency, image, label, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [categoryId, name, description, price, currency, image, label, stock]
    );
    logToFile("products.json", { action: "POST /api/products", id: result.insertId, name });
    res.status(201).json({ id: result.insertId, name, price });
  } catch (err) {
    logToFile("erros.json", { action: "POST /api/products", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;
  try {
    await db.query(
      "UPDATE products SET name=?, description=?, price=?, stock=? WHERE productsId=?",
      [name, description, price, stock, id]
    );
    logToFile("products.json", { action: "PUT /api/products", id, name });
    res.json({ message: "Produto atualizado com sucesso" });
  } catch (err) {
    logToFile("erros.json", { action: "PUT /api/products", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM products WHERE productsId=?", [req.params.id]);
    logToFile("products.json", { action: "DELETE /api/products", id: req.params.id });
    res.json({ message: "Produto deletado com sucesso" });
  } catch (err) {
    logToFile("erros.json", { action: "DELETE /api/products", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

//
// ---------------------------
// CATEGORIES CRUD
// ---------------------------
app.get("/api/categories", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM categories");
    logToFile("categories.json", { action: "GET /api/categories", count: rows.length });
    res.json(rows);
  } catch (err) {
    logToFile("erros.json", { action: "GET /api/categories", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.post("/api/categories", async (req, res) => {
  const { name, label } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO categories (name, label) VALUES (?, ?)",
      [name, label]
    );
    logToFile("categories.json", { action: "POST /api/categories", id: result.insertId, name });
    res.status(201).json({ id: result.insertId, name, label });
  } catch (err) {
    logToFile("erros.json", { action: "POST /api/categories", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.put("/api/categories/:id", async (req, res) => {
  const { id } = req.params;
  const { name, label } = req.body;
  try {
    await db.query(
      "UPDATE categories SET name=?, label=? WHERE categoryId=?",
      [name, label, id]
    );
    logToFile("categories.json", { action: "PUT /api/categories", id, name });
    res.json({ message: "Categoria atualizada com sucesso" });
  } catch (err) {
    logToFile("erros.json", { action: "PUT /api/categories", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.delete("/api/categories/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM categories WHERE categoryId=?", [req.params.id]);
    logToFile("categories.json", { action: "DELETE /api/categories", id: req.params.id });
    res.json({ message: "Categoria deletada com sucesso" });
  } catch (err) {
    logToFile("erros.json", { action: "DELETE /api/categories", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

//
// ---------------------------
// ORDERS CRUD
// ---------------------------
app.get("/api/orders", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM orders");
    logToFile("orders.json", { action: "GET /api/orders", count: rows.length });
    res.json(rows);
  } catch (err) {
    logToFile("erros.json", { action: "GET /api/orders", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.post("/api/orders", async (req, res) => {
  const { userId, total } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO orders (userId, total) VALUES (?, ?)",
      [userId, total]
    );
    logToFile("orders.json", { action: "POST /api/orders", id: result.insertId, userId });
    res.status(201).json({ id: result.insertId, userId, total });
  } catch (err) {
    logToFile("erros.json", { action: "POST /api/orders", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.put("/api/orders/:id", async (req, res) => {
  const { id } = req.params;
  const { total, status } = req.body;
  try {
    await db.query(
      "UPDATE orders SET total=?, status=? WHERE ordersId=?",
      [total, status, id]
    );
    logToFile("orders.json", { action: "PUT /api/orders", id, total, status });
    res.json({ message: "Pedido atualizado com sucesso" });
  } catch (err) {
    logToFile("erros.json", { action: "PUT /api/orders", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.delete("/api/orders/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM orders WHERE ordersId=?", [req.params.id]);
    logToFile("orders.json", { action: "DELETE /api/orders", id: req.params.id });
    res.json({ message: "Pedido deletado com sucesso" });
  } catch (err) {
    logToFile("erros.json", { action: "DELETE /api/orders", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

//
// ---------------------------
// TRANSACTIONS CRUD
// ---------------------------
app.get("/api/transactions", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM transactions");
    logToFile("transactions.json", { action: "GET /api/transactions", count: rows.length });
    res.json(rows);
  } catch (err) {
    logToFile("erros.json", { action: "GET /api/transactions", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.post("/api/transactions", async (req, res) => {
  const { userId, orderId, amount, method } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO transactions (id, ordersId, amount, method) VALUES (?, ?, ?, ?)",
      [userId, orderId, amount, method]
    );
    logToFile("transactions.json", { action: "POST /api/transactions", id: result.insertId, userId });
    res.status(201).json({ id: result.insertId, userId, orderId, amount });
  } catch (err) {
    logToFile("erros.json", { action: "POST /api/transactions", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.put("/api/transactions/:id", async (req, res) => {
  const { id } = req.params;
  const { amount, status } = req.body;
  try {
    await db.query(
      "UPDATE transactions SET amount=?, status=? WHERE transactionsId=?",
      [amount, status, id]
    );
    logToFile("transactions.json", { action: "PUT /api/transactions", id, amount, status });
    res.json({ message: "Transação atualizada com sucesso" });
  } catch (err) {
    logToFile("erros.json", { action: "PUT /api/transactions", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.delete("/api/transactions/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM transactions WHERE transactionsId=?", [req.params.id]);
    logToFile("transactions.json", { action: "DELETE /api/transactions", id: req.params.id });
    res.json({ message: "Transação deletada com sucesso" });
  } catch (err) {
    logToFile("erros.json", { action: "DELETE /api/transactions", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

//
// ---------------------------
// SERVERS CRUD
// ---------------------------
app.get("/api/servers", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM servers");
    logToFile("servers.json", { action: "GET /api/servers", count: rows.length });
    res.json(rows);
  } catch (err) {
    logToFile("erros.json", { action: "GET /api/servers", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.post("/api/servers", async (req, res) => {
  const { name, ip, port, slots, game } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO servers (name, ip, port, slots, game) VALUES (?, ?, ?, ?, ?)",
      [name, ip, port, slots, game]
    );
    logToFile("servers.json", { action: "POST /api/servers", id: result.insertId, name });
    res.status(201).json({ id: result.insertId, name, ip, port });
  } catch (err) {
    logToFile("erros.json", { action: "POST /api/servers", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.put("/api/servers/:id", async (req, res) => {
  const { id } = req.params;
  const { name, ip, port, slots, game } = req.body;
  try {
    await db.query(
      "UPDATE servers SET name=?, ip=?, port=?, slots=?, game=? WHERE serversId=?",
      [name, ip, port, slots, game, id]
    );
    logToFile("servers.json", { action: "PUT /api/servers", id, name });
    res.json({ message: "Servidor atualizado com sucesso" });
  } catch (err) {
    logToFile("erros.json", { action: "PUT /api/servers", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.delete("/api/servers/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM servers WHERE serversId=?", [req.params.id]);
    logToFile("servers.json", { action: "DELETE /api/servers", id: req.params.id });
    res.json({ message: "Servidor deletado com sucesso" });
  } catch (err) {
    logToFile("erros.json", { action: "DELETE /api/servers", error: err.message });
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// ---------------------------
// Start server
// ---------------------------
app.listen(PORT, async () => {
  await initDb();
  console.log(`🌍 Servidor rodando em http://localhost:${PORT}`);
});
