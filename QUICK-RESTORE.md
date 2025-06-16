# Quick Email Restore Guide

## 🚀 **To Restore Email Functionality Immediately:**

### **For Your Ivana Resources Email:**

Update your `.env` file with the working credentials:

```bash
# Edit the .env file
nano .env
```

Replace the placeholder values with your working settings:

```env
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
EMAIL_USER=info@ivanaresources.co.zw
EMAIL_PASS=Information2025!
COMPANY_EMAIL=info@ivanaresources.co.zw
```

### **Then restart the server:**

```bash
npm run build && npm start
```

### **Test immediately:**

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Restore",
    "email": "test@example.com",
    "subject": "Testing Restored Email",
    "message": "Verifying that email functionality is restored."
  }'
```

You should see:

- ✅ "SMTP connection verified successfully"
- ✅ "Company notification email sent"
- ✅ "Customer confirmation email sent"

## ⚠️ **Security Note:**

**For Development/Testing:** This is fine for your local environment.

**For Production/Sharing:** Always use the secure approach with:

- Environment variables on the server
- App-specific passwords
- No credentials in code repositories
