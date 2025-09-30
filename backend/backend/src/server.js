import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import downloadRoutes from "./routes/downloadRoutes.js"

dotenv.config()
const app = express()


// Middleware
app.use(cors())
app.use(express.json())


// Connect to MongoDB
connectDB


// Routes
app.use("/api/download", downloadRoutes)


// Default route
app.get("/", (req, res) => {
    res.send("InstaReelGrabber Backend is running...")
})


// Server start 
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))