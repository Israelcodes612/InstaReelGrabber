import cloudinary from "../config/cloudinary.js"
import DownloadLog from "../models/DownloadLog.js"
import { fetchInstagramMedia } from "../utilis/instagram.js"  // disable for now
import axios from "axios"  // disable for now

export const downloadMedia = async (req, res) => {
  try {
    const { url } = req.body
    if (!url) {
      return res.status(400).json({ success: false, message: "URL is required" })
    }

    // 1. Fetch Instagram media
    const { mediaType, mediaUrl } = await fetchInstagramMedia(url)

    // 2: Download media into media
    const response = await axios.get(mediaUrl, { responseType: "arraybuffer" })
    const fileBuffer = Buffer.from(response.data, "binary")

    // 3: Upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: mediaType === "video" ? "video" : "image" },
        async (error, result) => {
            if (error) {
                console.error("Cloudinary upload failed:", error)
                return res.status(500).json({ success:false,message: "Cloudinary upload failed" })
            }

    // 4. Save log in MongoDB with real URL
    const log = new DownloadLog({
        url,
        mediaType,
        downloadLink: result.secure_url
    })
    await log.save()

    // 5. Respond to client
    return res.json({
        success: true,
        mediaUrl: result.secure_url
        })
        }
    )

    uploadStream.end(fileBuffer)
} catch (error) {
    console.error("Error in downloadMedia:", error)
    res.status(500).json({ success: false, message: "Server error", 
        error: error.message // show error
     })
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