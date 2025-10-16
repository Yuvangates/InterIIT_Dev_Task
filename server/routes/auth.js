const express = require('express');
const router = express.Router();

// We will create the controller functions next
// const { signup, login } = require('../controllers/authController');

// Define the routes
router.post('/signup', (req, res) => {
    res.send("signup");
    res.json({ message: "Signup route is working!" }); // Placeholder response
});

router.post('/login', (req, res) => {
    res.json({ message: "Login route is working!" }); // Placeholder response
});

module.exports = router;