const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    // Check if JWT_SECRET is configured
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured in environment variables");
      return res.status(500).json({ 
        message: "Server configuration error. Please contact administrator." 
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user (set default role to "user" if not provided)
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await user.save();

    // Validate user data before creating token
    if (!user._id || !user.email) {
      console.error("User data is incomplete after save:", { id: user._id, email: user.email });
      return res.status(500).json({ 
        message: "User data error. Please contact administrator." 
      });
    }

    // Generate token
    const token = jwt.sign(
      { 
        id: user._id.toString(), 
        role: user.role || "user", 
        name: user.name || "", 
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered successfully ✅",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
      },
      token,
    });

  } catch (err) {
    console.error("Register error details:", {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    res.status(500).json({ 
      message: "Server error occurred. Please try again later.",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if JWT_SECRET is configured
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured in environment variables");
      return res.status(500).json({ 
        message: "Server configuration error. Please contact administrator." 
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if user has a password (not a Google OAuth only user)
    if (!user.password) {
      return res.status(400).json({ 
        message: "This account was created with Google. Please use Google login." 
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Validate user data before creating token
    if (!user._id || !user.email) {
      console.error("User data is incomplete:", { id: user._id, email: user.email });
      return res.status(500).json({ 
        message: "User data error. Please contact administrator." 
      });
    }

    // Generate token
    const token = jwt.sign(
      { 
        id: user._id.toString(), 
        role: user.role || "user", 
        name: user.name || "", 
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful ✅",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
      },
    });

  } catch (err) {
    console.error("Login error details:", {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    res.status(500).json({ 
      message: "Server error occurred. Please try again later.",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

