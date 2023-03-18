const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// 使用者註冊
exports.register = async (req, res) => {
  const { email, password, nickname } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const existingNickname = await User.findOne({ nickname });
    if (existingNickname) {
      return res.status(400).json({ message: 'Nickname already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, password: hashedPassword, nickname });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, userId: newUser._id, nickname });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

// 使用者登入
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, userId: user._id, nickname: user.nickname });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

// Google 登入
exports.googleLogin = async (req, res) => {
  const { tokenId } = req.body;

  try {
    const response = await client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID });
    const { email_verified, email, given_name } = response.payload;

    if (!email_verified) {
      return res.status(401).json({ message: 'Email not verified.' });
    }

    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ token, userId: user._id, nickname: user.nickname });
    }

    const newUser = new User({ email, nickname: given_name, googleId: response.payload.sub });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, userId: newUser._id, nickname: newUser.nickname });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};
