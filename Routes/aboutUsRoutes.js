const express = require('express');
const router = express.Router();

// Define routes for the About Us page
router.get('/', (req, res) => {
    res.render('aboutUsPage'); // Render the aboutUs.ejs template
});

module.exports = router;
