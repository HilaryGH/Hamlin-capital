const NotificationModel = require("../models/Notification");
const User = require("../models/User"); // your User model

// After saving newDeal
const usersToNotify = await Notification.find({ dealType: dealType });

for (const u of usersToNotify) {
  const user = await User.findOne({ email: u.email });
  if (user) {
    const notification = new NotificationModel({
      userId: user._id,
      title: `New ${dealType} Deal`,
      message: `${title}: ${description}`,
      dealType,
    });
    await notification.save();
  }
}
