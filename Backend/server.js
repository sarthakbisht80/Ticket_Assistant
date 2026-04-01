require("dotenv").config()

const express = require("express")
const cors = require("cors")

const connectDB = require("./config/db")
const ticketRoutes = require("./routes/ticketRoute")

const app = express()

connectDB();

// app.use(cors())
  app.use(require("cors")({ origin: "*" }))
app.use(express.json())

app.use("/api", ticketRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`);
})