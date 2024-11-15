import User from "../models/user.model.js";

const getUserForSidebar = async (req, res) => {
    try {
        const loggedInuserId = req.user._id;

        const filteredUser = await User.find({_id: {$ne: loggedInuserId}}).select('-password');

        res.status(200).json(filteredUser)
        
    } catch (error) {
        console.log("Error getting user for sidebar", error.message);
        res.json({
            status: 500,
            message: "Error fetching user"
        })
    }
}

export {getUserForSidebar}