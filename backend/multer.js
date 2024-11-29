import multer from "multer";
import fs from "fs"
import path from "path";
import { fileURLToPath } from "url";
console.log("hello")
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "uploads");
        console.log("Resolved Upload Path:", uploadPath);

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        return cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        console.log(file, "filename")
        return cb(null, file.originalname)

    }
})
const upload = multer({ storage })
export default upload