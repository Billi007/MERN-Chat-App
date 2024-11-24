import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
try {
    // extract token from cookies
    const token  = req.cookies?.jwt;
    if(!token){
        //todo = Avoid exposing too much information about why a token is invalid
        return res.status(401).json({
            error: 'Token not found!'
        });
    }

    //verify if token is valid
    let decodedToken;
     decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if(!decodedToken){
        return res.status(401).json({
            error: 'Invalid token'
        });
    }
 
     // Check if user exists
    const user = await User.findById(decodedToken?.userId).select('-password')
    if(!user){
        return res.status(401).json({
            error: 'Unauthorized, user not found',
        });
    }
    
    req.user = user;
    next();

} catch (error) {
    console.log("Error in Protect Route middleware:", error.message);
    res.status(500).json({
        success: false,
        error: 'Server error'
    });
}
};

export default protectRoute;