# Netlify Deployment Guide

## Prerequisites
- GitHub account with this repository
- Netlify account (free tier works perfectly)
- Supabase account with project set up
- Cloudinary account (optional, for image uploads)

## Deployment Steps

### 1. Connect to Netlify

1. Go to [Netlify](https://www.netlify.com/) and sign in
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize Netlify
4. Select the `iklimababangida-react` repository

### 2. Configure Build Settings

Netlify should auto-detect these settings from `netlify.toml`, but verify:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18

### 3. Set Environment Variables

In Netlify dashboard, go to: **Site settings** → **Environment variables** → **Add a variable**

Add these variables with your actual values:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### 4. Deploy

1. Click "Deploy site"
2. Wait for the build to complete (usually 1-2 minutes)
3. Your site will be live at: `https://random-name.netlify.app`

### 5. Custom Domain (Optional)

1. Go to **Domain settings** → **Add custom domain**
2. Follow the instructions to:
   - Add your domain name
   - Update DNS records with your domain registrar
   - Enable HTTPS (automatic with Netlify)

## Continuous Deployment

Once set up, Netlify automatically:
- ✅ Deploys when you push to the `main` branch
- ✅ Creates preview deployments for pull requests
- ✅ Provides instant rollbacks if needed

## Build Optimization

The project is configured with:
- **Asset optimization**: Images and JS bundles are optimized
- **Code splitting**: React lazy loading for better performance
- **Caching**: Static assets cached for 1 year
- **Security headers**: XSS protection, frame options, etc.

## Troubleshooting

### Build fails
- Check environment variables are set correctly
- Verify Node version is 18 or higher
- Check build logs in Netlify dashboard

### 404 on page refresh
- The `_redirects` file handles this for React Router
- Verify the file exists in `public/_redirects`

### Images not loading
- Check Cloudinary credentials
- Verify image URLs are correct
- Check browser console for errors

## Local Testing Before Deploy

```bash
# Build the project locally
npm run build

# Preview the production build
npm run preview
```

Visit `http://localhost:4173` to test the production build locally.

## Environment Variables Reference

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Supabase Dashboard → Settings → API |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary account name | Cloudinary Dashboard |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Upload preset for images | Cloudinary Settings → Upload |

## Performance Tips

1. **Enable Netlify Analytics** (optional, paid)
2. **Use Netlify Forms** for the contact form (free)
3. **Enable asset optimization** in Netlify settings
4. **Set up branch deploys** for staging environment

## Support

- [Netlify Documentation](https://docs.netlify.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router with Netlify](https://ui.dev/react-router-cannot-get-url-refresh)

---

**Your site is now ready to deploy! 🚀**
