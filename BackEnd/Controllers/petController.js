

import Pet from "../Models/petSchema.js";
import dotenv from "dotenv";
import User from "../Models/userSchema.js";
import sendEmail from "../Utils/emailService.js";

dotenv.config();

export const createPet = async (req, res) => {
  const { petName, petBreed, petAge, petSize, petColour, petLocation, petMedicalhistory, petGender } = req.body; 
  let mediaUrl = "";
  if (req.file && req.file.path) {
    mediaUrl = req.file.path;
  }

  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const pet = new Pet({
      petName,
      petBreed,
      petAge,
      petSize,
      petColour,
      petLocation,
      media: mediaUrl,
      petMedicalhistory,
      petGender,
    });
    await pet.save();

    // Fetch all adopters
    const adopters = await User.find({ role: "adopter" });
 

    // Check if adopters exist
    if (!adopters || adopters.length === 0) {
      return res.status(200).json({ message: "Pet created successfully, but no adopters to notify." });
    }

  


    // Send email to all adopters
    for (const adopter of adopters) {
      if (adopter.email) {
        console.log(`Sending email to: ${adopter.email}`); // Debug log
        await sendEmail(
           adopter.email,
         " New Pet Listed for Adoption",
          ` Dear Adopters,
      A new pet named "${petName}" has been listed on our platform.
      Breed: ${petBreed}
      You can view more details about this pet by visiting https://adopt-a-pets.netlify.app
      Thank you for being a part of our community!
      Regards
      Adopt-A-Pet Platform`
        );
      } else {
        console.error(`No email defined for adopter with ID: ${adopter._id}`); // Debug log
      }
    }

    res.status(200).json({ message: "Pet created successfully and notifications sent to adopters" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};




export const getPets = async (req, res) => {
  const { breed, age, size, location } = req.query;
  let query = {};
  if (breed) query.petBreed = breed;
  if (age) query.petAge = age;
  if (size) query.petSize = size;
  if (location) query.petLocation = location;

  try {
    const pets = await Pet.find(query);
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// New function to get a single pet by ID
export const getPetById = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePet = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findByIdAndDelete(id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editPet = async (req, res) => {
  const { id } = req.params;
  const { petName, petBreed, petAge, petSize, petColour, petLocation, petMedicalhistory, petGender } = req.body;
  try {
    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    pet.petName = petName;
    pet.petBreed = petBreed;
    pet.petAge = petAge;
    pet.petSize = petSize;
    pet.petColour = petColour;
    pet.petLocation = petLocation;
    pet.petMedicalhistory = petMedicalhistory;
    pet.petGender = petGender;
    pet.petLocation = petLocation;

    if (req.file && req.file.path) {
      pet.media = req.file.path;
    }

    await pet.save();
    res.status(200).json({ message: "Pet updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const adoptPet = async (req, res) => {
  const { petId } = req.params;
  const userId = req.user._id;


  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    const shelter = await User.findOne({role:"shelter"});
    if (!shelter||!shelter.email) {
      return res.status(404).json({ message: "Shelter not found" });
    }

    const shelterEmail =shelter.email; 

    // Compose the email content for the shelter
  

    // Send email to the shelter
    await sendEmail(
      shelterEmail,
      "New Adoption Request",
     `Dear Shelter,
      User ${user.name} wishes to adopt the pet ${pet.petName} with PetId: ${pet._id}
      For more details Contact user through ${user.email}
      Thank you!
      Adopt-A-Pet Platform`
    );

    // Notify the user
 

    await sendEmail(
      user.email,
      "Adoption Request Submitted",
     `Dear ${user.name}
     Your request to adopt ${pet.petName} has been submitted successfully. We will get back to you soon.
     Thank you!
     Adopt-A-Pet Platform`
    );

    res.status(200).json({ message: "Adoption request submitted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};
