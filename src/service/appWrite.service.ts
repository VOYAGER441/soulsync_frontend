/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import * as Interface from "@/interface/soul.interface";

const SOULSYNC_BASE_URL = "http://localhost:5001/soul";


// function for login
async function login(email: string, password: string) {
    try {
        const response: Interface.ILoginResponse = await axios.post(`${SOULSYNC_BASE_URL}/login`, {
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
        const response = await axios.post(`${SOULSYNC_BASE_URL}/registration`, {
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




export default {
    login, registration
}