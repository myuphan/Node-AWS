const { Pool } = require('pg'); //import pool fromm pg packages

// Connection details come from environment variables,
// which Ansible writes into /opt/node-app/.env on the server.
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME, //match vault in ansible
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = pool;
