const connection = require('./db');

class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users', (err, results) => {
        if (err) return reject(err);
        resolve(results.map((user) => new User(user)));
      });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users SET?', data, (err, result) => {
        if (err) return reject(err);
        resolve(new User({ id: result.insertId,...data }));
      });
    });
  }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE email =?', [email], (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return reject(new Error('User not found'));
        resolve(new User(results[0]));
      });
    });
  }
}

module.exports = User;