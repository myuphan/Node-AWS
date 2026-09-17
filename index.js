require('dotenv').config();  // use config method from dotenv module to load environment variables from .env file into process.env 
const express = require('express'); //module
const path = require('path'); // module for pull safe path from OS

const registerRoute = require('./routes/register'); //file path for register.js route
const loginRoute = require('./routes/login');

const app = express(); // create express app instance
const PORT = process.env.PORT || 80; // decide port listen on

app.use(express.json()); // raw data to json format for API routes

// Serve the HTML/CSS files in the "public" folder.
// This makes index.html available at "/", login.html at "/login.html", etc.
app.use(express.static(path.join(__dirname, 'public'))); // makes HTML pages work. activate any file in public folder to be served as static file.


app.use(registerRoute); //activate APIs routes-run js logic - post/register and post/login. This is the middleware for register route. It will be called when the request path matches the route path.
app.use(loginRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); //starts server and listen on chosen port


