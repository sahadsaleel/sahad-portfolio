require('dotenv').config();

const config = {
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    corsOrigins: process.env.NODE_ENV === 'production' 
      ? ['https://your-domain.com', 'https://www.your-domain.com'] 
      : ['http://localhost:3000', 'http://127.0.0.1:3000']
  },
  
  email: {
    service: process.env.EMAIL_SERVICE || 'gmail',
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASS,
    recipient: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
    
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true', 
      requireTLS: process.env.SMTP_REQUIRE_TLS !== 'false'
    }
  },
  
  rateLimit: {
    windowMs: 15 * 60 * 1000, 
    maxRequests: 5, 
    message: 'Too many emails sent from this IP, please try again later.'
  },
  
  validation: {
    name: {
      minLength: 2,
      maxLength: 100
    },
    message: {
      minLength: 10,
      maxLength: 1000
    },
    email: {
      allowedDomains: [], 
      blockedDomains: ['tempmail.org', '10minutemail.com'] 
    }
  },
  
  security: {
    bodyLimit: '10mb',
    helmet: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          connectSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      }
    }
  }
};

const validateConfig = () => {
  const required = ['EMAIL_USER', 'EMAIL_PASS'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing.join(', '));
    process.exit(1);
  }
  
  console.log('Configuration validated successfully');
};

module.exports = {
  ...config,
  validateConfig
};