import pkg from "cloudinary"; 
const {v2: cloudinary} = pkg;
import dotenv from "dotenv";
dotenv.config();

try {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

  if (!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_API_SECRET) {
    throw new Error("Cloudinary environment variables are missing. Check your .env file.");
  }
  console.log("Cloudinary configured successfully.");
} catch (error) {
  console.error("Cloudinary configuration error:", error.message);
  process.exit(1); // Exit the application if Cloudinary fails to configure
}

export default cloudinary;
