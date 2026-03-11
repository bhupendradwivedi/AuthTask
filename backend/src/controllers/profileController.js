const userModel = require("../models/userModel");

const getProfile = async (req, res, next) => {
  try {
    const id = req.userId || (req.user && req.user._id);

    const user = await userModel
      .findById(id)
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); 
  } catch (error) {
    next(error);
  }
};

  module.exports= getProfile