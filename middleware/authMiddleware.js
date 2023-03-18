const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided. Authorization denied.' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.id;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found. Authorization denied.' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token. Authorization denied.' });
  }
};
