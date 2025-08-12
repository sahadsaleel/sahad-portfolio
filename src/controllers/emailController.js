const emailService = require('../services/emailService');
const { validateEmail, sanitizeInput } = require('../utils/validation');

const sendContactEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);

    if (!validateEmail(sanitizedEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    if (sanitizedName.length < 2 || sanitizedName.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Name must be between 2 and 100 characters'
      });
    }

    if (sanitizedMessage.length < 10 || sanitizedMessage.length > 1000) {
      return res.status(400).json({
        success: false,
        error: 'Message must be between 10 and 1000 characters'
      });
    }

    const result = await emailService.sendContactEmails({
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage
    });

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! You should receive a confirmation email shortly.',
      timestamp: new Date().toISOString(),
      messageIds: result.messageIds
    });

  } catch (error) {
    console.error('Email sending error:', error);
    
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        error: 'Email authentication failed. Please check your email configuration.'
      });
    }

    if (error.code === 'ECONNECTION') {
      return res.status(500).json({
        success: false,
        error: 'Unable to connect to email server. Please try again later.'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later or contact me directly.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  sendContactEmail
};