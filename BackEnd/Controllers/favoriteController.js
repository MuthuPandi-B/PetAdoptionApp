import Favorite from "../Models/favoriteSchema.js";
import Pet from "../Models/petSchema.js";
import User from "../Models/userSchema.js";

export const addFavorite = async (req, res) => {
  const { petId } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    const pet = await Pet.findById(petId);

    if (!user || !pet) {
      return res.status(404).json({ message: "User or Pet not found" });
    }

    const existingFavorite = await Favorite.findOne({ user: userId, pet: petId });
    if (existingFavorite) {
      return res.status(400).json({ message: "Pet already in favorites" });
    }

    const favorite = new Favorite({ user: userId, pet: petId });
    await favorite.save();

    res.status(200).json({ message: "Favorite added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFavorites = async (req, res) => {
  const userId = req.user._id;

  try {
    const favorites = await Favorite.find({ user: userId }).populate('pet');
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFavorite = async (req, res) => {
  const { petId } = req.body;
  const userId = req.user._id;

  try {
    const favorite = await Favorite.findOneAndDelete({ user: userId, pet: petId });

    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
