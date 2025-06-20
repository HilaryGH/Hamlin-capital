
// controllers/adminController.js
const Notification = require("../models/Notification");
const Subscription = require("../models/Subscription");

router.post("/create-deal", async (req, res) => {
  const { title, message, dealType } = req.body;
  try {
    const subscribers = await Subscription.find({ dealType });

    for (let sub of subscribers) {
      await Notification.create({
        userId: sub.userId, // make sure this field exists
        message,
      });
    }


    res.status(201).json({ message: "Deal created and notifications sent!" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
exports.adminDashboard = (req, res) => {
  res.send("Admin Dashboard works ✅");
};