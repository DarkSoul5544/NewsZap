const express = require("express");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const WebSocket = require('ws');

const app = express();
const port = process.env.PORT || 3000;

// Create a connection pool for the MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "darky",
  database: "newszap",
  authSwitchHandler: (data, callback) => {
    if (data.pluginName === "mysql_clear_password") {
      callback(null, Buffer.from(password + "\0", "utf8"));
    } else {
      callback(
        new Error(`Authentication method ${data.pluginName} not supported`)
      );
    }
  },
});

// Test the database connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Connected to the database");
});

// Set up the Express app to parse JSON request bodies
app.use(express.json());

// Define a route for the root path of the app
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Sign up route
app.post("/signup", (req, res) => {
  console.log("Signup route called");
  const { name, email, password } = req.body;

  const sql = "INSERT INTO users (name, email, password) VALUES (?,?,?)";
  const values = [name, email, password];

  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating user" });
    } else {
      console.log("User data saved in database");
      res.json({ message: "User created successfully" });
    }
  });
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email =? AND password =?";
  const values = [email, password];

  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Error authenticating user" });
    } else if (results.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      const token = jwt.sign({ email }, "secret_key", { expiresIn: "1h" });
      res.json({ token });
    }
  });
});

// Create a WebSocket server
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});