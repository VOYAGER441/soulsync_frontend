/* eslint-disable import/no-anonymous-default-export */
const encodeData = (data: string) => {
    return btoa(data).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"); // URL-safe Base64
};

 // Function to decode Base64 (URL-safe)
 const decodeData = (encoded: string) => {
    try {
      const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
      return atob(base64);
    } catch (error) {
      console.error("Invalid Base64 encoding:", error);
      return "";
    }
  };

export default {
    encodeData,
    decodeData
}