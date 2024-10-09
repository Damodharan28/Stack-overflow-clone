import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import users from "../models/auth.js";

// Signup function to register a new user
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." }); // Use 409 Conflict for existing user
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with user data and token
    res.status(201).json({ result: newUser, token }); // Use 201 Created for successful registration
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Something went wrong...", error: error.message });
  }
};

// Login function for user authentication
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const existingUser = await users.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist." }); // Use clearer message
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with user data and token
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Something went wrong..." });
  }
};

// Google authentication function

export const googleAuth = (req, res) => {
  console.log("Request User:", req.user); // Log the req.user

  if (req.user) {
    const token = jwt.sign(
      { email: req.user.email, id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("User authenticated, token created!");
    return res.redirect(`http://localhost:3000/auth/callback?token=${token}&user=${req.user}`);// Ensure you return here
  }

  console.error("Authentication failed, req.user is undefined."); // Log error if req.user is undefined
  return res.status(500).json({ message: "Something went wrong during Google authentication." }); // Return response
};

// Function to handle error response during Google Authentication
export const googleAuthError = (req, res) => {
  res.status(401).json({ message: "Google authentication failed." });
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // Get userId from the request object

    // Fetch user data excluding the password field
    const user = await users.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(user); // Return user data
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
