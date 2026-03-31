const mongoose = require("mongoose")

const ticketSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    description: String,
    category: String,
    aiReply: String,
    status: {
      type: String,
      default: "OPEN"
    },
    category: {
  type: String,
  default: "PROCESSING"
},
aiReply: {
  type: String,
  default: "Generating response..."
},
confidence: {
  type: Number,
  default: 0
},
  },
  
  { timestamps: true }
)

module.exports = mongoose.model("Ticket", ticketSchema)