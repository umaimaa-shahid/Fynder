import User from "../models/User.js";

/* =========================
   STEP 1
========================= */
export const step1Profile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rollNumber, department, batch, cgpa } = req.body;

    if (!rollNumber || !department || !batch) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "profile.rollNumber": req.body.rollNumber,
          "profile.department": req.body.department,
          "profile.batch": req.body.batch,
          "profile.cgpa": req.body.cgpa,
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Step 1 saved",
      user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const step2Profile = async (req, res) => {
  try {
    console.log("USER:", req.user);
    const userId = req.user.id;
    const { skills } = req.body;

    if (!skills || skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Skills are required",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "profile.skills": skills,
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Step 2 saved successfully",
      profile: user.profile,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const step3Profile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { interests, availability, bio } = req.body;

    if (!interests || interests.length === 0 || !availability) {
      return res.status(400).json({
        success: false,
        message: "Interests and availability are required",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "profile.interests": interests,
          "profile.availability": availability,
          "profile.bio": bio,
          "profile.profileCompleted": true,
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile completed successfully",
      profile: user.profile,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};