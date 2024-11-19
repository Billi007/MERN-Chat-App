import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
try {
    // extract token from cookies
    const token  = req.cookies.jwt;
    if(!token){
        return res.json({
            status: 401,
            error: 'Token not found!'
        });
    }
    //verify if token is valid
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if(!decodedToken){
        return res.json({
            status: 401,
            error: 'Token is not valid'
        });
    }

    const user = await User.findById(decodedToken?.userId).select('-password')
    if(!user){
        return res.json({
            status: 401,
            error: 'User not found'
        });
    }
    
    req.user = user;
    next();

} catch (error) {
    console.log("Error in Protect Route middleware:", error.message);
    res.json({
        success: false,
        error: 'Token is not valid'
    })
}
};

export default protectRoute;