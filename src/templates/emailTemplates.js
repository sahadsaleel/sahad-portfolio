
const createEmailTemplate = (name, email, message) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Message</title>
      <style>
        body {
          font-family: 'Inter', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .email-container {
          background: #ffffff;
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 2px solid #00ff87;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #00ff87;
        }
        .header h1 {
          color: #00ff87;
          margin: 0;
          font-size: 28px;
          font-weight: 800;
        }
        .header p {
          color: #6c757d;
          margin: 10px 0 0 0;
          font-size: 16px;
        }
        .message-details {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 25px;
          margin: 20px 0;
          border-left: 4px solid #00ff87;
        }
        .detail-row {
          display: flex;
          margin-bottom: 15px;
          align-items: flex-start;
        }
        .detail-label {
          font-weight: 600;
          color: #00ff87;
          min-width: 80px;
          margin-right: 15px;
        }
        .detail-value {
          color: #495057;
          flex: 1;
          word-break: break-word;
        }
        .message-content {
          background: #ffffff;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 20px;
          margin-top: 10px;
          font-style: italic;
          color: #495057;
          line-height: 1.8;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #dee2e6;
          color: #6c757d;
          font-size: 14px;
        }
        .timestamp {
          background: #e9ecef;
          padding: 10px 15px;
          border-radius: 5px;
          font-size: 12px;
          color: #6c757d;
          text-align: center;
          margin-top: 20px;
        }
        @media (max-width: 600px) {
          body {
            padding: 10px;
          }
          .email-container {
            padding: 20px;
          }
          .header h1 {
            font-size: 24px;
          }
          .detail-row {
            flex-direction: column;
          }
          .detail-label {
            margin-bottom: 5px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>📧 New Portfolio Contact</h1>
          <p>You have received a new message from your portfolio website</p>
        </div>
        
        <div class="message-details">
          <div class="detail-row">
            <span class="detail-label">👤 Name:</span>
            <span class="detail-value">${name}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">📧 Email:</span>
            <span class="detail-value">
              <a href="mailto:${email}" style="color: #00ff87; text-decoration: none;">${email}</a>
            </span>
          </div>
          <div class="detail-row">
            <span class="detail-label">💬 Message:</span>
          </div>
          <div class="message-content">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div class="timestamp">
          📅 Received on: ${new Date().toLocaleString()}
        </div>
        
        <div class="footer">
          <p>This message was sent from your portfolio contact form.</p>
          <p><strong>Sahad Saleel Portfolio</strong> • Automated Email System</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const createAutoReplyTemplate = (name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for your message</title>
      <style>
        body {
          font-family: 'Inter', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #0d1117;
          color: #f0f6fc;
        }
        .email-container {
          background: linear-gradient(135deg, #161b22 0%, #21262d 100%);
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 255, 135, 0.2);
          border: 1px solid rgba(0, 255, 135, 0.3);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #00ff87;
          margin: 0 0 10px 0;
          font-size: 32px;
          font-weight: 800;
        }
        .header p {
          color: #8b949e;
          margin: 0;
          font-size: 18px;
        }
        .content {
          color: #f0f6fc;
          font-size: 16px;
          line-height: 1.8;
          margin: 25px 0;
        }
        .highlight {
          color: #00ff87;
          font-weight: 600;
        }
        .cta-section {
          background: rgba(0, 255, 135, 0.1);
          border: 1px solid rgba(0, 255, 135, 0.3);
          border-radius: 10px;
          padding: 25px;
          margin: 30px 0;
          text-align: center;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #00ff87 0%, #00cc6a 100%);
          color: #000000;
          padding: 12px 30px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          margin-top: 15px;
          transition: transform 0.3s ease;
        }
        .social-links {
          text-align: center;
          margin-top: 30px;
        }
        .social-links a {
          color: #00ff87;
          text-decoration: none;
          margin: 0 15px;
          font-weight: 500;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid rgba(0, 255, 135, 0.2);
          color: #8b949e;
          font-size: 14px;
        }
        @media (max-width: 600px) {
          body {
            padding: 10px;
          }
          .email-container {
            padding: 20px;
          }
          .header h1 {
            font-size: 28px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>🚀 Message Received!</h1>
          <p>Thank you for reaching out</p>
        </div>
        
        <div class="content">
          <p>Hi <span class="highlight">${name}</span>,</p>
          
          <p>Thank you for your message! I've received your inquiry and I'm excited to connect with you.</p>
          
          <p>I typically respond to all messages within <strong class="highlight">24-48 hours</strong>. In the meantime, feel free to:</p>
          
          <ul style="color: #f0f6fc; padding-left: 20px;">
            <li>Check out my latest projects on my <a href="https://luxe-com.shop" style="color: #00ff87;">portfolio</a></li>
            <li>Connect with me on social media</li>
            <li>Explore my code on GitHub</li>
          </ul>
        </div>
        
        <div class="cta-section">
          <h3 style="color: #00ff87; margin-top: 0;">Let's Build Something Amazing Together!</h3>
          <p style="margin-bottom: 0; color: #f0f6fc;">I'm always interested in discussing new opportunities, collaborations, and innovative projects.</p>
          <a href="mailto:sahadsaleel7@gmail.com" class="cta-button">📧 Reply Directly</a>
        </div>
        
        <div class="social-links">
          <a href="mailto:sahadsaleel7@gmail.com">📧 Email</a>
          <a href="tel:+916235724699">📱 Call</a>
        </div>
        
        <div class="footer">
          <p>Best regards,<br><strong style="color: #00ff87;">Sahad Saleel</strong></p>
          <p>Full Stack Developer | MERN Stack Specialist</p>
          <p style="margin-top: 15px; font-size: 12px;">This is an automated response. I'll reply personally soon!</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const createSuccessTemplate = (name, subject) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body {
          font-family: 'Inter', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .email-container {
          background: #ffffff;
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 2px solid #00ff87;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #00ff87;
          margin: 0 0 10px 0;
          font-size: 32px;
          font-weight: 800;
        }
        .content {
          color: #495057;
          font-size: 16px;
          line-height: 1.8;
          margin: 25px 0;
        }
        .highlight {
          color: #00ff87;
          font-weight: 600;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #dee2e6;
          color: #6c757d;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>🎉 Success!</h1>
        </div>
        
        <div class="content">
          <p>Hi <span class="highlight">${name}</span>,</p>
          <p>This is a custom success message template that can be used for various notifications.</p>
        </div>
        
        <div class="footer">
          <p>Best regards,<br><strong style="color: #00ff87;">Sahad Saleel</strong></p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = {
  createEmailTemplate,
  createAutoReplyTemplate,
  createSuccessTemplate
};