const Ticket = require("../models/Ticket")
const { processTicketWithAI } = require("../services/aiService")

const createTicket = async (req, res) => {
  try {
    const { name, email, description } = req.body

    const ticket = await Ticket.create({
      name,
      email,
      description,
      status: "OPEN"
    })

    processTicketWithAI(description)
      .then(async (ai) => {
        await Ticket.findByIdAndUpdate(ticket._id, {
          category: ai.category,
          aiReply: ai.reply,
          confidence: ai.confidence
        })
      })
      .catch(async () => {
        await Ticket.findByIdAndUpdate(ticket._id, {
          category: "OTHER",
          aiReply: "We have received your request. Our team will get back to you shortly.",
          confidence: 0
        })
      })

    res.json({
      ticketId: ticket._id,
      status: ticket.status
    })
  } catch {
    res.status(500).json({ error: "Server error" })
  }
}

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 })

    const data = tickets.map((t) => ({
      ticketId: t._id,
      description: t.description,
      category: t.category,
      status: t.status,
      createdAt: t.createdAt
    }))

    res.json(data)
  } catch {
    res.status(500).json({ error: "Server error" })
  }
}

const getTicketById = async (req, res) => {
  try {
    const t = await Ticket.findById(req.params.id)

    res.json({
      ticketId: t._id,
      name: t.name,
      email: t.email,
      description: t.description,
      category: t.category,
      aiReply: t.aiReply,
      status: t.status,
      createdAt: t.createdAt
    })
  } catch {
    res.status(500).json({ error: "Server error" })
  }
}

const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body

    await Ticket.findByIdAndUpdate(req.params.id, { status })

    res.json({ success: true })
  } catch {
    res.status(500).json({ error: "Server error" })
  }
}

const updateReply = async (req, res) => {
  try {
    const { reply } = req.body

    await Ticket.findByIdAndUpdate(req.params.id, {
      aiReply: reply
    })

    res.json({ success: true })
  } catch {
    res.status(500).json({ error: "Server error" })
  }
}

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
  updateReply
}