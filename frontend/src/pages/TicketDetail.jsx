import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
  getTicketById,
  updateStatus,
  updateReply
} from "../api/ticketApi"

function TicketDetail() {
  const { id } = useParams()
  const [ticket, setTicket] = useState(null)
  const [reply, setReply] = useState("")

  useEffect(() => {
    fetchTicket()
  }, [])

  const fetchTicket = async () => {
    const res = await getTicketById(id)
    setTicket(res.data)
    setReply(res.data.aiReply)
  }

  const handleResolve = async () => {
    await updateStatus(id)
    fetchTicket()
  }

  const handleUpdateReply = async () => {
    await updateReply(id, reply)
    fetchTicket()
  }

  const getStatusClass = (status) => {
    if (status === "OPEN") return "badge open"
    if (status === "RESOLVED") return "badge resolved"
    return "badge processing"
  }

  if (!ticket) return <p>Loading...</p>

  return (
    <div className="container">
      <div className="card">
        <h3>Issue</h3>
        <p>{ticket.description}</p>

        <div className="row">
          <p><strong>Category:</strong> {ticket.category}</p>
          <span className={getStatusClass(ticket.status)}>
            {ticket.status}
          </span>
        </div>
      </div>

      <div className="card">
        <h3>Suggested Reply</h3>

        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />

        <div style={{ marginTop: "10px" }}>
          <button onClick={handleUpdateReply}>Update Reply</button>
          <button onClick={handleResolve} style={{ marginLeft: "10px" }}>
            Mark Resolved
          </button>
        </div>
      </div>
    </div>
  )
}

export default TicketDetail