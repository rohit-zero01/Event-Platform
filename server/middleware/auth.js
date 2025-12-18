const jwt = require("jsonwebtoken");

console.log("AUTH MIDDLEWARE HIT");


module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
    console.log("✅ AUTH USER ID:", req.user);

  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
