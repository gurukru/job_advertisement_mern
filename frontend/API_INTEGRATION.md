# 🔌 API Integration Guide

## Backend API Configuration

This frontend is designed to work with the JOB_ADVERTISEMENT backend API. Here's everything you need to know about the integration.

## Base URL Configuration

The API base URL is configured through environment variables:

```javascript
// .env file
REACT_APP_API_URL=http://localhost:5555
```

This can be overridden for different environments:
- **Development**: `http://localhost:5555`
- **Staging**: `https://api-staging.example.com`
- **Production**: `https://api.example.com`

## API Service

All API calls are centralized in `src/api/jobAPI.js`:

```javascript
import { jobAPI } from '../api/jobAPI';

// Use it anywhere in your components
```

## Available Endpoints

### 1. Get All Jobs

**Endpoint**: `GET /jobs`

**Query Parameters**:
```javascript
{
  jobType?: 'Full-time' | 'Part-time' | 'Internship',
  salaryType?: 'Paid' | 'Unpaid'
}
```

**Example**:
```javascript
const jobs = await jobAPI.getAllJobs({
  jobType: 'Full-time',
  salaryType: 'Paid'
});
```

**Response**:
```javascript
[
  {
    _id: "507f1f77bcf86cd799439011",
    companyName: "Tech Corp",
    jobTitle: "Senior Developer",
    location: "New York, NY",
    jobType: "Full-time",
    salaryType: "Paid",
    salaryPackage: "$100,000 - $130,000",
    portalLink: "https://example.com/apply",
    applicationDeadline: "2024-03-31T00:00:00Z",
    postedDate: "2024-03-08T12:00:00Z",
    daysLeft: 23,
    createdAt: "2024-03-08T12:00:00Z",
    updatedAt: "2024-03-08T12:00:00Z"
  }
]
```

### 2. Create Job

**Endpoint**: `POST /jobs`

**Request Body**:
```javascript
{
  companyName: string (required),
  jobTitle: string (required),
  location: string (required),
  jobType: 'Full-time' | 'Part-time' | 'Internship' (required),
  salaryType: 'Paid' | 'Unpaid' (required),
  salaryPackage: string (required),
  portalLink: string (required, valid URL),
  applicationDeadline: ISO Date string (required)
}
```

**Example**:
```javascript
const newJob = await jobAPI.createJob({
  companyName: "TechStart Inc",
  jobTitle: "Frontend Developer",
  location: "San Francisco, CA",
  jobType: "Full-time",
  salaryType: "Paid",
  salaryPackage: "$90,000 - $120,000",
  portalLink: "https://techstart.com/careers/apply",
  applicationDeadline: "2024-04-30"
});
```

**Response**: Created job object with `_id`

### 3. Get Single Job

**Endpoint**: `GET /jobs/:id`

**Example**:
```javascript
const job = await jobAPI.getJobById('507f1f77bcf86cd799439011');
```

### 4. Update Job

**Endpoint**: `PUT /jobs/:id`

**Request Body**: Same as Create Job (all fields optional for updates)

**Example**:
```javascript
const updatedJob = await jobAPI.updateJob('507f1f77bcf86cd799439011', {
  salaryPackage: "$110,000 - $140,000",
  applicationDeadline: "2024-05-15"
});
```

### 5. Delete Job

**Endpoint**: `DELETE /jobs/:id`

**Example**:
```javascript
await jobAPI.deleteJob('507f1f77bcf86cd799439011');
```

**Response**:
```javascript
{
  message: "Job deleted successfully"
}
```

## Search & Filter Implementation

The frontend implements client-side search with server-side filtering:

```javascript
// Server-side filter (API parameters)
const jobs = await jobAPI.getAllJobs({
  jobType: 'Full-time',
  salaryType: 'Paid'
});

// Client-side search (JavaScript filter)
const searchTerm = 'developer';
const results = jobs.filter(job => 
  job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
  job.companyName.toLowerCase().includes(searchTerm.toLowerCase())
);
```

## Error Handling

All API methods throw errors on failure:

```javascript
try {
  const jobs = await jobAPI.getAllJobs();
} catch (error) {
  console.error('Error:', error);
  // Handle error appropriately
}
```

**Error Response Format**:
```javascript
{
  message: "Error description",
  status: 400 | 404 | 500
}
```

## Context Integration

The `JobContext` wraps all API calls and manages state:

```javascript
import { useJobContext } from '../context/JobContext';

function MyComponent() {
  const {
    jobs,           // All jobs
    filteredJobs,   // Filtered jobs
    loading,        // boolean
    error,          // null or error message
    filters,        // Current filter state
    fetchJobs,      // Function to fetch jobs
    createJob,      // Function to create job
    updateJob,      // Function to update job
    deleteJob,      // Function to delete job
    applyFilters,   // Function to apply filters
    clearFilters    // Function to clear filters
  } = useJobContext();
}
```

## Data Validation

### Job Type Values
- `Full-time`
- `Part-time`
- `Internship`

### Salary Type Values
- `Paid`
- `Unpaid`

### Required Fields
- `companyName` - String, non-empty
- `jobTitle` - String, non-empty
- `location` - String, non-empty
- `jobType` - One of the allowed values
- `salaryType` - One of the allowed values
- `salaryPackage` - String, non-empty
- `portalLink` - Valid URL format
- `applicationDeadline` - Future date

## Deadline Calculation

The backend returns `daysLeft` calculated as:

```javascript
const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
```

**Deadline States**:
- `daysLeft > 7` - Active (green) ✅
- `1 <= daysLeft <= 7` - Urgent (orange) ⚠️
- `daysLeft <= 0` - Expired (red) ❌

## CORS Configuration

The backend should have CORS enabled:

```javascript
// Backend (Express)
app.use(cors());
// or with options
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

## API Rate Limiting (Optional)

If your backend implements rate limiting, ensure frontend handles 429 responses:

```javascript
// In jobAPI.js error handling
if (error.response?.status === 429) {
  // Show "Too many requests" message
}
```

## Authentication (Future Enhancement)

When adding authentication:

```javascript
// Add to API service
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## Testing the API

Use tools like **Postman** or **cURL** to test endpoints:

```bash
# Get all jobs
curl -X GET http://localhost:5555/jobs

# Create job
curl -X POST http://localhost:5555/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "TechCorp",
    "jobTitle": "Developer",
    ...
  }'

# Update job
curl -X PUT http://localhost:5555/jobs/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"salaryPackage": "new salary"}'

# Delete job
curl -X DELETE http://localhost:5555/jobs/507f1f77bcf86cd799439011
```

## Troubleshooting

### Connection Issues
- Verify backend is running
- Check `REACT_APP_API_URL` in `.env`
- Look for CORS errors in browser console

### Data Not Loading
- Check browser Network tab for failed requests
- Verify backend database has data
- Check for API errors in console

### Create/Update Failures
- Validate all required fields are provided
- Ensure `applicationDeadline` is a future date
- Verify `portalLink` is a valid URL

## Performance Tips

1. **Batch Requests**: Combine multiple API calls when possible
2. **Debounce Search**: Delay search API calls while user is typing
3. **Pagination**: For large datasets, implement pagination
4. **Caching**: Cache job list to reduce API calls

## Future Enhancements

- [ ] Add pagination support
- [ ] Implement API caching
- [ ] Add GraphQL support
- [ ] WebSocket for real-time updates
- [ ] Authentication/Authorization
- [ ] Rate limiting
- [ ] API versioning

---

**Last Updated**: March 2024
**API Version**: 1.0
