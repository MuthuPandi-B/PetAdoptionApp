import express, { Router } from "express";
import { createPet, editPet, deletePet, getPets, getPetById, adoptPet,  } from "../Controllers/petController.js";
import { adminMiddleware, authMiddleware } from "../Middleware/authMiddleware.js";
import { loginUser } from "../Controllers/authController.js";
import upload from "../Config/Multer.js"; // Import the multer configuration

const router = express.Router();

router.post("/login", loginUser);
router.post("/create", authMiddleware, adminMiddleware, upload.single('media'), createPet); // Add upload middleware
router.put("/edit/:id", authMiddleware, adminMiddleware, upload.single('media'), editPet); // Add upload middleware
router.delete("/delete/:id", authMiddleware, adminMiddleware, deletePet);
router.get("/", getPets); // Adjusted path to '/pets'
router.get("/:id",authMiddleware ,getPetById); // Adjusted path to '/pets/:id'
router.post("/adopt/:petId", authMiddleware, adoptPet);

export default router;
