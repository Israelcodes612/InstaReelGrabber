import cloudinary from "../config/cloudinary.js";
import downloadLog from "../models/DownloadLog.js";
import { fetchInstagramMedia } from "../utilis/instagram.js";
import axios from "axios"


export const downloadMedia = async (req, res) => {
    try {
        const { url } = req.body
        if (!url) return res.status(400).json({ success: false, message: "URL is required" })

        // 1. Fetch Instagram media
        const { mediaType, mediaUrl } = await fetchInstagramMedia(url)

        // 2. Download the media file temporarily
        const response = await axios.get(mediaUrl, { responseType: "arraybuffer" })
        const fileBuffer = Buffer.from(response.data, "binary")

        // 3. upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload_stream(
            { resource_type: mediaType === "video" ? "video" : "image" },
            async (error, result) => {
                if (error) {
                    return res.status(500).json({ success: false, message: "Cloudinary upload failed" })
                }

        // 4. save log in MongoDB
        const log = new DownloadLog({
            url,
            mediaType,
            downloadLink: result.secure_url
        })
        await log.save()

        // 5. Send response
        return res.json({
            success: true,
            mediaUrl: result.secure_url
        })
        }
        )


        uploadResponse.end(fileBuffer)
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
}


export const getHistory = async (req, res) => {
    try {
        const logs = await DownloadLog.find().sort({ timestamp: -1 }).limit(20)
        res.json(logs)
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch history" })
    }
}