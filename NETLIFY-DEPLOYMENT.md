# Netlify Deployment Guide for Ivana Resources

This guide explains how to deploy the Ivana Resources website to Netlify with serverless functions.

## 🚀 Quick Deployment

### Method 1: Netlify CLI (Recommended)

1. **Install Netlify CLI**

   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**

   ```bash
   npm run netlify-build
   ```

3. **Deploy to Netlify**

   ```bash
   # Login to Netlify (first time only)
   netlify login

   # Deploy
   netlify deploy --prod --dir=public --functions=dist-functions
   ```

### Method 2: GitHub Integration

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Add Netlify Functions support"
   git push origin main
   ```

2. **Connect on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Use these build settings:
     - **Build command**: `npm run netlify-build`
     - **Publish directory**: `public`
     - **Functions directory**: `dist-functions`

## 🔧 Environment Variables

Set these environment variables in Netlify dashboard:

### Required Variables

```
EMAIL_USER=your-email@zoho.com
EMAIL_PASS=your-app-password
SMTP_HOST=smtppro.zoho.com
SMTP_PORT=465
COMPANY_EMAIL=info@ivanaresources.co.zw
WEBSITE_URL=https://your-netlify-site.netlify.app
NODE_ENV=production
```

### Setting Environment Variables

1. **Via Netlify Dashboard**

   - Go to Site Settings → Environment Variables
   - Add each variable with its value

2. **Via Netlify CLI**
   ```bash
   netlify env:set EMAIL_USER "your-email@zoho.com"
   netlify env:set EMAIL_PASS "your-app-password"
   netlify env:set SMTP_HOST "smtppro.zoho.com"
   netlify env:set SMTP_PORT "465"
   netlify env:set COMPANY_EMAIL "info@ivanaresources.co.zw"
   netlify env:set WEBSITE_URL "https://your-site.netlify.app"
   netlify env:set NODE_ENV "production"
   ```

## 📁 Project Structure for Netlify

```
/
├── public/                 # Static files (publish directory)
│   ├── index.html
│   ├── assets/
│   ├── scripts/
│   └── styles/
├── netlify/
│   └── functions/          # Serverless functions source
│       └── contact.ts
├── dist-functions/         # Compiled functions (auto-generated)
├── netlify.toml           # Netlify configuration
└── package.json
```

## 🔧 Configuration Files

### netlify.toml

- **Publish directory**: `public`
- **Functions directory**: `dist-functions`
- **Redirects**: `/api/*` → `/.netlify/functions/:splat`
- **SPA routing**: All routes → `/index.html`

### Build Process

1. `npm run build-css` - Compiles Tailwind CSS
2. `npm run build-functions` - Compiles TypeScript functions
3. Functions are deployed to `/.netlify/functions/`

## 🧪 Local Development

Test Netlify Functions locally:

```bash
# Install dependencies
npm install

# Start Netlify dev server
npm run dev-functions
```

This starts:

- Static site: `http://localhost:8888`
- Functions: `http://localhost:8888/.netlify/functions/`

## 📧 Email Configuration

The contact form uses **Zoho SMTP** for email sending:

### Zoho Setup

1. Log in to Zoho Mail
2. Go to Settings → Security → App Passwords
3. Generate an app password for "Mail"
4. Use this password in `EMAIL_PASS` environment variable

### Email Flow

1. Form submission → `/api/contact`
2. Netlify Function validates data
3. Sends email via Zoho SMTP
4. Returns success/error response

## 🔒 Security Features

- **CORS headers** configured for cross-origin requests
- **Environment variables** for sensitive data
- **Input validation** on form data
- **Error handling** with user-friendly messages
- **Security headers** in netlify.toml

## 🌐 Custom Domain

To use a custom domain:

1. **Add domain in Netlify**

   - Site Settings → Domain Management
   - Add custom domain

2. **Update DNS**

   - Point domain to Netlify's servers
   - Or use Netlify DNS

3. **Update environment variables**
   ```bash
   netlify env:set WEBSITE_URL "https://ivanaresources.co.zw"
   ```

## 🚨 Troubleshooting

### Function Deployment Issues

```bash
# Check function logs
netlify functions:list
netlify functions:invoke contact --payload='{"test": true}'
```

### Build Errors

```bash
# Clean and rebuild
rm -rf dist-functions
npm run build-functions
```

### Email Issues

- Verify Zoho app password
- Check environment variables
- Test SMTP settings

## 📊 Monitoring

Monitor your deployment:

- **Functions**: Netlify Dashboard → Functions tab
- **Analytics**: Netlify Dashboard → Analytics
- **Logs**: Netlify Dashboard → Deploys → Function logs

## 🔄 Updates

To update the site:

```bash
git add .
git commit -m "Update content"
git push origin main
```

Netlify will automatically:

1. Build the project
2. Deploy functions
3. Update the live site

---

**✅ Your site is now ready for production on Netlify!**

The contact form will work seamlessly with serverless functions, providing a scalable and cost-effective solution.
