const User = require('../models/model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//User Creation 

const registerUser = async(req, res) =>{
    try{
        const { username, password, email } = req.body;
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: 'User already exists'});
        }
        const user = await User.create({ username, password, email });
        res.status(201).json(user);
    }catch(error){
        res.status(500).json({ message: 'Internal server error'});
    }
};

//LOGIN 

const loginUser = async(req, res) =>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({ message: 'Invalid credentials'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({ message: 'Invalid credentials'});
        }
        const token = jwt.sign(
            { userId: user._id, role: 'Admin', valid:'Lifetime' },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        res.status(200).json({ token });
    }catch(error){
        res.status(500).json({ message: 'Internal server error'});
    }
};

//Get Info

const getInfo = async(req, res)=>{
    try{
        const { user } = req;
        res.status(200).json({ user });
    }catch(error){
        res.status(500).json({ message: 'Internal server error'});
    }
};

module.exports = { 
    registerUser,
    loginUser,
    getInfo };