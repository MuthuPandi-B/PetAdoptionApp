import express from "express";
import { scheduleAppointment, getAppointmentsByUser, getAllAppointments, updateAppointmentStatus } from "../Controllers/appointmentController.js";
import { authMiddleware, adminMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/schedule", authMiddleware, scheduleAppointment); // Authenticated users can schedule appointments
router.get("/user", authMiddleware, getAppointmentsByUser); // Authenticated users can view their appointments
router.get("/all",authMiddleware,adminMiddleware, getAllAppointments); // Admin can view all appointments
router.put("/status/:id", authMiddleware, adminMiddleware,updateAppointmentStatus); // Admin can cancel appointments

export default router;
