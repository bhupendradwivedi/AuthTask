const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const sendVerificationEmail = require("../utils/sendEmail")
const { generateVerificationToken } = require("../utils/token")
const { generateAuthToken } = require("../utils/token")
const jwt = require("jsonwebtoken")
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

  
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash and Create
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false 
    });

    const verificationToken = generateVerificationToken(user._id);
    const link = `${process.env.BASE_URL}/api/auth/verify-email?token=${verificationToken}`;

    
    sendVerificationEmail(email, link).catch(err => console.error("Email failed in background:", err));

    // Send success
    return res.status(201).json({
      message: "User registered successfully. Please verify email.",
      userId: user._id
    });

  } catch (error) {
    next(error);
  }
};
 const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "Verification token is missing" });
    }

    // Verify JWT token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isVerified) {
      // Redirect if already verified 
      return res.redirect(`${process.env.FRONTEND_URL}/login?message=already_verified`);
    }

    // Update verification status 
    user.isVerified = true;
    await user.save();

    // Redirect to frontend login page 
    return res.redirect(`${process.env.FRONTEND_URL}/login?verified=true`);

  } catch (error) {
    console.log(error);
    // Redirect to login with error status
    return res.redirect(`${process.env.FRONTEND_URL}/login?error=verification_failed`);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Basic Validation 
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2. Find User  
    const user = await userModel.findOne({ email }); 
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Verify Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 4. Check Verification Status 
    if (!user.isVerified) {
      return res.status(401).json({ message: "Please verify your email first" });
    }

    // 5. Generate and Send Token 
    const token = generateAuthToken(user._id);
    return res.status(200).json({ token });

  } catch (error) {
    next(error);
  }
};

module.exports ={ register,verifyEmail,login}