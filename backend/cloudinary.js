import { Readable } from "stream";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file from memory to Cloudinary
export const uploadToCloud = async (fileBuffer, fileName) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto", public_id: fileName },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    reject(new Error(error));
                }
                resolve(result); // Resolving with the result which includes the file URL
            }
        );

        const bufferStream = new Readable();
        bufferStream.push(fileBuffer);
        bufferStream.push(null); // End the stream
        bufferStream.pipe(uploadStream); // Pipe to Cloudinary
    });
};
