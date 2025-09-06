const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_TIMEOUT = process.env.JWT_TIMEOUT || '7d';  // default 7 din

// Function to generate JWT token
const generateToken = (userId, userEmail, userRole) => {
  return jwt.sign(
    { _id: userId, email: userEmail, role: userRole },  // payload
    JWT_SECRET,  
    { expiresIn: JWT_TIMEOUT }  
  );
};

module.exports = generateToken;
