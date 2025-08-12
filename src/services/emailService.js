const nodemailer = require('nodemailer');
const { createEmailTemplate, createAutoReplyTemplate } = require('../templates/emailTemplates');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    // Gmail configuration
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
      },
      // Alternative SMTP configuration for other providers
      // host: 'smtp.your-email-provider.com',
      // port: 587,
      // secure: false,
      // auth: {
      //   user: process.env.EMAIL_USER,
      //   pass: process.env.EMAIL_PASS
      // }
    });
  }

  async verifyConnection() {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Email transporter verification failed:', error);
      throw error;
    }
  }

  async sendContactEmails({ name, email, message }) {
    try {
      await this.verifyConnection();

      const notificationEmail = {
        from: process.env.EMAIL_USER,
        to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
        subject: `New Portfolio Contact from ${name}`,
        html: createEmailTemplate(name, email, message),
        replyTo: email
      };

      const autoReplyEmail = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thanks for reaching out! - Sahad Saleel',
        html: createAutoReplyTemplate(name)
      };

      const [notificationResult, autoReplyResult] = await Promise.all([
        this.transporter.sendMail(notificationEmail),
        this.transporter.sendMail(autoReplyEmail)
      ]);

      console.log('Notification email sent:', notificationResult.messageId);
      console.log('Auto-reply email sent:', autoReplyResult.messageId);

      return {
        success: true,
        messageIds: {
          notification: notificationResult.messageId,
          autoReply: autoReplyResult.messageId
        }
      };

    } catch (error) {
      console.error('Failed to send emails:', error);
      throw error;
    }
  }

  async sendCustomEmail({ to, subject, html, replyTo }) {
    try {
      await this.verifyConnection();

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
        replyTo: replyTo || process.env.EMAIL_USER
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Custom email sent:', result.messageId);

      return {
        success: true,
        messageId: result.messageId
      };

    } catch (error) {
      console.error('Failed to send custom email:', error);
      throw error;
    }
  }
}

module.exports = new EmailService();