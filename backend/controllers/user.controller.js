import User from "../models/user.model.js";

const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error fetching user for sidebar", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getUserForSidebar;
// find with email (req.body)
//can't set cookies during login that's why it can't authenticate
//send cookies
