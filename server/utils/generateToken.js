//helper to create JWT
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.isManager ? 'admin' : 'user' },
    process.env.JWT_SECRET,
    { expiresIn: '1d' } // token expires in 1 day
  );
};

module.exports = generateToken;
