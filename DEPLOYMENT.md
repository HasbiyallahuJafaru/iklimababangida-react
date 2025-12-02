# Deployment Guide - React + Vite Portfolio

## Option 1: Netlify Deployment

### Using Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build your project:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

### Using Netlify UI

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   
3. **Add environment variables:**
   - Go to Site settings → Environment variables
   - Add all your `VITE_*` variables

4. **Deploy!**

### Netlify Configuration File

Create `netlify.toml` in your project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

## Option 2: Vercel Deployment

### Using Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Deploy to production:**
   ```bash
   vercel --prod
   ```

### Using Vercel UI

1. **Push to GitHub** (same as Netlify)

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your repository
   - Vercel auto-detects Vite settings
   
3. **Add environment variables:**
   - In project settings → Environment Variables
   - Add all your `VITE_*` variables

4. **Deploy!**

## Option 3: GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update `vite.config.js`:**
   ```javascript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```

3. **Add deploy scripts to `package.json`:**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

## Option 4: AWS Amplify

1. **Push to GitHub**

2. **Connect to AWS Amplify:**
   - Go to AWS Amplify console
   - Click "New app" → "Host web app"
   - Connect your repository
   - Configure build settings:
     ```yaml
     version: 1
     frontend:
       phases:
         preBuild:
           commands:
             - npm install
         build:
           commands:
             - npm run build
       artifacts:
         baseDirectory: dist
         files:
           - '**/*'
       cache:
         paths:
           - node_modules/**/*
     ```

3. **Add environment variables** in Amplify console

4. **Deploy!**

## Option 5: Self-Hosted (Docker)

### Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Build and run:

```bash
docker build -t portfolio-app .
docker run -p 80:80 portfolio-app
```

## Environment Variables Setup

For all deployment platforms, make sure to set these environment variables:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify environment variables are working
- [ ] Test portfolio filtering and modals
- [ ] Test contact form submission
- [ ] Test admin login and dashboard
- [ ] Check responsive design on mobile
- [ ] Verify image loading from Cloudinary
- [ ] Test navigation between pages
- [ ] Check browser console for errors
- [ ] Set up custom domain (optional)
- [ ] Configure SSL certificate
- [ ] Set up analytics (optional)

## Custom Domain Setup

### Netlify
1. Go to Domain settings
2. Add custom domain
3. Follow DNS configuration instructions

### Vercel
1. Go to Project settings → Domains
2. Add your domain
3. Configure DNS records

## Performance Optimization

After deployment:
1. Enable Gzip/Brotli compression
2. Set up CDN caching
3. Configure browser caching headers
4. Enable HTTP/2
5. Optimize images with Cloudinary transformations

## Monitoring

Set up monitoring for:
- Uptime monitoring (e.g., UptimeRobot)
- Error tracking (e.g., Sentry)
- Analytics (e.g., Google Analytics, Plausible)
- Performance monitoring (e.g., Lighthouse CI)

## Continuous Deployment

Both Netlify and Vercel support automatic deployments:
- Every push to `main` branch triggers production deployment
- Pull requests create preview deployments
- Can configure deploy contexts for staging

## Rollback

If something goes wrong:

**Netlify:**
- Go to Deploys tab
- Click on a previous successful deploy
- Click "Publish deploy"

**Vercel:**
- Go to Deployments
- Find a previous successful deployment
- Click the three dots → "Promote to Production"
