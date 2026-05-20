# 📄 AI Document Analyzer

API REST para análise inteligente de documentos usando o modelo **Google Gemini 1.5 Flash**. Envie qualquer texto e receba um resumo, os pontos principais e a resposta para a sua pergunta — tudo estruturado em JSON.

---

## 🚀 Funcionalidades

- **Resumo automático** do documento em 2-3 frases
- **Extração dos pontos principais**
- **Resposta direta** a perguntas específicas sobre o conteúdo
- Resposta sempre em **JSON estruturado**, pronta para integrar com qualquer frontend

---

## 🛠️ Stack

| Tecnologia | Uso |
|---|---|
| Node.js | Runtime |
| Express 5 | Framework HTTP |
| Google Gemini 1.5 Flash | Modelo de IA |
| dotenv | Gestão de variáveis de ambiente |
| cors | Permissão de origens cruzadas |
| nodemon | Hot-reload em desenvolvimento |

---

## 📁 Estrutura do Projeto

```
ai-document-analyzer/
├── src/
│   ├── index.js          # Entry point — inicializa o servidor
│   ├── routes/
│   │   └── analyze.js    # Rota POST /api/analyze
│   └── services/
│       └── gemini.js     # Integração com a API do Gemini
├── .env.example          # Modelo de variáveis de ambiente
├── .gitignore
└── package.json
```

---

## ⚙️ Como rodar localmente

**1. Clone o repositório**
```bash
git clone https://github.com/seu-usuario/ai-document-analyzer.git
cd ai-document-analyzer
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure as variáveis de ambiente**
```bash
cp .env.example .env
```
Edite o `.env` e adicione sua chave da API do Gemini.
Obtenha sua chave gratuita em: https://aistudio.google.com/app/apikey

**4. Inicie o servidor**
```bash
# Produção
npm start

# Desenvolvimento (com hot-reload)
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

---

## 📡 Endpoints

### `GET /`
Verifica se o servidor está online.

**Resposta:**
```json
{
  "mensagem": "Servidor do Document Analyzer está online! 🚀"
}
```

---

### `POST /api/analyze`
Analisa um documento e retorna resumo, pontos principais e resposta.

**Body (JSON):**
```json
{
  "text": "Cole aqui o texto do documento que deseja analisar...",
  "question": "Qual é a conclusão principal?" 
}
```

> O campo `question` é opcional. Se omitido, a IA responde "Quais são os pontos mais importantes?"

**Resposta:**
```json
{
  "resumo": "O documento aborda os principais desafios da transformação digital nas empresas...",
  "pontos_principais": [
    "A adoção de IA reduz custos operacionais em até 40%",
    "Empresas que não se digitalizam perdem competitividade",
    "A cultura organizacional é o maior obstáculo à mudança"
  ],
  "resposta": "A conclusão principal é que a transformação digital deixou de ser opcional e se tornou condição de sobrevivência no mercado."
}
```

---

## 🧪 Testando com curl

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "text": "A inteligência artificial está transformando o mercado de trabalho. Muitas tarefas repetitivas estão sendo automatizadas, mas novas profissões surgem a cada ano. Profissionais que dominam ferramentas de IA têm salários 30% maiores em média.",
    "question": "Como a IA afeta os salários?"
  }'
```

---

## 🔒 Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|---|---|---|
| `GEMINI_API_KEY` | Chave da API do Google Gemini | ✅ Sim |
| `PORT` | Porta do servidor (padrão: 3000) | ❌ Não |

---

## 📝 Licença

ISC
