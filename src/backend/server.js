const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Connect to MongoDB
mongoose.connect('mongodb+srv://darky:darky@newszap.h4zustk.mongodb.net/newszap', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Increase the maximum header size limit to 1000KB
app.use(bodyParser.json({ limit: '1000kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '2000kb' }));

// Define User schema and model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_premium: { type: Boolean, default: false },
});
const User = mongoose.model('User', userSchema , {
  email: String,
  password: String,
});

app.use(express.json());

// CORS configuration
app.use(cors({
  origin: '*',
  credentials: true
}));

// Body parser configuration
app.use(bodyParser.json());

// Session configuration
app.use(
  session({
    secret: 'ZYGUsxSpwa',
    resave: false,
    saveUninitialized: false,
  })
);

// Routes

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await newszap.users.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const isValidUser = await bcrypt.compare(password, user.password);
    if (!isValidUser) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    const accessToken = jwt.sign(
      {
        email: email,
      },
      "XFWu1ZzBXQ",
      { expiresIn: "1800s" }
    );

    const refreshToken = jwt.sign(
      {
        email: email,
      },
      "V7xxamwoiM",
      { expiresIn: "1y" }
    );

    res.json({ success: true, accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the name, email, and password are provided
  if (!name ||!email ||!password) {
    res.status(400).json({ message: 'Please provide name, email, and password' });
    return;
  }

  // Check if the email is already in use
  const existingUser = await newszap.users.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: 'Email already in use' });
    return;
  }

  // Create a new user
  const newUser = new newszap.users({ name, email, password });

  // Save the new user to the database
  try {
    await newUser.save();
    req.session.user = newUser;
    res.status(200).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while signing up' });
  }
});

app.get('/premium', (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ message: 'You are not authorized to view this content' });
    return;
  }

  // Check if the user has premium access
  if (!req.session.user.is_premium) {
    res.status(403).json({ message: 'You do not have premium access' });
    return;
  }

  // Fetch premium content from the database
  newszap.users.findOne({ _id: req.session.user._id, is_premium: true })
   .then((user) => {
      if (!user) {
        res.status(403).json({ message: 'You do not have premium access' });
        return;
      }

      // Send the premium content
      res.status(200).json({ message: 'This is premium news content', content: user.premium_content });
    })
   .catch((err) => {
      console.error('Error fetching premium content:', err);
      res.status(500).json({ message: 'An error occurred while fetching premium content' });
    });
});