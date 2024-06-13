const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Razorpay = require('razorpay');
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
    is_premium: { type: Boolean, default: false },
    plan: { type: String, default: '' },
    premiumExpiry: { type: Date },
});

const User = mongoose.model('User', userSchema);

const Payment = mongoose.model('Payment', new mongoose.Schema({
  orderCreationId: String,
  razorpayPaymentId: String,
  razorpayOrderId: String,
  razorpaySignature: String,
  plan: String,
}));

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
            return res.status(409).json({ error: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, lastName, email, password: hashedPassword, category, phone, image });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, 'fRVBtWg2En', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

app.get('/api/profile', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching profile' });
    }
});

const razorpay = new Razorpay({
    key_id: 'rzp_id',
    key_secret: 'secret',
});

app.get('/api/get-razorpay-key', (req, res) => {
    res.json({ key: 'rzp_id' });
});

app.post('/api/create-order', async (req, res) => {
    try {
        const { amount } = req.body;
        const options = {
            amount,
            currency: 'INR',
            receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
        };
        const order = await razorpay.orders.create(options);
        if (!order) return res.status(500).send('Some error occurred');
        res.json({ order });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/api/save-payment-details', authenticateJWT, async (req, res) => {
    try {
        const { orderCreationId, razorpayPaymentId, razorpayOrderId, razorpaySignature, plan } = req.body;

        const payment = new Payment({
          orderCreationId,
          razorpayPaymentId,
          razorpayOrderId,
          razorpaySignature,
          plan,
        });
        await payment.save();

        const user = await User.findById(req.user.id);
        user.is_premium = true;
        user.plan = plan;
        user.premiumExpiry = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        await user.save();

        res.json({ message: 'Payment details saved successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error saving payment details' });
    }
});

app.put('/api/update-premium-status', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.is_premium = req.body.is_premium;
        await user.save();
        res.json({ message: 'User premium status updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error updating premium status' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
