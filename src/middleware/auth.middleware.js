const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verify; 
    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};

module.exports = authMiddleware;
