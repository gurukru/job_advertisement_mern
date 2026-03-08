# 💼 Job Advertisement Portal - Frontend

A modern, responsive React-based frontend for a job advertisement platform built with the MERN stack. This project allows users to browse jobs and admins to manage job postings efficiently.

## 🌟 Features

### User Features
- ✅ **Browse Jobs** - View all available job listings with detailed information
- 🔍 **Search Functionality** - Search jobs by title, company name, or location
- 🏷️ **Category Filters** - Filter jobs by type (Full-time, Part-time, Internship)
- 💰 **Salary Type Filter** - Filter by paid/unpaid positions
- ⏰ **Application Deadline Countdown** - See days remaining until application deadline
- 🔗 **Direct Application** - One-click redirect to application portals
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile

### Admin Features
- ➕ **Create Jobs** - Post new job opportunities
- ✏️ **Edit Jobs** - Modify existing job postings
- 🗑️ **Delete Jobs** - Remove job listings
- 📋 **Manage All Jobs** - Overview and manage all active postings
- 🔒 **Admin Dashboard** - Dedicated admin interface

## 🛠️ Tech Stack

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS3 Modules** - Component-scoped styling
- **date-fns** - Date utilities
- **Context API** - State management

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **Backend API** running on `http://localhost:5555` (or configured port)

## 🚀 Getting Started

### 1. Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the frontend directory
cd job-advertisement-frontend

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env` file in the project root:

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your configuration
REACT_APP_API_URL=http://localhost:5555
```

### 3. Start Development Server

```bash
npm start
```

The application will open at `http://localhost:3000` with hot-reload enabled.

## 📁 Project Structure

```
job-advertisement-frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── jobAPI.js              # API service for backend integration
│   ├── components/
│   │   ├── Header.js              # Navigation header
│   │   ├── Header.module.css
│   │   ├── JobCard.js             # Individual job card component
│   │   ├── JobCard.module.css
│   │   ├── FilterBar.js           # Search and filter controls
│   │   └── FilterBar.module.css
│   ├── context/
│   │   └── JobContext.js          # Global state management
│   ├── pages/
│   │   ├── Home.js                # Jobs listing page
│   │   ├── Home.module.css
│   │   ├── JobForm.js             # Create/Edit job form
│   │   └── JobForm.module.css
│   ├── styles/
│   │   └── index.css              # Global styles
│   ├── App.js                     # Main app component
│   └── index.js                   # Entry point
├── .env.example                   # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🎯 Usage

### Browsing Jobs

1. **Home Page** - View all available jobs
2. **Search** - Use the search bar to find jobs by title or company
3. **Filter** - Filter by job type (Full-time, Part-time, Internship)
4. **Apply** - Click "Apply Now" to go to the job application portal

### Admin Panel

1. Navigate to **⚙️ Admin** link in the header
2. **Create Job** - Click "Post Job" to add a new position
3. **Edit Job** - Click "Edit" on any job card to modify details
4. **Delete Job** - Click "Delete" to remove a job posting
5. **Manage Jobs** - View and manage all active postings

### Job Form

Fill in the required fields:
- **Company Name** - Name of the hiring company
- **Job Title** - Position title (e.g., "Senior Developer")
- **Location** - Job location
- **Job Type** - Full-time, Part-time, or Internship
- **Salary Type** - Paid or Unpaid
- **Salary Package** - Salary range or description
- **Application Portal Link** - URL where applicants apply
- **Application Deadline** - Last day to apply

## 🎨 Styling Features

- **Modern Gradient Design** - Eye-catching purple gradient theme
- **Smooth Animations** - Transition effects for better UX
- **Dark Mode Ready** - CSS variables for easy theme customization
- **Mobile First** - Responsive design for all screen sizes
- **Accessibility** - ARIA labels and semantic HTML

## 🔄 API Integration

### Endpoints Used

```javascript
// Get all jobs with filters
GET /jobs?jobType=Full-time&salaryType=Paid

// Create new job
POST /jobs
Body: { companyName, jobTitle, location, jobType, ... }

// Update job
PUT /jobs/:id
Body: { updated job data }

// Delete job
DELETE /jobs/:id
```

See `src/api/jobAPI.js` for complete API configuration.

## 🧠 State Management

The application uses **React Context API** for global state management:

```javascript
// Available context methods
const {
  jobs,                  // All jobs from API
  filteredJobs,          // Jobs after filtering
  loading,               // Loading state
  error,                 // Error messages
  filters,               // Current filters applied
  fetchJobs,             // Fetch all jobs
  createJob,             // Create new job
  updateJob,             // Update existing job
  deleteJob,             // Delete job
  applyFilters,          // Apply filters
  clearFilters           // Reset filters
} = useJobContext();
```

## 🎪 Key Components

### JobCard
Displays individual job information with:
- Job title, company, location
- Type and salary badges
- Application deadline with countdown
- "Show Details" toggle for more info
- Apply, Edit, and Delete buttons

### FilterBar
Provides search and filtering options:
- Text search by job title/company
- Job type dropdown filter
- Salary type filter
- Apply and Clear buttons

### Header
Navigation component featuring:
- Logo with branding
- Responsive navigation menu
- Admin/User toggle
- Mobile hamburger menu

## 🚀 Building for Production

```bash
# Create optimized production build
npm run build

# The build folder contains optimized files ready for deployment
# Serve the build folder using any static server
```

## 📦 Available Scripts

```bash
npm start           # Start development server (port 3000)
npm run build       # Build for production
npm test            # Run tests
npm run eject       # Eject from create-react-app (irreversible)
```

## 🐛 Troubleshooting

### Common Issues

**Issue: Can't connect to backend API**
- Ensure backend is running on `http://localhost:5555`
- Check `.env` file has correct `REACT_APP_API_URL`
- Check browser console for CORS errors
- Verify backend has CORS enabled

**Issue: Filters not working**
- Check that job type values match backend (Full-time, Part-time, Internship)
- Verify salary type is "Paid" or "Unpaid"
- Clear browser cache and reload

**Issue: Application deadline shows wrong date**
- Ensure backend stores dates in ISO format
- Check timezone settings on server

## 📝 Environment Variables

```
REACT_APP_API_URL    - Backend API URL (default: http://localhost:5555)
```

## 🔐 Security Notes

- Never commit `.env` files with sensitive data
- Use environment variables for API endpoints
- Validate all user inputs before submission
- Sanitize URLs before using `window.open()`

## 📞 Support & Contribution

- Report issues in the GitHub repository
- Submit pull requests for improvements
- Follow the existing code style and conventions
- Write tests for new features

## 📄 License

This project is open source and available under the ISC License.

## 🙏 Credits

Built as a modern MERN stack job advertisement platform with focus on:
- User experience and responsive design
- Clean, maintainable code structure
- Professional styling and animations
- Efficient state management

---

**Made with ❤️ for job seekers and employers**
