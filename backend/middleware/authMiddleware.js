const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization"); // Get the Authorization header

  // Check if the Authorization header is missing
  if (!authHeader) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  // Extract the token and remove "Bearer " prefix
  const token = authHeader.replace("Bearer ", "");

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded payload to req.user
    next(); // Pass control to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};

module.exports = authMiddleware;
