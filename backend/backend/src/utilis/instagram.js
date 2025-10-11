import axios from "axios"


// Mock function to fetch Instagram media
// In production: replace with real IG scraping/graph API logic
export const fetchInstagramMedia = async (url) => {
    try {
        // Placeholder: pretend every URL is a video for now
        return {
            mediaType: "video",
            mediaUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
        }
    } catch (error) {
        throw new Error("Failed to fetch Instagram media")
    }
}