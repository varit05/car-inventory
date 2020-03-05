const { createConnection } = require('mysql');

const pool = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  multipleStatements: true
});

pool.connect(error => {
  if (!error) {
    console.log('connected to database');
  } else {
    console.log('connection failed', error);
  }
});

module.exports = pool;
