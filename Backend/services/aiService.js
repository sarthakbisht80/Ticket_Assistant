const { GoogleGenerativeAI } = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY)

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
})

const processTicketWithAI = async (description) => {
  try {
    const prompt = `
You are a support assistant.

Analyze the ticket and return JSON only.

Categories: PAYMENT, LOGIN, BUG, OTHER

Format:
{
  "category": "",
  "reply": "",
  "confidence": 0.0
}

Ticket:
${description}
`

    const result = await model.generateContent(prompt)

    const text = result.response.text()

    const cleaned = text.replace(/```json|```/g, "").trim()

    const parsed = JSON.parse(cleaned)

    return parsed
  } catch (err) {
    return {
      category: "OTHER",
      reply: "We have received your request. Our team will get back to you shortly.",
      confidence: 0
    }
  }
}

module.exports = { processTicketWithAI }