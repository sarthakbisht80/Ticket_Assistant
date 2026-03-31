const express = require("express")
const router = express.Router()

const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
  updateReply
} = require("../controller/ticketController");

router.post("/tickets", createTicket)
router.get("/tickets", getAllTickets)
router.get("/tickets/:id", getTicketById)
router.post("/tickets/:id/status", updateTicketStatus)
router.post("/tickets/:id/reply", updateReply)

module.exports = router