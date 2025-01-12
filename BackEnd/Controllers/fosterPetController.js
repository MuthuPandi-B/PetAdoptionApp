import FosterPet from '../Models/fosterPetSchema.js';

// Create Foster Pet
export const createFosterPet = async (req, res) => {
  const { name, breed, age, medicalHistory } = req.body;
  const shelterId = req.user._id; // The authenticated user's ID who is a shelter

  try {
    const newFosterPet = new FosterPet({
      name,
      breed,
      age,
      medicalHistory,
      shelter: shelterId, // Assign the authenticated user's ID as the shelter ID
    });
    await newFosterPet.save();
    res.status(201).json({ message: 'Foster pet created successfully', fosterPet: newFosterPet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Foster Pets by Shelter
export const getFosterPetsByShelter = async (req, res) => {
  try {
    const fosterPets = await FosterPet.find({ shelter: req.user._id }).populate('fosterParent', 'name email');
    res.status(200).json(fosterPets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Pending Foster Pets for Foster
export const getPendingFosterPets = async (req, res) => {
  try {
    const fosterPets = await FosterPet.find({ status: 'Pending' }).populate('shelter', 'name email');
    res.status(200).json(fosterPets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Request to Foster
export const requestToFoster = async (req, res) => {
  const { id } = req.params;
  try {
    const fosterPet = await FosterPet.findById(id);
    if (!fosterPet) {
      return res.status(404).json({ message: 'Foster pet not found' });
    }
    fosterPet.status = 'Requested';
    fosterPet.fosterParent = req.user._id;
    await fosterPet.save();
    res.status(200).json({ message: 'Request to foster sent successfully', fosterPet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Notes by Foster
export const updateFosterNotes = async (req, res) => {
  const { id } = req.params;
  const { note } = req.body;
  try {
    const fosterPet = await FosterPet.findById(id);
    if (!fosterPet) {
      return res.status(404).json({ message: 'Foster pet not found' });
    }
    if (fosterPet.fosterParent.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    fosterPet.notes = note;
    await fosterPet.save();
    res.status(200).json({ message: 'Note updated successfully', fosterPet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Request Return by Foster
export const requestReturn = async (req, res) => {
  const { id } = req.params;
  try {
    const fosterPet = await FosterPet.findById(id);
    if (!fosterPet) {
      return res.status(404).json({ message: 'Foster pet not found' });
    }
    if (fosterPet.fosterParent.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    fosterPet.status = 'Returned';
    await fosterPet.save();
    res.status(200).json({ message: 'Return requested successfully', fosterPet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept Foster Request by Shelter
export const acceptFosterRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const fosterPet = await FosterPet.findById(id);
    if (!fosterPet) {
      return res.status(404).json({ message: 'Foster pet not found' });
    }
    if (fosterPet.shelter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    fosterPet.status = 'In Foster Care';
    await fosterPet.save();
    res.status(200).json({ message: 'Foster request accepted successfully', fosterPet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get Foster Pets for Foster Parent
export const getFosterPetsForFoster = async (req, res) => {
  try {
    const fosterPets = await FosterPet.find({
      fosterParent: req.user._id,
      status: { $in: ['Requested', 'In Foster Care', 'Returned'] }
    }).populate('shelter', 'name email');
    res.status(200).json(fosterPets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 export const deleteFosterPet = async (req, res) => {
    const { id } = req.params;
    try {
      const fosterPet = await FosterPet.findByIdAndDelete(id);
      if (!fosterPet) {
        return res.status(404).json({ message: "Foster pet not found" });
      }
      res.status(200).json({ message: "Foster pet deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };