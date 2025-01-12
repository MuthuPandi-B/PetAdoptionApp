import Application from "../Models/applicationSchema.js";
import sendEmail from "../Utils/emailService.js";
import User from "../Models/userSchema.js";

export const createApplication = async (req, res) => {
  const { petName, petBreed, applicantName, email, phone, address, reason ,shelternotes} = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    const application = new Application({
      petName,
      petBreed,
      applicantName,
      email,
      phone,
      address,
      reason,
      shelternotes,
      creator: userId,
      status: "Pending",
    });
    console.log("application:", application.creator);
    await application.save();
    res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplicationByUserId = async (req, res) => {
  const userId = req.user._id;
  try {
    const applications = await Application.find({ creator: userId });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplicationById = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editApplication = async (req, res) => {
  const { id } = req.params;
  const { petName, petBreed, applicantName, email, phone, address, reason } = req.body;
  try {
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    application.petName = petName;
    application.petBreed = petBreed;
    application.applicantName = applicantName;
    application.email = email;
    application.phone = phone;
    application.address = address;
    application.reason = reason;
    await application.save();
    res.status(200).json({ message: "Application updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveApplication = async (req, res) => {
  const { id } = req.params;
  const { shelternotes } = req.body;
  try {
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    const user = await User.findById(application.creator).select("email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    application.status = "Approved";
    application.shelternotes = shelternotes;
    await application.save();
    await sendEmail(
      user.email,
      "Application Approved",
      `Your application has been approved. Reason: ${shelternotes}`
    );
    res.status(200).json({ message: "Application approved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectApplication = async (req, res) => {
  const { id } = req.params;
  const { shelternotes } = req.body;
  try {
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    const user = await User.findById(application.creator).select("email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    application.status = "Rejected";
    application.shelternotes = shelternotes;
    await application.save();
    await sendEmail(
      user.email,
      "Application Rejected",
      `Your application has been rejected. Reason: ${shelternotes}`
    );
    res.status(200).json({ message: "Application rejected successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await Application.findByIdAndDelete(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPendingApplications = async (req, res) => {
  try {
    const applications = await Application.find({ status: "Pending" });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApprovedApplications = async (req, res) => {
  try {
    const applications = await Application.find({ status: "Approved" });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRejectedApplications = async (req, res) => {
  try {
    const applications = await Application.find({ status: "Rejected" });
    res.status(200).json(applications);
  } catch (error) {
    res.status (500).json({ message: error.message });
  }
};

export const scheduleMeetAndGreet = async (req, res) => {
  const { id } = req.params;
  const { date, time } = req.body;
  try {
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    application.meetAndGreetDate = date;
    application.meetAndGreetTime = time;
    application.status = "Meet-and-Greet Scheduled";
    await application.save();
    const user = await User.findById(application.creator).select("email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await sendEmail(
      user.email,
      "Meet and Greet Scheduled",
      `Your meet-and-greet has been scheduled for ${date} at ${time}.`
    );
    res.status(200).json({ message: "Meet and greet scheduled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const requestAdditionalInfo = async (req, res) => {
  const { id } = req.params;
  const { shelternotes} = req.body;
  try {
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    application.status = "Additional Information Needed";
    await application.save();
    const user = await User.findById(application.creator).select("email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await sendEmail(
      user.email,
      "Additional Information Needed",
      shelternotes
    );
    res.status(200).json({ message: "Request for additional information sent and email notification sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
