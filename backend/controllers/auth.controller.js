import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import generateToken from '../utils/generateToken.js';


//SIGNUp
const signup = async(req,res) => {
    try {
 const { email, username,fullname,password, gender, confirmPassword, profilePicture} = req.body;
 if(password !== confirmPassword){
     return res.status(400).json({
         error: 'Passwords do not match'
     })
    }
    const finByEmail = await User.findOne({email});
    console.log(req.body)

if(finByEmail){
    return res.json({
        status: 400,
        message: 'Email already exists'
    })
}
    //Hashing password
    const hashedPassword = await bcryptjs.hash(password,10);
    console.log(hashedPassword)

    const femaleProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`  //Process.env.imageUrl/${username}
     const maleProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`
    
    const newUser = await User.create({
        username,
        email,
        fullname,
        password: hashedPassword,
        profilePicture: gender == "male" ? maleProfilePicture : femaleProfilePicture,
        gender
    })

    if(newUser){
    //Generate JWT token here
    generateToken(newUser._id, res);
    await newUser.save();

    res.json({
        status: 201,
        message: 'User created successfully',
        newUser
    })
}else {
    res.json({
        status: 500,
        error: 'Invalid user data',
    });
};

} catch (error) {
    console.log("An error occurred while creating the user", error.message)
    res.json({
        status: 500,
        error: 'Internal Server Error',
    })
}};

//LOGIN
const login = async(req,res) => {
    try {
    const {email, password} = req.body;
    const user = await User.findOne({email}); //todo

    const comparePassword = await bcryptjs.compare( password, user?.password || "") ;
    if(!user || !comparePassword){
        return res.json({
            status: 401,
            error: 'Invalid credentials',
        });
    }
    generateToken(user?._id, res);
    
    res.status(201).json({
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
    });

    } catch (error) {
        console.log("error login", error.message)
        return res.status(500).json({
            status: 500,
            message: 'Server Error',
        });
    }
}



//LOGOUT
const logout = (req, res) => {
    try {
    res.cookie('jwt', "", {maxAge:0});
    res.json({
        status: 200,
        message: 'Logged out successfully',
    });
    } catch (error) {
        console.log("error logging out", error.message)
        res.json({
            status: 500,
            message: 'Server Error',
        })
    }
}
export {signup, login, logout}