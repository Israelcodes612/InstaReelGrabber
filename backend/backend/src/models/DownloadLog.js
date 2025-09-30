import mongoose from "mongoose";


const downloadLogSchema = new mongoose.Schema({
    url: { type: String, required: true },
    mediaType: { type: String, required: true },
    downloadLink: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
})

const downloadLog = mongoose.model("DownloadLog", downloadLogSchema)


export default downloadLog