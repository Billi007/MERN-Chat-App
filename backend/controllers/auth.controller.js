import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";

//SIGNUp
const signup = async (req, res) => {
  try {
    const {
      email,
      username,
      fullname,
      password,
      gender,
      confirmPassword,
      profilePicture,
    } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "Passwords do not match",
      });
    }
    const findByEmail = await User.findOne({ email });

    if (findByEmail) {
      return res.json({
        status: 400,
        message: "Email already exists",
      });
    }
    //Hashing password
    const hashedPassword = await bcryptjs.hash(password, 10);

    const femaleProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`; //Process.env.imageUrl/${username}
    const maleProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const user = new User({
      username,
      email,
      fullname,
      password: hashedPassword,
      profilePicture:
        gender == "male" ? maleProfilePicture : femaleProfilePicture,
      gender,
    });

    if (user) {
      //Generate JWT token here
      generateToken(user._id, res);
      await user.save();

      res.status(201).json({
        message: "User created successfully",
        user,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("An error occurred while creating the user", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); //todo

    const comparePassword = await bcryptjs.compare(
      password,
      user?.password || ""
    );
    if (!user || !comparePassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    generateToken(user?._id, res);

    res.status(201).json({
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    console.log("error login", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//LOGOUT
const logout = (req, res) => {
  try {
    res.cookie("jwt", " ", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("error logging out", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export { signup, login, logout };
