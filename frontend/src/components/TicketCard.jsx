import { Link } from "react-router-dom"

function TicketCard({ ticket }) {
  const getStatusClass = (status) => {
    if (status === "OPEN") return "badge open"
    if (status === "RESOLVED") return "badge resolved"
    return "badge processing"
  }

  return (
    <div className="card">
      <Link to={`/ticket/${ticket.ticketId}`}>
        <h4>{ticket.description}</h4>
      </Link>

      <div className="row">
        <span>
          {ticket.category === "PROCESSING"
            ? "Processing..."
            : ticket.category}
        </span>

        <span className={getStatusClass(ticket.status)}>
          {ticket.status}
        </span>
      </div>
    </div>
  )
}

export default TicketCard