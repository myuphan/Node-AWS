const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');

const router = express.Router();
const SALT_ROUNDS = 10;

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }

  try { //everything in try block is executed, if any error occurs, it will return message
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS); //hash the entered pw

    const result = await pool.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username, created_at',
      [username, passwordHash]
    );// insert username and hashed password into users table

    res.status(201).json({ user: result.rows[0] }); // send info to user inform created successfully
  } catch (err) {
    if (err.code === '23505') { // unique_violation in postgres - username is set UNIQUE in users table
      // unique_violation - username already exists
      return res.status(409).json({ error: 'username already taken' });
    }
    console.error(err);
    res.status(500).json({ error: 'internal server error' });
  }
});

module.exports = router;
