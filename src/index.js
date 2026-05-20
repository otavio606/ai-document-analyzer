const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api", require("./routes/analyze"));

// Rota de teste
app.get("/", (req, res) => {
  res.json({ mensagem: "Servidor do Document Analyzer está online! 🚀" });
});

app.listen(PORT, () => {
  console.log(`\n=========================================`);
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
  console.log(`👉 Acesse: http://localhost:${PORT}`);
  console.log(`=========================================\n`);
});
