const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>\"']/g, '');
};

const validateEmailAdvanced = (email) => {
  if (!validateEmail(email)) return false;
  const commonDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
    'icloud.com', 'protonmail.com', 'aol.com', 'live.com'
  ];
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain || domain.length < 3) return false;
  return true;
};

const validateName = (name) => {
  if (!name || typeof name !== 'string') return false;
  const sanitized = sanitizeInput(name);
  if (sanitized.length < 2 || sanitized.length > 100) return false;
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  return nameRegex.test(sanitized);
};

const validateMessage = (message) => {
  if (!message || typeof message !== 'string') return false;
  const sanitized = sanitizeInput(message);
  if (sanitized.length < 10 || sanitized.length > 1000) return false;
  const spamPatterns = [
    /\b(viagra|casino|lottery|winner|congratulations)\b/i,
    /\$\d+/,
    /\b(click here|act now|limited time)\b/i
  ];
  const hasSpam = spamPatterns.some(pattern => pattern.test(sanitized));
  return !hasSpam;
};

const validatePhone = (phone) => {
  if (!phone) return true;
  if (typeof phone !== 'string') return false;
  const sanitized = phone.replace(/[\s\-\(\)]/g, '');
  const phoneRegex = /^\+?[\d]{10,15}$/;
  return phoneRegex.test(sanitized);
};

const validateContactForm = (formData) => {
  const errors = [];
  if (!validateName(formData.name)) {
    errors.push('Invalid name. Must be 2-100 characters and contain only letters, spaces, hyphens, and apostrophes.');
  }
  if (!validateEmailAdvanced(formData.email)) {
    errors.push('Invalid email address format.');
  }
  if (!validateMessage(formData.message)) {
    errors.push('Invalid message. Must be 10-1000 characters and not contain spam content.');
  }
  if (formData.phone && !validatePhone(formData.phone)) {
    errors.push('Invalid phone number format.');
  }
  return {
    isValid: errors.length === 0,
    errors
  };
};

const createRateLimitKey = (ip, userAgent) => {
  const crypto = require('crypto');
  const combined = `${ip}_${userAgent}`;
  return crypto.createHash('md5').update(combined).digest('hex');
};

module.exports = {
  validateEmail,
  validateEmailAdvanced,
  validateName,
  validateMessage,
  validatePhone,
  validateContactForm,
  sanitizeInput,
  createRateLimitKey
};
