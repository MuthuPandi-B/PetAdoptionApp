import User from "../Models/userSchema.js";

// Get Users by Role
export const getUsersByRole = async (req, res) => {
  const { role } = req.query; // Get role from query parameter

  try {
    const users = await User.find(role ? { role } : {}).select("name role"); // Select only the name and role fields
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
