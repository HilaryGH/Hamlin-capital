const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const path = require("path");

dotenv.config();

// Check for required environment variables
if (!process.env.JWT_SECRET) {
  console.error("❌ ERROR: JWT_SECRET is not set in environment variables!");
  console.error("Please set JWT_SECRET in your .env file");
  process.exit(1);
}

if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is not set in environment variables!");
  console.error("Please set MONGO_URI in your .env file");
  process.exit(1);
}

const app = express();

// === Middleware ===
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files from 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
app.use("/api/startup", require("./routes/startup"));
app.use("/api/investors", require("./routes/investor"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/users", require("./routes/user"));
app.use("/api/files", require("./routes/upload")); // only for generic file upload

app.use("/api/user-notifications", require("./routes/userNotificationRoute"));
const notificationRoute = require("./routes/notificationRoute");
app.use("/api/notifications", notificationRoute);

const contactRoutes = require("./routes/contactRoutes");
// Routes
app.use("/api/contact", contactRoutes);

app.use("/api/listings", require("./routes/listings"));
app.use("/api/debt-deals", require("./routes/debtDeals"));
app.use("/api/careers", require("./routes/careerRoutes"));
app.use("/api/applications", require("./routes/applications"));
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/diaspora", require("./routes/diasporaRoutes"));
app.use("/api/community-posts", require("./routes/communityPosts"));
app.use("/api/memberships", require("./routes/memberships"));
app.use("/api", require("./routes/authRoutes")); // contains login/register

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("Hamlin Backend is running ✅");
});
const interestRoutes = require("./routes/interests");
app.use("/api/interests", interestRoutes);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});



