// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/newszap', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

// Define user schema and model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_premium: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name , email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'fRVBtWg2En', { expiresIn: '1h' });
        console.error('Error logging in:', error);

        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/premium', (req, res) => {
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
    User.findOne({ _id: req.session.user._id, is_premium: true })
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

  
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
