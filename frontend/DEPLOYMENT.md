# Deployment Guide

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

#### Method A: GitHub Integration (Easiest)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Done!** 
   - Your site is live at `https://your-project.vercel.app`
   - Auto-deploys on every push to main

#### Method B: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

---

### Option 2: Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. **Deploy**:
   - Connect GitHub repo
   - Configure build settings
   - Deploy

**netlify.toml** (optional):
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

### Option 3: AWS Amplify

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect GitHub/GitLab/Bitbucket

2. **Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Deploy**

---

### Option 4: Docker

#### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### Build and Run
```bash
# Build
docker build -t avatar-landing .

# Run
docker run -p 3000:3000 avatar-landing
```

---

### Option 5: Traditional VPS (DigitalOcean, Linode, etc.)

#### 1. Setup Server
```bash
# SSH into server
ssh user@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2
```

#### 2. Deploy Application
```bash
# Clone repository
git clone <your-repo-url>
cd client

# Install dependencies
npm install

# Build
npm run build

# Start with PM2
pm2 start npm --name "avatar-landing" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

#### 3. Setup Nginx (Optional)
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔐 Environment Variables

### Production Environment Variables

Create environment variables in your deployment platform:

```env
# Required
NODE_ENV=production

# Optional (if using)
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Vercel
- Go to Project Settings → Environment Variables
- Add variables
- Redeploy

### Netlify
- Go to Site Settings → Build & Deploy → Environment
- Add variables
- Redeploy

---

## 🌐 Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records

### DNS Configuration
```
Type: A
Name: @
Value: [Platform IP]

Type: CNAME
Name: www
Value: [Platform domain]
```

---

## 📊 Performance Optimization

### Before Deployment

1. **Optimize Images**
   - Use WebP format
   - Compress images
   - Use appropriate sizes

2. **Enable Caching**
   ```typescript
   // next.config.ts
   const nextConfig = {
     images: {
       formats: ['image/webp'],
     },
   };
   ```

3. **Analyze Bundle**
   ```bash
   npm install @next/bundle-analyzer
   ```

   ```typescript
   // next.config.ts
   const withBundleAnalyzer = require('@next/bundle-analyzer')({
     enabled: process.env.ANALYZE === 'true',
   });

   module.exports = withBundleAnalyzer(nextConfig);
   ```

   ```bash
   ANALYZE=true npm run build
   ```

---

## 🔍 SEO Configuration

### robots.txt
Create `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

### sitemap.xml
Create `app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
```

---

## 📈 Analytics Setup

### Google Analytics

1. **Get GA4 ID** from Google Analytics

2. **Add to Layout**
   ```typescript
   // app/layout.tsx
   <Script
     src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
     strategy="afterInteractive"
   />
   <Script id="google-analytics" strategy="afterInteractive">
     {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
     `}
   </Script>
   ```

---

## 🐛 Error Tracking

### Sentry

1. **Install**
   ```bash
   npm install @sentry/nextjs
   ```

2. **Initialize**
   ```bash
   npx @sentry/wizard@latest -i nextjs
   ```

3. **Configure** (auto-generated files)

---

## ✅ Pre-Deployment Checklist

- [ ] All environment variables set
- [ ] Build succeeds locally (`npm run build`)
- [ ] All links work
- [ ] Images load correctly
- [ ] Mobile responsive
- [ ] SEO meta tags configured
- [ ] Analytics configured
- [ ] Error tracking configured
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Performance tested (Lighthouse)
- [ ] Accessibility tested
- [ ] Cross-browser tested

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📞 Support

For deployment issues:
1. Check platform documentation
2. Review build logs
3. Check environment variables
4. Verify DNS configuration
5. Test locally first

---

## 🎉 Post-Deployment

After successful deployment:
1. Test all functionality
2. Monitor performance
3. Check analytics
4. Monitor error tracking
5. Set up uptime monitoring
6. Create backup strategy

---

**Your site is now live! 🚀**
