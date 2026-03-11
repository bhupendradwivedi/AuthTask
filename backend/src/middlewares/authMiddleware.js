const { verifyToken } = require("../utils/token");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    // Token se userId nikal kar request mein set karein
    req.userId = decoded.userId; 
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports= authMiddleware