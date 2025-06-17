# Ivana Resources Website

A professional, modern website for Ivana Resources - Zimbabwe's premier mining consultancy. Built with modern web technologies and deployed on Netlify with serverless functions.

## 🎨 Features

- **Modern Design**: Glassmorphism effects, dynamic gradients, smooth animations
- **Responsive Layout**: Mobile-first design optimized for all devices
- **Interactive Elements**: Gallery filtering, testimonials, keyboard navigation
- **Contact System**: Working contact form with email integration via Netlify Functions
- **Performance**: Optimized CSS, minified assets, fast loading times
- **SEO Ready**: Meta tags, semantic HTML, and structured content

## 🚀 Quick Start

### For Local Development

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start local server**

   ```bash
   ./dev-local.sh
   # Opens http://localhost:8000
   ```

3. **Or use full development server**
   ```bash
   npm run dev
   # Includes backend functionality
   ```

### For Production Deployment (Netlify)

1. **Build and deploy**

   ```bash
   ./deploy.sh
   ```

2. **Or manual deployment**
   ```bash
   npm run netlify-build
   netlify deploy --prod --dir=public --functions=dist-functions
   ```

## 🔧 Environment Setup

Create environment variables in Netlify Dashboard or `.env` file:

```bash
EMAIL_USER=your-email@zoho.com
EMAIL_PASS=your-zoho-app-password
SMTP_HOST=smtppro.zoho.com
SMTP_PORT=465
COMPANY_EMAIL=info@ivanaresources.co.zw
WEBSITE_URL=https://your-site.netlify.app
NODE_ENV=production
```

## 📱 Website Sections

- Full-screen background with mining imagery
- Company branding with logo and tagline
- Call-to-action buttons with smooth scrolling

### Core Services Showcased

- **Mining Consultancy** - Expert advisory services
- **Mineral Extraction** - Safe and efficient extraction techniques
- **Mineral Processing** - Advanced beneficiation and value addition
- **Marketing & Sales** - Global market connections
- **Investment Promotion** - Partnerships and funding facilitation
- **Equipment & Consumables** - Quality mining machinery and tools

### Technical Features

- **TypeScript Backend** - Type-safe server implementation
- **Express.js Framework** - Robust web server
- **Mobile Responsive** - Optimized for all device sizes
- **SEO Optimized** - Proper meta tags and semantic HTML
- **Modern CSS** - Custom animations and transitions
- **Form Handling** - Contact form with validation
- **Asset Optimization** - Optimized images and resources

## 🛠 Available Scripts

- `npm start` - Start the production server
- `npm run build` - Compile TypeScript
- `npm run dev` - Start development mode with auto-reload
- `./dev.sh` - Complete development setup script

## 📧 Contact Form Configuration

The website includes a fully functional contact form that sends emails.

### 🔒 **Secure Setup:**

1. **Copy Environment Template:**

   ```bash
   cp .env.example .env
   ```

2. **Configure Email Credentials:**

   - Edit `.env` with your actual email settings
   - Use app-specific passwords for enhanced security
   - Never commit `.env` files to version control

3. **See Security Guide:**
   📖 **[Complete setup instructions in SECURITY-SETUP.md](./SECURITY-SETUP.md)**

### 🧪 **Test Configuration:**

1. Start the server: `npm run build && npm start`
2. Navigate to the contact section
3. Submit a test message
4. Verify emails are sent successfully

**Note:** The contact form includes intelligent error handling and will work in development mode even without email configured.

## 🌟 About Ivana Resources

At IVANA RESOURCES, we are committed to unlocking the full potential of Zimbabwe's mineral wealth through innovation, expertise, and strategic partnerships. As a dynamic player in the mining sector, we provide a full spectrum of services tailored to drive efficiency and sustainability across the mineral value chain.

### Our Core Services

1. **Mining Consultancy** - Expert advisory on exploration, mine planning, environmental compliance, and operational optimization
2. **Mineral Extraction** - Safe, efficient, and environmentally responsible extraction techniques
3. **Mineral Processing** - Advanced beneficiation and value addition to meet international standards
4. **Mineral Marketing & Sales** - Connecting producers with global markets
5. **Mining Investment Promotion** - Facilitating partnerships and project funding
6. **Mining Equipment & Consumables** - Reliable supply of quality mining machinery and tools

## 📞 Contact Information

- **Location**: Harare, Zimbabwe
- **Email**: info@ivanaresources.co.zw
- **Website**: http://localhost:3000 (development)

---

**🎯 Website Status: ✅ FULLY COMPLETED & SECURED**

✅ Mobile responsive design  
✅ Professional mining theme with specified colors  
✅ Hero section with mining image  
✅ Logo integration  
✅ TypeScript + Express.js backend  
✅ Smooth animations and transitions  
✅ **Fully functional contact form with intelligent error handling**  
✅ **Secure email integration with placeholder credentials**  
✅ All core services showcased  
✅ Specialized mining services (vat/heap leaching)  
✅ Interactive image gallery with filtering  
✅ Client testimonials section  
✅ Complete navigation with keyboard shortcuts  
✅ **Production-ready security practices**

**📧 Contact Form Features:**

- Real-time validation and error handling
- Professional HTML email templates
- Development mode for testing without email setup
- Production-ready with secure SMTP authentication
- Graceful fallback and user-friendly error messages
- **Secure credential management**

**🔒 Security Features:**

- Environment variables protected in `.gitignore`
- No sensitive information in code or documentation
- Placeholder credentials in template files
- Comprehensive security setup guide

**🚀 Ready for Production!** See `SECURITY-SETUP.md` for secure deployment.

**Built with ❤️ for Ivana Resources - Unlocking Zimbabwe's mineral wealth through innovation, expertise, and strategic partnerships.**
