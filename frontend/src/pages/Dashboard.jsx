import { useEffect, useState } from "react"
import { getTickets } from "../api/ticketApi"
import { Link } from "react-router-dom"
import TicketCard from "../components/TicketCard"

function Dashboard() {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    const res = await getTickets()
    setTickets(res.data)
  }

  return (
    <div className="container">
      <div className="row">
        <h2>Support Tickets</h2>
        <Link to="/create">
          <button>Create Ticket</button>
        </Link>
      </div>

      {tickets.length === 0 ? (
        <p>No tickets found</p>
      ) : (
        tickets.map((t) => (
          <TicketCard key={t.ticketId} ticket={t} />
        ))
      )}
    </div>
  )
}

export default Dashboard;