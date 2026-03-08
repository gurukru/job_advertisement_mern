# 🚀 Setup & Deployment Guide

## Quick Start (Local Development)

### Prerequisites
- Node.js v14+ (download from https://nodejs.org/)
- Backend API running (see backend README)
- Git (optional, for version control)

### Step-by-Step Setup

```bash
# 1. Navigate to the frontend directory
cd job-advertisement-frontend

# 2. Install all dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Start the development server
npm start
```

The application will automatically open at `http://localhost:3000`

## Environment Variables

Create a `.env` file in the project root:

```javascript
# Backend API URL
REACT_APP_API_URL=http://localhost:5555

# Optional: React environment
REACT_APP_ENV=development
```

**Environment-Specific Configs**:

```javascript
// .env.development
REACT_APP_API_URL=http://localhost:5555

// .env.production
REACT_APP_API_URL=https://api.yourdomain.com

// .env.staging
REACT_APP_API_URL=https://api-staging.yourdomain.com
```

## Project Structure Overview

```
job-advertisement-frontend/
├── public/               # Static files
│   └── index.html       # HTML template
├── src/
│   ├── api/             # API service layer
│   ├── components/      # Reusable components
│   ├── context/         # Global state (Context API)
│   ├── pages/           # Page components
│   ├── styles/          # Global styles
│   ├── App.js           # Main app component
│   └── index.js         # Entry point
├── .env.example         # Environment variables template
├── .gitignore           # Git ignore file
├── package.json         # Dependencies
└── README.md           # Project documentation
```

## Available Commands

```bash
# Start development server (http://localhost:3000)
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from create-react-app (⚠️ irreversible)
npm run eject
```

## Development Workflow

### Hot Reload
Changes to files are automatically reflected in the browser without refresh.

### Browser DevTools
- Install React Developer Tools browser extension
- Inspect elements and component props
- Debug using Chrome/Firefox DevTools

### Code Structure
```javascript
// Example: Using JobContext in a component
import { useJobContext } from '../context/JobContext';

function MyComponent() {
  const { jobs, loading, error, fetchJobs } = useJobContext();
  
  useEffect(() => {
    fetchJobs();
  }, []);
  
  return <div>{/* render jobs */}</div>;
}
```

## Building for Production

### 1. Create Production Build

```bash
npm run build
```

Output:
- Optimized JavaScript bundles
- CSS files
- Static assets
- Minified code (~40% smaller than dev)

### 2. Test Build Locally

```bash
# Install serve to test locally
npm install -g serve

# Serve the build
serve -s build

# Open http://localhost:5000
```

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel

# 3. Follow the prompts
# Select your project
# Confirm settings
# Wait for deployment

# Your app will be at: https://project-name.vercel.app
```

**Vercel Benefits**:
- Free hosting for open-source
- Automatic deployments on git push
- Built-in CI/CD
- Preview URLs for PRs
- Global CDN

### Option 2: Netlify

```bash
# 1. Drag and drop the 'build' folder to Netlify
# or use CLI:

npm install -g netlify-cli
netlify deploy

# 2. Select build folder: ./build
# 3. Get your live URL
```

### Option 3: AWS S3 + CloudFront

```bash
# 1. Build the project
npm run build

# 2. Upload build folder to S3
aws s3 sync build/ s3://your-bucket-name/

# 3. Set CloudFront distribution
# 4. Configure domain (optional)
```

### Option 4: Traditional Server (Nginx/Apache)

```bash
# 1. Build the project
npm run build

# 2. Copy build folder to server
scp -r build/ user@server:/var/www/job-portal/

# 3. Configure web server
# Create .htaccess (Apache) or nginx.conf
```

**Nginx Configuration**:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    root /var/www/job-portal;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

**Apache Configuration (.htaccess)**:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Production Checklist

Before deploying to production:

- [ ] Test all features thoroughly
- [ ] Update `REACT_APP_API_URL` for production API
- [ ] Remove console.logs and debug code
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Verify all links and buttons work
- [ ] Check performance with Lighthouse
- [ ] Set up error tracking (Sentry)
- [ ] Enable HTTPS
- [ ] Configure CORS on backend
- [ ] Set security headers
- [ ] Create backup strategy

## Performance Optimization

### Code Splitting
The app uses React lazy loading for route-based code splitting:

```javascript
const Home = lazy(() => import('./pages/Home'));
const JobForm = lazy(() => import('./pages/JobForm'));
```

### Bundle Analysis
```bash
# Analyze bundle size
npm run build -- --analyze

# Install bundle analyzer
npm install --save-dev source-map-explorer
npm run analyze
```

### Optimization Tips
1. **Remove unused dependencies**: `npm audit`
2. **Lazy load components**: Use `React.lazy()`
3. **Optimize images**: Use WebP format
4. **Enable gzip**: Check server configuration
5. **Cache assets**: Set proper cache headers

## Monitoring & Analytics

### Google Analytics (Optional)
```bash
npm install react-ga

# In App.js
import ReactGA from 'react-ga';
ReactGA.initialize('UA-XXXXXXXX-X');
```

### Error Tracking (Sentry)
```bash
npm install @sentry/react

# In index.js
import * as Sentry from "@sentry/react";
Sentry.init({ dsn: "YOUR_SENTRY_DSN" });
```

### Performance Monitoring
```javascript
// In App.js
import { measureCLS, measureFID, measureFCP, getLCP } from 'web-vitals';

measureCLS(console.log);
measureFID(console.log);
measureFCP(console.log);
getLCP(console.log);
```

## Troubleshooting

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear npm cache
npm cache clean --force
npm install
```

### Port Already in Use
```bash
# Linux/Mac: Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

### CORS Errors
Ensure backend CORS is configured:
```javascript
// Backend (server.js)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### Blank Page After Deploy
- Check browser console for errors
- Verify `REACT_APP_API_URL` in production
- Check React Router basename (if using subdirectory)
- Clear browser cache

## Environment Setup per Deployment

### Development
```bash
REACT_APP_API_URL=http://localhost:5555
NODE_ENV=development
```

### Staging
```bash
REACT_APP_API_URL=https://api-staging.yourdomain.com
NODE_ENV=production
```

### Production
```bash
REACT_APP_API_URL=https://api.yourdomain.com
NODE_ENV=production
```

## Continuous Integration/Deployment (CI/CD)

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run build
      - name: Deploy to Vercel
        run: npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

## Rollback Procedure

### Vercel
```bash
# Revert to previous deployment
vercel --prod --force
```

### Manual Rollback
```bash
# Keep previous build folder
mv build build_v2
mv build_backup build
# Redeploy
```

## Maintenance

### Regular Tasks
- Update dependencies: `npm update`
- Security audits: `npm audit`
- Monitor performance: Check dashboard
- Check error logs: Review Sentry/error tracking
- Test critical flows: Manual testing

### Dependency Updates
```bash
# Check outdated packages
npm outdated

# Update minor/patch versions safely
npm update

# Update major versions (check breaking changes)
npm install package@latest
```

---

**Last Updated**: March 2024
**Node Version**: 14+
**React Version**: 18.2+
