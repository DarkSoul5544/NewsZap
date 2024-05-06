const mysql = require('mysql');

module.exports = (db) => {
  const User = {};

  User.findByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const result = await db.query(query, email);
    return result[0];
  };

  User.create = async (userData) => {
    const query = 'INSERT INTO users SET ?';
    const result = await db.query(query, userData);
    return result.insertId;
  };

  return User;
};