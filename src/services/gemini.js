const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
  },
});

// Análise completa: resumo + pontos principais + resposta à pergunta
async function analyzeDocument(text, question) {
  const prompt = `
Analise o documento abaixo e responda APENAS com um JSON válido, sem nenhum texto adicional, no seguinte formato:
{
  "resumo": "resumo em 2-3 frases",
  "pontos_principais": ["ponto 1", "ponto 2", "ponto 3"],
  "resposta": "resposta direta à pergunta do usuário"
}

Documento:
${text}

Pergunta: ${question || "Quais são os pontos mais importantes?"}
  `;

  const result = await model.generateContent(prompt);
  const raw = result.response.text();

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("Resposta da IA em formato inválido.");
  }
}

// Resumo rápido apenas (endpoint /api/summarize)
async function summarizeDocument(text) {
  const prompt = `
Leia o texto abaixo e responda APENAS com um JSON válido no formato:
{
  "resumo": "resumo em 1-2 frases",
  "palavras_chave": ["palavra1", "palavra2", "palavra3"],
  "sentimento": "positivo | neutro | negativo",
  "tipo_documento": "artigo | contrato | relatório | e-mail | outro"
}

Texto:
${text}
  `;

  const result = await model.generateContent(prompt);
  const raw = result.response.text();

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("Resposta da IA em formato inválido.");
  }
}

module.exports = { analyzeDocument, summarizeDocument };
