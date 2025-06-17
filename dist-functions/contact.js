"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const createEmailTransporter = () => {
    const port = parseInt(process.env.SMTP_PORT || "587");
    return nodemailer_1.default.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: port,
        secure: port === 465,
        auth: {
            user: process.env.EMAIL_USER || "your-email@gmail.com",
            pass: process.env.EMAIL_PASS || "your-app-password",
        },
    });
};
const validateContactForm = (data) => {
    const errors = [];
    if (!data.name || data.name.trim().length < 2) {
        errors.push("Name must be at least 2 characters long");
    }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push("Please provide a valid email address");
    }
    if (!data.subject || data.subject.trim().length < 3) {
        errors.push("Subject must be at least 3 characters long");
    }
    if (!data.message || data.message.trim().length < 10) {
        errors.push("Message must be at least 10 characters long");
    }
    return errors;
};
const handler = async (event, context) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Content-Type": "application/json",
    };
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers,
            body: "",
        };
    }
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({
                success: false,
                message: "Method Not Allowed",
            }),
        };
    }
    try {
        const body = event.body ? JSON.parse(event.body) : {};
        const { name, email, subject, message } = body;
        console.log("📧 Contact form submission received:", {
            name,
            email,
            subject,
        });
        const validationErrors = validateContactForm({
            name,
            email,
            subject,
            message,
        });
        if (validationErrors.length > 0) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: "Validation failed",
                    errors: validationErrors,
                }),
            };
        }
        const transporter = createEmailTransporter();
        const companyMailOptions = {
            from: process.env.EMAIL_USER || "your-email@gmail.com",
            to: process.env.COMPANY_EMAIL || "info@ivanaresources.co.zw",
            subject: `New Contact Form Submission: ${subject}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2c5530 0%, #1a3d1f 100%); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Ivana Resources</h1>
            <p style="margin: 5px 0 0 0;">New Contact Form Submission</p>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #2c5530; margin-top: 0;">Contact Details</h2>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #d4af37;">Name:</strong>
                <p style="margin: 5px 0; padding: 10px; background: #f8f9fa; border-radius: 4px;">${name}</p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #d4af37;">Email:</strong>
                <p style="margin: 5px 0; padding: 10px; background: #f8f9fa; border-radius: 4px;">${email}</p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #d4af37;">Subject:</strong>
                <p style="margin: 5px 0; padding: 10px; background: #f8f9fa; border-radius: 4px;">${subject}</p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #d4af37;">Message:</strong>
                <div style="margin: 5px 0; padding: 15px; background: #f8f9fa; border-radius: 4px; white-space: pre-wrap;">${message}</div>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
                <p>This message was sent from the Ivana Resources website contact form on ${new Date().toLocaleString()}.</p>
              </div>
            </div>
          </div>
        </div>
      `,
        };
        const confirmationMailOptions = {
            from: process.env.EMAIL_USER || "your-email@gmail.com",
            to: email,
            subject: "Thank you for contacting Ivana Resources",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2c5530 0%, #1a3d1f 100%); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Ivana Resources</h1>
            <p style="margin: 5px 0 0 0;">Thank you for your message!</p>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #2c5530; margin-top: 0;">Hello ${name},</h2>
              
              <p style="color: #333; line-height: 1.6;">
                Thank you for reaching out to Ivana Resources. We have received your message and will get back to you within 24 hours.
              </p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #d4af37; margin-top: 0;">Your Message Summary:</h3>
                <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
                <p style="margin: 5px 0;"><strong>Sent:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <p style="color: #333; line-height: 1.6;">
                In the meantime, feel free to explore our services and learn more about our mining consultancy expertise.
              </p>
              
              <div style="margin: 30px 0; text-align: center;">
                <a href="${process.env.WEBSITE_URL || "https://ivanaresources.co.zw"}" style="background: #d4af37; color: #2c5530; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Visit Our Website</a>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
                <p><strong>Ivana Resources</strong><br>
                Zimbabwe's Premier Mining Consultancy<br>
                Email: info@ivanaresources.co.zw<br>
                Phone: +263777233814</p>
              </div>
            </div>
          </div>
        </div>
      `,
        };
        try {
            await transporter.verify();
            console.log("📧 SMTP connection verified successfully");
            await transporter.sendMail(companyMailOptions);
            console.log("✅ Company notification email sent");
            await transporter.sendMail(confirmationMailOptions);
            console.log("✅ Customer confirmation email sent");
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    message: "Your message has been sent successfully! We'll get back to you within 24 hours.",
                }),
            };
        }
        catch (emailError) {
            console.error("Email sending failed:", emailError.message);
            const isDevelopment = process.env.NODE_ENV === "development";
            const isAuthError = emailError.code === "EAUTH";
            if (isDevelopment && isAuthError) {
                console.log("🔧 Development mode: Email authentication failed, but form data was processed");
                console.log("📝 Form data received:", {
                    name,
                    email,
                    subject,
                    message: message.substring(0, 50) + "...",
                });
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({
                        success: true,
                        message: "Your message has been received! (Development mode: Email authentication needs to be configured for actual email sending)",
                        development: true,
                    }),
                };
            }
            else {
                throw emailError;
            }
        }
    }
    catch (error) {
        console.error("Contact form error:", error);
        let errorMessage = "Sorry, there was an error sending your message. Please try again or contact us directly.";
        if (error.code === "EAUTH") {
            errorMessage =
                "Email configuration issue detected. Your message was received but email notifications are currently unavailable.";
            console.log("\n🔧 EMAIL SETUP REQUIRED:");
            console.log("1. Check your environment variables configuration");
            console.log("2. For Zoho: Generate an App Password in Settings → Security → App Passwords");
            console.log("3. Use the app password instead of your regular password");
            console.log("4. See SECURITY-SETUP.md for detailed instructions\n");
        }
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                message: errorMessage,
                errorCode: error.code || "UNKNOWN",
            }),
        };
    }
};
exports.handler = handler;
