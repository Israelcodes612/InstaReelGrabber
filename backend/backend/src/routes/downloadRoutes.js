import express from "express"
import { downloadMedia, getHistory } from "../controllers/downloadController.js"


const router = express.Router()


router.post("/", downloadMedia)
router.get("/history", getHistory)


export default router