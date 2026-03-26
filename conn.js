const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'mysql.railway.internal',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'HGhVFoxIlKDxjpXfcUlGctjWWDHEnXBM',
  database: process.env.MYSQL_DB || 'railway',
  port: process.env.MYSQL_PORT || 3306
});

conn.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err);
    return;
  }
  console.log('Connected to MySQL!');
});

module.exports = conn;