# Quick Start Guide

Get your React + Vite portfolio up and running in minutes!

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Dependencies
```bash
cd iklimababangida-react
npm install
```

### Step 2: Configure Environment
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your credentials
# You can use notepad, VS Code, or any text editor
notepad .env
```

Add these values to your `.env` file:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

### Step 3: Start Development Server
```bash
npm run dev
```

Your site will open at `http://localhost:3000` 🎉

## 📋 Pre-Launch Checklist

Before going live, customize these elements:

### Content Updates
- [ ] Update personal information in `About.jsx`
- [ ] Add your bio and story in `Home.jsx`
- [ ] Update contact information in `Contact.jsx`
- [ ] Add social media links in `Footer.jsx`
- [ ] Replace placeholder images

### Branding
- [ ] Add your logo/favicon to `public/`
- [ ] Update site title in `index.html`
- [ ] Customize color scheme in `tailwind.config.js`
- [ ] Update meta description in `index.html`

### Backend Setup
- [ ] Create Supabase account and project
- [ ] Set up database tables (see SETUP.md)
- [ ] Create Cloudinary account
- [ ] Configure environment variables
- [ ] Test admin login

### Testing
- [ ] Test all page navigation
- [ ] Test contact form
- [ ] Test portfolio filtering
- [ ] Test admin dashboard
- [ ] Test on mobile devices
- [ ] Test in different browsers

## 🎨 Customization Tips

### Change Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    }
  }
}
```

Then use in components:
```jsx
<div className="bg-primary text-white">
```

### Add Your Logo
1. Add logo file to `public/` folder
2. Update `Navbar.jsx`:
```jsx
<Link to="/">
  <img src="/logo.png" alt="Logo" className="h-10" />
</Link>
```

### Change Fonts
Add to `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

body {
  font-family: 'Your Font', sans-serif;
}
```

## 🔧 Common Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Clean install (if issues)
rm -rf node_modules package-lock.json
npm install
```

## 🌐 Going Live (Choose One)

### Option A: Netlify (Recommended for beginners)
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site"
4. Connect your repository
5. Netlify auto-configures everything!
6. Add environment variables in Netlify settings

### Option B: Vercel
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel auto-detects Vite
6. Add environment variables in Vercel settings

### Option C: Manual Build + Upload
```bash
# Build the site
npm run build

# Upload the 'dist' folder to your hosting
# (cPanel, shared hosting, etc.)
```

## 📱 Test Your Site

After deployment, test these URLs:
- `yourdomain.com/` - Home page
- `yourdomain.com/about` - About page
- `yourdomain.com/portfolio` - Portfolio page
- `yourdomain.com/contact` - Contact page
- `yourdomain.com/admin` - Admin login

## 🆘 Troubleshooting

### "Cannot find module" errors
```bash
npm install
```

### Environment variables not working
1. Restart the dev server
2. Check variables start with `VITE_`
3. Check `.env` file exists

### Build fails
```bash
npm run lint
# Fix any errors shown
```

### Port 3000 already in use
```bash
# Kill the process or use different port
npm run dev -- --port 3001
```

### Images not loading
1. Check image paths
2. Verify Cloudinary credentials
3. Check browser console for errors

## 🎓 Next Steps

1. **Learn React Basics**
   - Components and Props
   - State and Hooks
   - Event Handling

2. **Explore the Code**
   - Start with `src/App.jsx`
   - Look at page components
   - Check service files

3. **Add Features**
   - Blog functionality
   - Newsletter signup
   - Dark mode
   - Animation effects

4. **Optimize**
   - Add meta tags for SEO
   - Optimize images
   - Add analytics
   - Set up monitoring

## 📚 Documentation

- **SETUP.md** - Detailed setup instructions
- **MIGRATION.md** - Understanding the conversion
- **DEPLOYMENT.md** - Deployment options and guides
- **README.md** - Project overview

## 💡 Pro Tips

1. **Use React DevTools**
   - Install React DevTools browser extension
   - Inspect component hierarchy and state

2. **Keep Dependencies Updated**
   ```bash
   npm outdated
   npm update
   ```

3. **Version Control**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

4. **Backup Your Work**
   - Push to GitHub regularly
   - Keep `.env` file backup (secure location)

## 🎉 You're Ready!

Your React portfolio is now ready to customize and deploy. Happy coding!

For questions or issues, refer to the other documentation files or create an issue on GitHub.
