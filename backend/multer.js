import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up multer to store files in memory instead of on disk
const storage = multer.memoryStorage(); // Using memory storage instead of disk

const upload = multer({ storage }); // Using the memory storage here
export default upload;
