# 🎯 Quick Setup Guide

Get the Job Advertisement Portal running in 5 minutes!

## Prerequisites
- Node.js v14+ ([Download](https://nodejs.org/))
- Backend API running on `localhost:5555`

## 5-Minute Setup

```bash
# 1. Navigate to frontend folder
cd job-advertisement-frontend

# 2. Install dependencies (2 minutes)
npm install

# 3. Create environment file
cp .env.example .env

# 4. Start development server
npm start

# ✅ Done! Opens at http://localhost:3000
```

## What You'll See

### User View
- **Home Page** (`http://localhost:3000`) - Browse all jobs
- **Search Bar** - Find jobs by title or company
- **Filters** - By job type and salary type
- **Job Cards** - Click "Apply Now" to apply
- **Deadline Counter** - See days left to apply

### Admin View
- **⚙️ Admin Button** - In header to toggle admin mode
- **Post Job** - Create new job postings
- **Manage Jobs** - Edit or delete jobs
- **Job Form** - Add all job details

## Project Structure

```
job-advertisement-frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Full page components
│   ├── context/        # Global state management
│   ├── api/            # Backend API service
│   ├── styles/         # Global CSS
│   ├── App.js          # Main app
│   └── index.js        # Entry point
├── public/
│   └── index.html      # HTML template
├── package.json        # Dependencies
├── .env.example        # Environment variables template
└── README.md          # Full documentation
```

## Key Features at a Glance

| Feature | How to Use |
|---------|-----------|
| **Browse Jobs** | Visit home page, see all jobs |
| **Search Jobs** | Type in search bar (any job field) |
| **Filter by Type** | Select from dropdown: Full-time, Part-time, Internship |
| **Filter by Salary** | Select: Paid or Unpaid |
| **Apply for Job** | Click "Apply Now →" button |
| **See Deadline** | Green = Safe, Orange = Urgent, Red = Expired |
| **Create Job** | Switch to Admin, click "Post Job" |
| **Edit Job** | Admin view, click "Edit" on job card |
| **Delete Job** | Admin view, click "Delete" on job card |

## Common Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Install new package
npm install package-name

# Update all packages
npm update

# Check for vulnerabilities
npm audit
```

## Troubleshooting

### Can't connect to backend?
```bash
# Check backend is running
# Open another terminal and start backend:
cd ../backend
npm start

# Then verify .env has correct API URL:
REACT_APP_API_URL=http://localhost:5555
```

### Port 3000 already in use?
```bash
# Use different port
PORT=3001 npm start
```

### Blank page after starting?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Styles not loading?
```bash
# CSS Modules are scoped to components
# If importing external CSS, use: import './file.css'
# For component styles, use: import styles from './file.module.css'
```

## Environment Variables

Create `.env` file with:

```javascript
# Backend API endpoint
REACT_APP_API_URL=http://localhost:5555
```

Change based on environment:
- **Development**: `http://localhost:5555`
- **Production**: `https://api.yourdomain.com`

## File Overview

### API Service (`src/api/jobAPI.js`)
Handles all backend communication. Use anywhere:
```javascript
import { jobAPI } from '../api/jobAPI';

const jobs = await jobAPI.getAllJobs({ jobType: 'Full-time' });
const created = await jobAPI.createJob(jobData);
await jobAPI.updateJob(id, jobData);
await jobAPI.deleteJob(id);
```

### Context (`src/context/JobContext.js`)
Global state management for jobs:
```javascript
import { useJobContext } from '../context/JobContext';

const { jobs, filteredJobs, loading, error, ...methods } = useJobContext();
```

### Components
- **Header** - Navigation and admin toggle
- **FilterBar** - Search and filters
- **JobCard** - Individual job display
- **Home** - Job listing page
- **JobForm** - Create/edit jobs

## Styling

Uses **CSS Modules** for component scoping:

```javascript
// Component file
import styles from './JobCard.module.css';

// Use classes
<div className={styles.card}>
  <h3 className={styles.title}>Job Title</h3>
</div>
```

Global styles in `src/styles/index.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #10b981;
  /* ... more variables */
}
```

## Next Steps

1. **Customize** - Change colors, fonts, logos
2. **Deploy** - Build and deploy to Vercel/Netlify
3. **Add Features** - Authentication, pagination, etc.
4. **Optimize** - Performance monitoring and improvements

## Deployment Ready

When ready for production:

```bash
# 1. Build optimized version
npm run build

# 2. Update .env with production API URL
REACT_APP_API_URL=https://api.yourdomain.com

# 3. Deploy 'build' folder to hosting
# Vercel:
vercel --prod

# Netlify:
netlify deploy --prod

# Traditional Server:
scp -r build/ user@server:/var/www/html/
```

## Documentation

- **README.md** - Full project documentation
- **API_INTEGRATION.md** - Backend API details
- **DEPLOYMENT.md** - Production deployment guide
- **FEATURES_IMPLEMENTED.md** - All features list

## Need Help?

1. Check the README.md for comprehensive docs
2. See API_INTEGRATION.md for API usage
3. Look at component examples in src/
4. Check browser console for error messages
5. Ensure backend is running and accessible

## System Requirements

```
Node.js:     v14.0+
npm:         v6.0+
Browser:     Modern (Chrome, Firefox, Safari, Edge)
RAM:         512MB minimum
Disk:        50MB for node_modules
```

## Quick Commands Cheatsheet

```bash
npm install          # Install dependencies
npm start            # Run dev server (port 3000)
npm run build        # Build for production
npm test             # Run tests
npm audit            # Check security
npm update           # Update packages
npm cache clean      # Clear cache
npm list             # Show installed packages
```

## Performance Tips

- Use production build for testing
- Clear browser cache if styles change
- Keep browser DevTools closed when testing
- Use mobile device testing for responsive design

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request
5. Request review

## Support

- Frontend: React 18, Context API
- Styling: CSS3 Modules
- HTTP: Axios
- Routing: React Router v6
- Dates: date-fns

---

**You're all set!** 🎉

Start with `npm start` and enjoy building!
