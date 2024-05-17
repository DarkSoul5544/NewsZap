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
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    category: { type: String },
    phone: { type: String },
    image: { type: String, default: 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg' },
    is_premium: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

// JWT middleware
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        jwt.verify(token, 'fRVBtWg2En', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};



// Routes
app.post('/api/signup', async (req, res) => {
    try {
        const { name, lastName, email, password, category, phone, image } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, lastName, email, password: hashedPassword, category, phone, image });
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

        res.json({ token, user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/profile', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        res.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.put('/api/profile', authenticateJWT, async (req, res) => {
    try {
        const { name, lastName, email, phone, image } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.user.userId, {
            name, lastName, email, phone, image
        }, { new: true });
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get("/api/get-razorpay-key", (req, res) => {
    res.send({ key: process.env.RAZORPAY_KEY_ID });
  });

  const Razorpay = require("razorpay");

// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

app.post("/api/create-order", async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: amount, // amount in the smallest currency unit
    currency: "INR",
  };
  try {
    const order = await razorpayInstance.orders.create(options);
    res.send({ order });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/api/save-payment-details", async (req, res) => {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;
  
    // Save payment details to the database
    // Example using Mongoose
    const payment = new Payment({
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    });
  
    try {
      await payment.save();
      res.status(200).send("Payment details saved successfully");
    } catch (error) {
      res.status(500).send("Error saving payment details");
    }
  });
  
  

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
