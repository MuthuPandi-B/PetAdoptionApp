
import express from 'express';
import { createFosterPet, getFosterPetsByShelter, getPendingFosterPets, requestToFoster, updateFosterNotes, requestReturn, acceptFosterRequest, getFosterPetsForFoster, deleteFosterPet } from '../Controllers/fosterPetController.js';
import { authMiddleware, adminMiddleware } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, adminMiddleware, createFosterPet);
router.get('/shelter', authMiddleware, adminMiddleware, getFosterPetsByShelter);
router.get('/pending', authMiddleware, getPendingFosterPets);
router.get('/foster', authMiddleware, getFosterPetsForFoster); // Added this route
router.post('/request/:id', authMiddleware, requestToFoster);
router.put('/note/:id', authMiddleware, updateFosterNotes);
router.post('/return/:id', authMiddleware, requestReturn);
router.post('/accept/:id', authMiddleware, adminMiddleware, acceptFosterRequest);
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteFosterPet);

export default router;
