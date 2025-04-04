// import axios from "axios"

// export const getToken=async()=>{
//     const result=await axios.get("/api/gettoken/deepgram")
//     return result.data
// }
// import axios from "axios";

// export const getToken = async () => {
//     try {
//         const result = await axios.post("/api/gettoken/deepgram"); // ✅ Use POST instead of GET
//         return result.data;
//     } catch (error) {
//         console.error("Error fetching Deepgram token:", error);
//         return null;
//     }
// };
import axios from "axios";

// export const getToken = async () => {
//   const result = await axios.get("/api/gettoken");
//   return result.data.token; // ✅ Ensure correct key
// };




export const getToken = async () => {
    try {
        const response = await fetch("/api/gettoken");
        const data = await response.json();
        
        console.log("Token Response:", data);  // Debugging purpose

        if (!data.token) {
            console.error("Token not found in response");
            return null;
        }

        return data.token;
    } catch (error) {
        console.error("Error fetching token:", error);
        return null;
    }
};
