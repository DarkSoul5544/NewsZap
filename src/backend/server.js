const express = require('express');
const app = express();
const port = 3000; // Changed port to avoid conflict with MySQL
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const { Client } = require('pg');

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
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false,
  })
);

// MySQL connection
const db = new Client({
  connectionString: 'postgres://default:NDuzi41kphST@ep-divine-king-a40652qt.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require'
});

b.connect()
 .then(() => console.log('Connected to PostgreSQL'))
 .catch((err) => console.error('Error connecting to PostgreSQL:', err));

// User model
const User = require('./users')(db, pg);

// Routes

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findByEmail(email);
  
      if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
  
     
      if (password !== user.password) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
  
      req.session.user = user;
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'An error occurred while logging in' });
    }
  });

app.post('/signup', async (req, res) => {
  try {
    const user = await User.create(req.body);
    req.session.user = user;
    res.status(200).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(400).json({ message: 'Email already in use' });
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
  const query = 'SELECT * FROM premium_content WHERE user_id =?';
  db.query(query, req.session.user.id, (err, results) => {
    if (err) {
      console.error('Error fetching premium content:', err);
      res.status(500).json({ message: 'An error occurred while fetching premium content' });
      return;
    }

    // Send the premium content
    res.status(200).json({ message: 'This is premium news content', content: results });
  });
});