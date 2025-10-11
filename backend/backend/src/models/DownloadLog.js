import { timeStamp } from "console"
import mongoose from "mongoose"


const downloadLogSchema = new mongoose.Schema(
    {
        url: { type: String, required: true },
        mediaType: { type: String, enum: ["image", "video"], required: true },
        downloadLink: { type: String, required: true }
    },
        { timestamps: true } // automatically adds createdAt & updatedAt
)

const downloadLog = mongoose.model("DownloadLog", downloadLogSchema)

export default downloadLog