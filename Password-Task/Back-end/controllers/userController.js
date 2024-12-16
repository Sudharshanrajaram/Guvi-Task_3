const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
    },
});

const createUser = async (req, res) => {
    const { email, password } = req.body;
    try{
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    }catch(error){
        res.status(500).json({ message: 'Internal server error' });
    }
};

const resetRequest = async (req, res) => {
    const { email } = req.body;
    try{
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiration = Date.now() + 3600000; // 1 hour expiry

    // Save reset token and expiry to DB
    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();

    // Send email with the reset link
    const resetLink = `https://playful-kulfi-cbf752.netlify.app/reset${resetToken}`;
    await transporter.sendMail({
      to: user.email,
      subject: 'Password Reset Request',
      text: `Click the following link to reset your password: ${resetLink}`,
    });

    res.send({ message: 'Password reset link sent to your email.' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Something went wrong.' });
  }
};

const validateToken = async (req, res) => {
    const { token } = req.params;  
      try {
          const user = await User.findOne({ resetToken: token });
          if (!user || Date.now() > user.resetTokenExpiry) {
            return res.status(400).send({ message: 'Invalid or expired token.' });
          }
      
          res.send({ message: 'Token is valid.' });
        } catch (err) {
          res.status(500).send({ message: 'Something went wrong.' });
        }
      };
      
const loginUser =  async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

  
    
      // Reset Password
    const resetPassword = async (req, res) => {
        const { password } = req.body;
        const { token } = req.params;
        try {
          const user = await User.findOne({ resetToken: token });
          if (!user || Date.now() > user.resetTokenExpiry) {
            return res.status(400).send({ message: 'Invalid or expired token.' });
          }
      
           const hashedPassword = await bcrypt.hash(password, 10);
           await User.updateOne({ email: user.email },  { password: hashedPassword });
           await user.save();
           
      
          res.send({ message: 'Password has been reset successfully.' });
        } catch (err) {
          res.status(500).send({ message: 'Something went wrong.' });
        }
      };

      module.exports = {
        resetRequest,
        validateToken,
        resetPassword,
        createUser,
        loginUser
      };
     