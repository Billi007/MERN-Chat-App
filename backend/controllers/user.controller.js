import User from "../models/user.model.js";

const getUserForSidebar = async (req, res) => {
    try {
        console.log("mera request",req)
        const {email} =  req.body;

        const filteredUser = await User.find().select('-password');

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
// find with email (req.body)
//can't set cookies during login that's why it can't authenticate
//send cookies
