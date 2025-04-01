/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import * as Interface from "@/interface/soul.interface";

// const SOULSYNC_BASE_URL = "http://localhost:5001/soul";


// function for login
async function login(email: string, password: string) {
    try {

        console.log(`${process.env.NEXT_PUBLIC_SOULSYNC_BASE_URL}/soul/login}`);

        const response: Interface.ILoginResponse = await axios.post(`${process.env.NEXT_PUBLIC_SOULSYNC_BASE_URL}/soul/login`, {
            email,
            password,
        });
        return response;

    } catch (error) {
        console.error('Error getting current user:', error);
        throw error;

    }
};

// function for registration
async function registration(name: string, email: string, password: string) {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SOULSYNC_BASE_URL}/soul/registration`, {
            name,
            email,
            password,
        });
        return response.data;

    } catch (error) {
        console.error('Error getting current user:', error);
        throw error;

    }
};


async function getCurrentUserData(userId: string) {
try {
    if (!userId) {
        throw new Error("User ID is required");
    }
    // console.log(`${process.env.NEXT_PUBLIC_SOULSYNC_BASE_URL}/soul/user/${userId}`);
    
    const response=await axios.get(`${process.env.NEXT_PUBLIC_SOULSYNC_BASE_URL}/soul/user/${userId}`);
    const userData: Interface.IUserAvatar = response.data;

    // console.log("userData",userData);
    return userData;
    
} catch (error) {
    console.error('Error getting current user:', error);
    throw error;
}
}



export default {
    login, registration,getCurrentUserData
}