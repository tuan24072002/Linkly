import { generateStreamToken } from "../lib/stream.js";

export const getStreamToken = async (req, res) => {
    try {
        const userId = req.user._id;
        const token = generateStreamToken(userId.toString());
        res.status(200).json({
            success: true,
            data: { token }
        })
    } catch (error) {
        console.log(`Error in getStreamToken: ${error}`);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}