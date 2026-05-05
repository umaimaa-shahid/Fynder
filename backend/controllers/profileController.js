import User from "../models/User.js";

// STEP 1
export const saveStep1 = async (req, res) => {
  try {
    const userId = req.user.id;

    const { rollNumber, department, batch, cgpa } = req.body;

    await User.findByIdAndUpdate(userId, {
      "profile.rollNumber": rollNumber,
      "profile.department": department,
      "profile.batch": batch,
      "profile.cgpa": cgpa,
    });

    res.json({ message: "Step 1 saved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const saveStep2 = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const { skills } = req.body;
  
      await User.findByIdAndUpdate(userId, {
        "profile.skills": skills,
      });
  
      res.json({ message: "Step 2 saved" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  export const saveStep3 = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const { interests, availability, bio } = req.body;
  
      await User.findByIdAndUpdate(userId, {
        "profile.interests": interests,
        "profile.availability": availability,
        "profile.bio": bio,
        "profile.profileCompleted": true,
      });
  
      res.json({ message: "Profile completed" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };