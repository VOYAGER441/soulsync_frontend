/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import * as Interface from "@/interface/soul.interface";


// function for call the database for user chat history and user details
async function getChatHistory(userId: string) {
    try {
        if (!userId) {
            throw new Error("User ID is required");
        }
        // console.log("userid33333333333", userId);

        const response = await axios.get(`${process.env.NEXT_PUBLIC_SOULSYNC_BASE_URL}/soul/chat/${userId}`);
        const chats: Interface.IChatHistory[] = response.data;

        // console.log("chats",chats);
       
        return chats;


    } catch (error) {
        console.log("error", error);
        throw new Error("Internal server error")

    }
}


async function chatWithAIModel(userId: string, message: string) {
    try {
        if (!userId) {
            throw new Error("User ID is required");
        }
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SOULSYNC_BASE_URL}/soul/chat`, { message, userId }, {
            headers: {
                "Authorization-OpenRouter": process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
                "Authorization-HuggingFace": process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY,
            }
        });
        const chatResponse: Interface.IChatResponse = response.data;
        console.log("chatResponse", chatResponse);

        return chatResponse;
    } catch (error) {
        console.log("error", error);
        throw new Error("Internal server error")
    }

}






export default {
    getChatHistory,
    chatWithAIModel
}