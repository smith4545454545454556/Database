import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const cloudinarySetup = async (fileData) => {
    console.log(fileData, "filedata cloudinary")
    try {
        const cloud = await cloudinary.uploader.upload(fileData, {
            resource_type: "auto"

        })
        console.log(cloud)
        return cloud

    }
    catch (error) {
        console.log(error)

    }


}