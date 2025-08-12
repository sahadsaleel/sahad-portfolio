const rateLimit = require('express-rate-limit');
const { createRateLimitKey } = require('../utils/validation');

const createCustomRateLimit = (options = {}) => {
  const defaultOptions = {
    windowMs: 15 * 60 * 1000, 
    max: 5,
    message: {
      error: 'Too many requests from this client, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
  };

  return rateLimit({
    ...defaultOptions,
    ...options,
    keyGenerator: (req) => {
      return createRateLimitKey(req.ip, req.get('User-Agent') || 'unknown');
    }
  });
};

const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      timestamp: new Date().toISOString()
    };
    
    if (res.statusCode >= 400) {
      console.error('Request failed:', logData);
    } else {
      console.log('Request completed:', logData);
    }
  });
  
  next();
};

const validateContentType = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const contentType = req.get('Content-Type');
    
    if (!contentType || (!contentType.includes('application/json') && !contentType.includes('application/x-www-form-urlencoded'))) {
      return res.status(415).json({
        success: false,
        error: 'Unsupported content type. Please use application/json or application/x-www-form-urlencoded'
      });
    }
  }
  
  next();
};

const securityHeaders = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  next();
};

const apiVersion = (req, res, next) => {
  res.setHeader('API-Version', '1.0.0');
  next();
};

const errorHandler = (error, req, res, next) => {
  console.error('Unhandled error:', {
    error: error.message,
    stack: error.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: Object.values(error.errors).map(e => e.message)
    });
  }

  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'Invalid token'
    });
  }

  res.status(500).json({
    success: false,
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
};

module.exports = {
  createCustomRateLimit,
  requestLogger,
  validateContentType,
  securityHeaders,
  apiVersion,
  errorHandler
};