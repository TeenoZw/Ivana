# 🚀 Production Deployment Guide

## ✅ **Pre-Deployment Checklist:**

### **🔒 Security Verification:**

- ✅ No sensitive credentials in code
- ✅ `.env` files in `.gitignore`
- ✅ Production environment variables documented
- ✅ Localhost URLs replaced with environment variables

### **🏗️ Build Verification:**

- ✅ TypeScript compiles without errors
- ✅ All dependencies installed
- ✅ Email functionality tested
- ✅ Contact form working

---

## 🌐 **Production Environment Setup:**

### **1. Environment Variables (Required):**

```env
# Email Configuration
SMTP_HOST=smtppro.zoho.com
SMTP_PORT=465
EMAIL_USER=info@ivanaresources.co.zw
EMAIL_PASS=your-production-password
COMPANY_EMAIL=info@ivanaresources.co.zw

# Production Settings
NODE_ENV=production
PORT=80
WEBSITE_URL=https://ivanaresources.co.zw
```

### **2. Deployment Steps:**

#### **Option A: Traditional Server Deployment**

```bash
# 1. Clone repository (without .env)
git clone <your-repo-url>
cd ivana-resources

# 2. Install dependencies
npm install

# 3. Set environment variables
# Create .env file or set system environment variables

# 4. Build application
npm run build

# 5. Start production server
NODE_ENV=production npm start
```

#### **Option B: Docker Deployment**

```dockerfile
# Create Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t ivana-resources .
docker run -d -p 80:3000 --env-file .env ivana-resources
```

#### **Option C: Cloud Platform (Vercel, Netlify, etc.)**

1. **Connect repository to platform**
2. **Set environment variables in platform dashboard:**

   - `SMTP_HOST`
   - `SMTP_PORT`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `COMPANY_EMAIL`
   - `WEBSITE_URL`
   - `NODE_ENV=production`

3. **Deploy automatically**

---

## 🧪 **Post-Deployment Testing:**

### **1. Basic Functionality:**

```bash
# Test website loads
curl -I https://ivanaresources.co.zw

# Test contact form
curl -X POST https://ivanaresources.co.zw/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production Test",
    "email": "test@example.com",
    "subject": "Testing Production Contact Form",
    "message": "Verifying production deployment is working correctly."
  }'
```

### **2. Email Testing:**

- Submit test contact form
- Verify company receives notification
- Verify customer receives confirmation
- Check email formatting and links

### **3. Performance Testing:**

- Test website speed
- Verify mobile responsiveness
- Check all navigation links
- Test image gallery functionality

---

## 🔧 **Production Maintenance:**

### **Regular Tasks:**

- Monitor email delivery
- Check server logs for errors
- Update dependencies monthly
- Backup database (if added later)
- Monitor website performance

### **Security Tasks:**

- Rotate email passwords quarterly
- Monitor for security updates
- Check SSL certificate expiry
- Review access logs

---

## 🚨 **Troubleshooting:**

### **Common Issues:**

**Email not sending:**

- Check SMTP credentials
- Verify email provider settings
- Check firewall/port restrictions

**Website not loading:**

- Check domain DNS settings
- Verify server is running
- Check environment variables

**Contact form errors:**

- Check server logs
- Verify API endpoint accessibility
- Test email configuration

---

## 📞 **Support Contacts:**

- **Domain/Hosting:** [Your hosting provider]
- **Email Service:** Zoho Support
- **Technical Issues:** [Your technical contact]

**🎯 Ready for Production!** 🚀
