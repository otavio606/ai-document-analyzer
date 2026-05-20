const express = require("express");
const router = express.Router();
const { analyzeDocument } = require("../services/gemini");

// POST /api/analyze
router.post("/analyze", async (req, res) => {
  try {
    const { text, question } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        error: "Por favor, forneça o texto do documento para análise.",
      });
    }

    const analysis = await analyzeDocument(text, question);
    return res.json(analysis);
  } catch (error) {
    console.error("Erro na análise:", error.message);
    return res.status(500).json({
      error: "Erro interno ao processar o documento.",
    });
  }
});

module.exports = router;
