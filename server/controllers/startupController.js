const Startup = require('../models/Startup');

exports.registerStartup = async (req, res) => {
  try {
    const {
      companyName,
      companyAge,
      companyType,
      annualTurnover,
    } = req.body;

    const files = req.files;

    const newStartup = new Startup({
      companyName,
      companyAge,
      companyType,
      annualTurnover,
      registrationFile: files?.registrationFile?.[0]?.filename || '',
      pitchDeck: files?.pitchDeck?.[0]?.filename || '',
      businessPlan: files?.businessPlan?.[0]?.filename || '',
      financialModel: files?.financialModel?.[0]?.filename || '',
      founderProfile: files?.founderProfile?.[0]?.filename || '',
      userId: req.user.id, // ✅ Important: link to logged-in user
    });

    await newStartup.save();

    res.status(201).json({ message: 'Startup registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getMyStartup = async (req, res) => {
  try {
    const startup = await Startup.findOne({ userId: req.user.id });

    if (!startup) {
      return res.status(404).json({ message: "No submission found" });
    }

    res.status(200).json({ startup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
