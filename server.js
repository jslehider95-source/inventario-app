require("dotenv").config(); // 👈 IMPORTANTE (DEBE IR ARRIBA)

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 CONEXIÓN SEGURA
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.log("❌ Error MongoDB:", err));

// 📦 MODELO
const Producto = mongoose.model("Producto", {
  nombre: String,
  cantidad: Number,
  peso: Number,
  unidad: String
});

// 📥 GET
app.get("/", (req, res) => {
  res.send("🚀 API Inventario funcionando correctamente");
});
// 📤 POST
app.post("/productos", async (req, res) => {
  const nuevo = new Producto(req.body);
  await nuevo.save();
  res.send("ok");
});

// ❌ DELETE
app.delete("/productos/:id", async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  res.send("eliminado");
});

// 🔥 PUERTO DINÁMICO
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
 console.log("MONGO_URI:", process.env.MONGO_URI);
});