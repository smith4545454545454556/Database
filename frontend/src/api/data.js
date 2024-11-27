import axios from "axios";

export const data = async () => {
    try {
        const response = await axios({
            url: "/api/data",
            method: "POST",
            data: { name: "smith" },
            timeout: 5000 // 5 seconds timeout
        });
        return response;
    } catch (error) {
        // Handle the timeout or any other error
        if (error.code === 'ECONNABORTED') {
            console.error("Request timed out");
        } else {
            console.error("Error occurred:", error.message);
        }
        throw error; // rethrow the error if needed
    }
};