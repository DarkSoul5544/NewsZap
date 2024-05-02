const express = require('express');
const app = express();
const port = 3607;
const bodyParser = require('body-parser');
const session = require('express-session');
const User = require('./users');

app.use(bodyParser.json());
app.use(
  session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false,
  })
);

app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findByEmail(req.body.email);
    // Compare the password sent in the request body with the password in the database
    // If the passwords match, set the user object in the session
    //...
    req.session.user = user;
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

app.post('/api/signup', async (req, res) => {
  try {
    const user = await User.create(req.body);
    req.session.user = user;
    res.status(200).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(400).json({ message: 'Email already in use' });
  }
});

app.get('/api/premium', (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ message: 'You are not authorized to view this content' });
    return;
  }

  // Check if the user has premium access
  // If the user has premium access, send the premium content
  //...

  res.status(200).json({ message: 'This is premium news content' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});