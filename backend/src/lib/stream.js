import { StreamChat } from "stream-chat"
import "dotenv/config";

const apikey = process.env.STREAM_API_KEY;
const secret = process.env.STREAM_API_SECRET;

if (!apikey || !secret) {
    throw new Error("STREAM API KEY or SECRET not found");
}

const streamClient = StreamChat.getInstance(apikey, secret);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUser(userData);
        return userData;
    } catch (error) {
        console.error("Error in upserting user in stream: ", error);
        throw error;
    }
}

export const generateStreamToken = (userId) => {
    try {
        const token = streamClient.createToken(userId.toString());
        return token;
    } catch (error) {
        console.error("Error in generating stream token: ", error);
        throw error;
    }
}