const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body; // 👈 include role in req.body

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered." });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user (set default role to "user" if not provided)
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user", // 👈 fallback to "user"
    });

    await user.save();

   res.status(201).json({
  message: "User registered successfully ✅",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
  token: jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  }),
});

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
  { id: user._id, role: user.role, name: user.name, email: user.email }, // add name here
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
    role: user.role,
  },
});

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

