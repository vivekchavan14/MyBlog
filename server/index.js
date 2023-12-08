const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./models/user');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "secret_key_is_secret";
const cookieParser = require('cookie-parser');

mongoose.connect('mongodb+srv://abc:abc@cluster0.josgkqr.mongodb.net/?retryWrites=true&w=majority');
const corsOptions = {
    origin: 'http://localhost:5173', // Replace this with your actual frontend origin
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
  app.use(cors(corsOptions));
  

app.use(express.json());
app.use(cookieParser());

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const newUser = new userModel({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

        res.cookie('authToken', token, { maxAge: 3600000, httpOnly: true }); // Set token as a cookie

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

app.get('/profile', (req, res) => {
    const { authToken } = req.cookies; // Assuming the token is stored as 'authToken'

    if (!authToken) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    jwt.verify(authToken, SECRET_KEY, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }

        res.json(decoded);
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
