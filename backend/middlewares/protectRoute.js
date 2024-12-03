import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
try {
    // extract token from cookies
    const token  = req.cookies?.jwt;
    if(!token){
    return res.status(401).json({ error: "Unauthorized - No Token Provided" });
    }

    //verify if token is valid
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if(!decodedToken){
    return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }
 
     // Check if user exists
    const user = await User.findById(decodedToken?.userId).select('-password')
    if(!user){
    return res.status(404).json({ error: "User not found" });
    }
    
    req.user = user;
    next();

} catch (error) {
    console.log("Error in Protect Route middleware:", error.message);
    res.status(500).json({ error: "Internal server error" });
}
};

export default protectRoute;