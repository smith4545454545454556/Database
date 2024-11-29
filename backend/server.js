import express from "express"
import { dataModel } from "./model/data.js"
import { connectDB } from "./config.js"
import dotenv from "dotenv"
import upload from "./multer.js"
import { uploadToCloud } from "./cloudinary.js"
dotenv.config()
const app = express()
app.use(express.json())
connectDB()

// app.get("/", (req, res) => {
//     res.send("server is running")

// })
app.get("/api/jokes", (req, res) => {
    const jokes = [{
        id: 1,
        content: "welcome"
    }, {
        id: 2,
        content: "user"
    }]
    res.send(jokes)
})
app.post("/api/data", async (req, res) => {
    const { name } = req.body
    const user = new dataModel({
        name: "hello"
    })
    await user.save()
    return res.status(200).json({ message: "Data received" }); // Send success response

})
app.post("/api/formData", upload.single("profile"), async (req, res) => {
    const { name, email } = req.body;

    // File data from memory storage
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname; // Get the original file name


    console.log(fileBuffer, "fileBuffer");

    try {
        // Upload file to Cloudinary using the buffer
        const response = await uploadToCloud(fileBuffer, fileName); // Adjust your cloudinary setup to handle the buffer
        console.log(response, "cloudinary response");

        // Create new data model with Cloudinary URL
        const formdata = new dataModel({
            name: name,
            email: email,
            profile: response.secure_url, // Cloudinary's URL
        });

        // Save the data to the database
        await formdata.save();

        // Send success response
        return res.status(200).json({ message: "Data uploaded successfully", filedata: response.secure_url });
    } catch (error) {
        // Handle errors
        console.error("Error uploading to Cloudinary:", error);
        return res.status(500).json({ message: "Error uploading file", error: error.message });
    }
});

const port = process.env.PORT || 3000
app.listen(port, async () => {
    console.log(`server is running at ${port}`)
})