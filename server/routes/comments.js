const express = require('express');
const router = express.Router();

// Define the routes
router.get('/', (req, res) => {
    res.json({ message: "Get all comments route is working!" });
});

router.post('/', (req, res) => {
    res.json({ message: "Create a new comment route is working!" });
});

module.exports = router;