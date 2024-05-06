const express = require('express');
const app = express();
const port = 3307; // Changed port to avoid conflict with MySQL
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');

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
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'newszap'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// User model
const User = require('./users')(db);

// Routes

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findByEmail(email);
  
      if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
  
      // Compare the provided password with the stored password
      // For demonstration purposes, we're using a simple string comparison
      // In a real-world application, you should use a library like bcrypt to hash and compare passwords
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