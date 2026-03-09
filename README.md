# 💼 Job Advertisement Portal - Frontend

A modern, responsive React-based frontend for a job advertisement platform built with the MERN stack.

## ✨ Features

- ✅ Browse Jobs
- 🔍 Search & Filter
- 📋 Category Filters (Full-time, Part-time, Internship)
- 💰 Salary Type Filters (Paid, Unpaid)
- ⏰ Application Deadline Countdown
- 🔗 Direct Application Links
- 📱 Fully Responsive Design
- ➕ Admin - Create/Edit/Delete Jobs
- 📊 State Management with Context API

## 🚀 Quick Start
```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm start
```

Opens at `http://localhost:3000`

## 📁 Project Structure
```
src/
├── api/           # API service
├── components/    # Reusable components
├── context/       # Global state
├── pages/         # Page components
└── styles/        # Global styles
```

## 🔗 API Endpoints

- `GET /jobs` - Get all jobs
- `POST /jobs` - Create job
- `PUT /jobs/:id` - Update job
- `DELETE /jobs/:id` - Delete job

## 📚 Documentation

- [README.md](./README.md) - Full documentation
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Quick start
- [API_INTEGRATION.md](./API_INTEGRATION.md) - API docs
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [FEATURES_IMPLEMENTED.md](./FEATURES_IMPLEMENTED.md) - Features list

## 🛠️ Tech Stack

- React 18.2
- React Router v6
- Context API
- CSS3 Modules
- Axios
- date-fns

## 🚀 Deployment

Deployed on **Render**: [Live Link](https://job-advertisement-frontend.onrender.com)

## 📝 License

ISC

---

**Made with ❤️ for Job Seekers & Employers**
```

4. Click **"Commit changes"**

---

## ✅ **After Adding Root README**

GitHub will show:
- ✅ README displays on main page
- ✅ Looks professional
- ✅ People see it when visiting repo

---

## 🎯 **Best Practice**

Your structure should be:
```
job-advertisement-frontend/  (GitHub repo)
├── README.md                (Root - shows on GitHub)
├── src/
├── public/
├── SETUP_GUIDE.md
├── API_INTEGRATION.md
└── package.json
