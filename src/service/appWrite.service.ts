/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import * as Interface from "@/interface/soul.interface";
import { Account, Client, OAuthProvider, Databases, ID, Query } from "appwrite";


// Initialize Appwrite Client
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    


const account = new Account(client);
const databases = new Databases(client);

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DB_ID!;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;








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

        const response = await axios.get(`${process.env.NEXT_PUBLIC_SOULSYNC_BASE_URL}/soul/user/${userId}`);
        const userData: Interface.IUserProfile = response.data;

        // console.log("userData",userData);
        return userData;

    } catch (error) {
        console.error('Error getting current user:', error);
        throw error;
    }
}

// function for login with google
async function loginWithGoogle() {
    try {


        account.createOAuth2Session(
            OAuthProvider.Google,
            process.env.NEXT_PUBLIC_APPWRITE_REDIRECT_URL!,
            process.env.NEXT_PUBLIC_APPWRITE_FAILURE_URL!
        );
        const user = await account.get();
        return user;
    } catch (error) {
        console.error('Error logging in with Google:', error);
        throw error;
    }
};



async function handleOAuthCallback() {
    try {
        const user = await account.get(); // 1. Get the user from Auth
        const userId = user.$id;

        console.log("Userrrrrrrrrrr ID:", userId);
        

        // 2. Check if the user exists in the database
        const userDoc = await databases.listDocuments(databaseId, collectionId, [
            Query.equal("userId", userId)
        ]);

        if (userDoc.total === 0) {
            // 3. If not found, create user document
            const avatar = `https://cloud.appwrite.io/v1/avatars/initials?name=${encodeURIComponent(user.name ?? 'User')}`;
            await databases.createDocument(databaseId, collectionId, ID.unique(), {
                userId: userId,
                name: user.name,
                email: user.email,
                avatar,
                chatHistory: [],
                moodTrends: []
            });
            console.log("Created new user in database");
        }

        localStorage.setItem("userId", userId);
        return user;
    } catch (error) {
        console.error("Error in handleOAuthCallback:", error);
        throw error;
    }
}



export default {
    login, registration, getCurrentUserData, loginWithGoogle, handleOAuthCallback
}