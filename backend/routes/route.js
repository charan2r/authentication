const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already registered.' });
        }

        user = new User({
            username,
            email,
            password: await bcrypt.hash(password, 10),
        });

        await user.save();

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } catch (error) {
        console.error('Registration Error:', error);  
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).send('User not registered');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).send('Invalid credentials');
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn: '24h'});

        res.json({token});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;