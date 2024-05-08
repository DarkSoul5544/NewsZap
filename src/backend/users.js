const { Client } = require('pg');

module.exports = (db) => {

  const db = new Client({
    connectionString: 'postgres://default:NDuzi41kphST@ep-divine-king-a40652qt.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require'
  });

  const User = function (db, pg) {
  this.db = db;
  this.pg = pg;
};

User.prototype.findByEmail = async function (email) {
  const query = 'SELECT * FROM users WHERE email = $1';
  const { rows } = await this.pg.query(query, [email]);
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
};

User.create = async function (userData) {
  const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
  const { rows } = await this.pg.query(query, [userData.name, userData.email, userData.password]);
  return rows[0].id;
};

User.findAll = async function () {
  const query = 'SELECT * FROM users';
  const { rows } = await this.pg.query(query);
  return rows;
};

  return User;
};