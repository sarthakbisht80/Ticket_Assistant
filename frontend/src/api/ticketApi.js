import axios from "axios"
//i am using axios for fectchig backend url 
const API = axios.create({
  // baseURL: "http://localhost:5000/api"
  baseURL:"https://ticket-assistant-1.onrender.com/api"
})

export const createTicket = (data) => API.post("/tickets", data)
export const getTickets = () => API.get("/tickets")
export const getTicketById = (id) => API.get(`/tickets/${id}`)
export const updateStatus = (id) =>
  API.post(`/tickets/${id}/status`, { status: "RESOLVED" })
export const updateReply = (id, reply) =>
  API.post(`/tickets/${id}/reply`, { reply })
