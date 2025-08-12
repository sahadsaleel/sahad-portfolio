const express = require('express');
const { sendContactEmail } = require('../controllers/emailController');

const router = express.Router();

router.post('/send', sendContactEmail);

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'Email service is operational',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;