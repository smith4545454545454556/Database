import axios from "axios";

export const data = async () => {
    try {
        const response = await axios({
            url: "/api/data",
            method: "POST",
            data: { name: "smith" },
            timeout: 10000  // 10 seconds timeout (increase from 5 seconds)
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

export const addFormData = async (data) => {
    try {
        const formData = await axios({
            url: "/api/formData",
            method: "POST",
            data: data

        })
        return formData


    } catch (error) {
        console.log(error)
    }

}