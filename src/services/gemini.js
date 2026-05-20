const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// gemini-1.5-flash: rápido, gratuito e estável
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
  },
});

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

  return JSON.parse(raw);
}

module.exports = { analyzeDocument };
