require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   🌐 RUTA BASE
========================= */
app.get("/", (req, res) => {
  res.json({ message: "🚀 API Inventario funcionando correctamente" });
});

/* =========================
   🧪 STATUS
========================= */
app.get("/status", (req, res) => {
  res.json({
    ok: true,
    message: "API OK 🚀",
    mongo: mongoose.connection.readyState === 1 ? "conectado" : "desconectado",
    time: new Date()
  });
});

/* =========================
   🔌 MONGO CONNECT
========================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.log("❌ Error MongoDB:", err));

/* =========================
   📦 MODELO
========================= */
const Producto = mongoose.model("Producto", {
  nombre: String,
  cantidad: Number,
  peso: Number,
  unidad: String
});

/* =========================
   📥 GET
========================= */
app.get("/status", (req, res) => {
  res.json({ ok: true });
});

app.get("/productos", async (req, res) => {
  const data = await Producto.find();
  res.json(data);
});
/* =========================
   📤 POST
========================= */
app.post("/productos", async (req, res) => {
  const nuevo = new Producto(req.body);
  await nuevo.save();
  res.json(nuevo);
});

/* =========================
   ✏️ PUT (EDITAR)
========================= */
app.put("/productos/:id", async (req, res) => {
  const actualizado = await Producto.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(actualizado);
});

/* =========================
   ❌ DELETE
========================= */
app.delete("/productos/:id", async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

/* =========================
   🚀 PORT
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Server running on", PORT);
});