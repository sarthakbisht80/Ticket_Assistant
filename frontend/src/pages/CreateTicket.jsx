import { useState } from "react"
import { createTicket } from "../api/ticketApi"
import { useNavigate } from "react-router-dom"

function CreateTicket() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    description: ""
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createTicket(form)
    navigate("/")
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Create Ticket</h2>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <textarea
            name="description"
            placeholder="Describe your issue"
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreateTicket