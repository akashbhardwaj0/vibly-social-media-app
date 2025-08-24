import getAuthToken from "../config/authToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Sign Up Controller

export const signUp = async (req, res) => {
  const { name, email, userName, password } = req.body;
  try {
    if (!name || !email || !userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const findByEmail = await User.findOne({ email });
    if (findByEmail) {
      return res.status(400).json({ message: "Email already exists !" });
    }
    const findByUserName = await User.findOne({ userName });
    if (findByUserName) {
      return res.status(400).json({ message: "Username already exists !" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (hashedPassword) {
      const user = await User.create({
        name,
        email,
        userName,
        password: hashedPassword,
      });

      const token = await getAuthToken(user._id);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: false,
        sameSite: "strict",
      });

      const { password: _, ...userWithoutPassword } = user._doc;

      return res.status(201).json({
        message: "User created successfully",
        user: userWithoutPassword,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: `Error creating user: ${error}` });
  }
};

// Sign In Controller
export const signIn = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = await getAuthToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "User signed in successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: `Error signing in: ${error}` });
  }
};

// Sign Out Controller
export const signOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    return res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Error signing out: ${error}` });
  }
};
