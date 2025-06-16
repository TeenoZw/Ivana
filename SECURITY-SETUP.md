# 🔒 Email Configuration Security Guide

## 🛡️ **Security Best Practices**

### ✅ **What's Already Secured:**

- ✅ `.env` files are in `.gitignore` (never committed to version control)
- ✅ Placeholder values in `.env.example`
- ✅ Sensitive information removed from documentation
- ✅ Production-ready error handling

### 🔧 **Setup Instructions:**

#### 1. **Copy Environment Template**

```bash
cp .env.example .env
```

#### 2. **Configure Your Email Settings**

Edit `.env` file with your actual credentials:

**For Zoho Mail:**

```env
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
EMAIL_USER=your-actual-email@yourdomain.com
EMAIL_PASS=your-secure-password
COMPANY_EMAIL=where-to-receive-messages@yourdomain.com
```

**For Gmail:**

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
COMPANY_EMAIL=where-to-receive-messages@gmail.com
```

#### 3. **Security Recommendations:**

- 🔐 **Use App-Specific Passwords** (not your main account password)
- 🔐 **Enable 2-Factor Authentication** on your email account
- 🔐 **Use Strong, Unique Passwords** for email accounts
- 🔐 **Never share or commit** your `.env` file
- 🔐 **Regularly rotate passwords** for enhanced security

#### 4. **Production Deployment:**

For production environments:

- Use environment variables instead of `.env` files
- Consider using secure secret management services
- Use secure hosting with encrypted environment variable storage

### 🧪 **Testing Your Configuration:**

1. **Start the server:**

   ```bash
   npm run build && npm start
   ```

2. **Test the contact form:**

   - Navigate to http://localhost:3000
   - Go to the Contact section
   - Fill out and submit the form
   - Check both company and customer emails

3. **Look for success messages:**
   - ✅ "SMTP connection verified successfully"
   - ✅ "Company notification email sent"
   - ✅ "Customer confirmation email sent"

### 🚨 **Troubleshooting:**

**If emails aren't sending:**

1. Verify your email credentials are correct
2. Check if 2FA requires an app password
3. Ensure SMTP is enabled in your email provider
4. Try port 587 for STARTTLS or 465 for SSL

**Common Issues:**

- Authentication Failed → Generate app-specific password
- Connection Timeout → Check SMTP host and port
- Permission Denied → Enable SMTP in email settings

---

## 📞 **Support:**

If you need help with email configuration:

1. Check your email provider's SMTP documentation
2. Verify account settings and permissions
3. Test with a simple email client first
4. Contact your email provider's support if needed

**Remember:** Keep your credentials secure and never share them publicly!
