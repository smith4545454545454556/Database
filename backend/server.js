import express from "express"
import { dataModel } from "./model/data.js"
import { connectDB } from "./config.js"
import dotenv from "dotenv"
import upload from "./multer.js"
import { cloudinarySetup } from "./cloudinary.js"
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
    const { name, email } = req.body
    const filedata = req.file.path
    console.log(filedata, "th file")
    const response = await cloudinarySetup(filedata)
    console.log(response, "cloudinaryres")
    const formdata = new dataModel({
        name: name,
        email: email,
        profile: response.secure_url
    })
    await formdata.save()
    return res.status(200).json({ message: "Data ", filedata: "hi" }); // Send success response

})
const port = process.env.PORT || 3000
app.listen(port, async () => {
    console.log(`server is running at ${port}`)
})