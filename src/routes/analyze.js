const express = require("express");
const router = express.Router();
const { analyzeDocument, summarizeDocument } = require("../services/gemini");

// Rate limiting simples em memória (sem dependência extra)
const rateLimitMap = new Map();
const RATE_LIMIT = 10;       // máx requisições
const RATE_WINDOW = 60000;   // janela de 60 segundos

function rateLimit(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, start: now };

  if (now - entry.start > RATE_WINDOW) {
    entry.count = 1;
    entry.start = now;
  } else {
    entry.count++;
  }

  rateLimitMap.set(ip, entry);

  if (entry.count > RATE_LIMIT) {
    return res.status(429).json({
      error: "Muitas requisições. Aguarde um momento e tente novamente.",
    });
  }

  next();
}

// GET /api/health — status do servidor
router.get("/health", (req, res) => {
  res.json({
    status: "online",
    model: "gemini-1.5-flash",
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()) + "s",
  });
});

// POST /api/analyze — análise completa do documento
router.post("/analyze", rateLimit, async (req, res) => {
  try {
    const { text, question } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        error: "Por favor, forneça o texto do documento para análise.",
      });
    }

    if (text.length > 50000) {
      return res.status(400).json({
        error: `Documento muito longo (${text.length} caracteres). O limite é 50.000 caracteres.`,
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

// POST /api/summarize — apenas resumo rápido (sem pergunta)
router.post("/summarize", rateLimit, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        error: "Por favor, forneça o texto para resumir.",
      });
    }

    if (text.length > 50000) {
      return res.status(400).json({
        error: `Texto muito longo. O limite é 50.000 caracteres.`,
      });
    }

    const result = await summarizeDocument(text);
    return res.json(result);
  } catch (error) {
    console.error("Erro no resumo:", error.message);
    return res.status(500).json({
      error: "Erro interno ao gerar resumo.",
    });
  }
});

module.exports = router;
