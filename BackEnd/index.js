import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/dbconfig.js";
import authRoutes from "./Routers/authRoutes.js";
import applicationRoutes from "./Routers/applicationRoutes.js";
import petRoutes from "./Routers/petRoutes.js";
import reviewRoutes from "./Routers/reviewRoutes.js";
import messageRoutes from "./Routers/messageRoutes.js";
import appointmentRoutes from "./Routers/appointmentRoutes.js";
import userRoutes from "./Routers/userRoutes.js";
import favoriteRoutes from "./Routers/favoriteRoutes.js";
import fosterPetRoutes from "./Routers/fosterPetRoutes.js";

dotenv.config();
const app = express();

app.use(cors({
     origin: 'https://adopt-a-pets.netlify.app',
     origin: 'http://localhost:5173',
     credentials: true,
}));
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
    res.send("Welcome to pet adoption backend");
});
app.use ("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/pets", petRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use("/api",userRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use("/api/reviews", reviewRoutes);
app.use('/api/fosterpets', fosterPetRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});