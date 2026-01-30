# Job Tracker - Full Stack MERN Application

A modern, user-friendly job application tracking system built with React.js, Node.js, Express.js, and MongoDB. Perfect for college placements, internships, and job hunting.

## Overview

**Problem:** Freshers and students apply to multiple companies and often forget:
- Which companies they applied to
- For which role
- Application status
- Source of job information

**Solution:** Job Tracker helps you manage all your job applications in one clean, organized dashboard.

## Features

### 🔐 User Authentication
- Secure user signup and login
- Password hashing with bcryptjs
- JWT-based authentication
- Each user sees only their own job applications

### 📊 Job Dashboard
- **Clean, minimal UI** with modern design
- **Search** jobs by company name (real-time)
- **Filter** jobs by application status
- **Sort** jobs by latest or oldest
- Jobs displayed in beautiful card format

### 💼 Job Management
- **Add new job** applications with comprehensive details
- **Edit** existing job entries
- **Delete** job applications
- View all saved jobs in one place

### 📝 Detailed Job Information
Each job entry captures:
- **Company Name** - Name of the company
- **Role** - Position applied for
- **Status** - Application status:
  - Applied
  - Shortlisted
  - Interview
  - Rejected
- **Source/Link** - Where you found the job (LinkedIn, WhatsApp group, website URL, etc.)
- **JD/Notes** - Job description or interview notes
- **Timestamp** - When the job was added

### 🔗 RESTful API
Well-structured backend APIs:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/jobs` - Create new job
- `GET /api/jobs` - Fetch jobs with filters
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

## Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **CSS3** - Modern styling with gradients and transitions

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB account (Atlas for cloud)
- Git

### Clone the Repository
```bash
git clone <repository-url>
cd job-tracker
```

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create .env file:**
```bash
touch .env
```

4. **Add environment variables to `.env`:**
```
MONGO_URI=mongodb+srv://your-username:your-password@cluster-name.mongodb.net/job-tracker?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here
PORT=5000
```

5. **Start the backend server:**
```bash
npm run dev  # Using nodemon for development
# or
npm start   # For production
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the React development server:**
```bash
npm start
```

App will open on `http://localhost:3000`

## Project Structure

```
job-tracker/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema with password hashing
│   │   └── Job.js           # Job schema with validation
│   ├── routes/
│   │   ├── authRoutes.js    # Authentication endpoints
│   │   └── jobRoutes.js     # Job CRUD operations
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   ├── server.js            # Express app setup
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── JobForm.js   # Add/Edit job form
│   │   │   ├── JobList.js   # Jobs list wrapper
│   │   │   └── JobCard.js   # Individual job card
│   │   ├── pages/
│   │   │   ├── Login.js     # Login page
│   │   │   ├── Register.js  # Signup page
│   │   │   └── JobPortal.js # Main dashboard
│   │   ├── styles/
│   │   │   ├── Auth.css     # Authentication pages styling
│   │   │   ├── Dashboard.css # Dashboard layout
│   │   │   ├── JobForm.css  # Form styling
│   │   │   ├── JobList.css  # List styling
│   │   │   └── JobCard.css  # Card styling
│   │   ├── App.js           # Main app component
│   │   ├── index.js         # React entry point
│   │   └── index.css        # Global styles
│   └── package.json
│
└── README.md
```

## Usage Guide

### 1. Register a New Account
- Click "Register" on the home page
- Enter your full name, email, and password
- Click "Register" button
- Auto-redirected to dashboard

### 2. Login to Your Account
- Enter your registered email and password
- Click "Login"
- Access your job dashboard

### 3. Add a New Job Application
- Fill in the job form on the left side:
  - **Company Name** (required)
  - **Role** (required)
  - **Status** (select from dropdown)
  - **Source/Link** (optional)
  - **JD/Notes** (optional)
- Click "Add Job" button
- Job appears in the list immediately

### 4. Search & Filter
- **Search bar**: Type company name to find jobs
- **Status Filter**: Select status to filter results
- **Sort**: Choose latest or oldest first

### 5. Edit a Job
- Click "Edit" button on any job card
- Form will populate with job details
- Make changes and click "Update Job"
- Click "Cancel" to cancel editing

### 6. Delete a Job
- Click "Delete" button on any job card
- Confirm deletion when prompted
- Job is removed from your list

## Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (unique, required),
  password: String (hashed, required),
  createdAt: Date,
  updatedAt: Date
}
```

### Job Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  company: String (required),
  role: String (required),
  status: String (enum: ['Applied', 'Shortlisted', 'Interview', 'Rejected']),
  source: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## API Documentation

### Authentication Endpoints

**Register User**
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: {
  "msg": "Registration successful",
  "token": "jwt_token",
  "user": { "id": "user_id", "name": "John Doe", "email": "john@example.com" }
}
```

**Login User**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: {
  "msg": "Login successful",
  "token": "jwt_token",
  "user": { "id": "user_id", "name": "John Doe", "email": "john@example.com" }
}
```

### Job Endpoints

**Get All Jobs (with filters)**
```
GET /api/jobs?search=Google&status=Applied&sort=latest
Headers: Authorization: Bearer <token>

Response: [
  {
    "_id": "job_id",
    "userId": "user_id",
    "company": "Google",
    "role": "Software Engineer",
    "status": "Applied",
    "source": "LinkedIn",
    "notes": "Interview scheduled for Monday",
    "createdAt": "2024-01-30T10:00:00Z"
  }
]
```

**Create Job**
```
POST /api/jobs
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "company": "Google",
  "role": "Software Engineer",
  "status": "Applied",
  "source": "LinkedIn",
  "notes": "Exciting opportunity"
}

Response: { full job object with _id and timestamps }
```

**Update Job**
```
PUT /api/jobs/:id
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "Shortlisted",
  "notes": "Updated notes"
}

Response: { updated job object }
```

**Delete Job**
```
DELETE /api/jobs/:id
Headers: Authorization: Bearer <token>

Response: { "msg": "Job deleted successfully" }
```

## Security Features

- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ JWT token-based authentication
- ✅ Protected API routes with middleware
- ✅ User-specific data isolation
- ✅ Input validation on both frontend and backend
- ✅ Secure token storage in localStorage

## Error Handling

The application includes comprehensive error handling:
- Form validation on frontend
- Server-side validation for all inputs
- Proper HTTP status codes
- User-friendly error messages
- Automatic logout on token expiration

## Responsive Design

The application is fully responsive and works great on:
- 💻 Desktop computers
- 📱 Tablets
- 📲 Mobile phones

## Performance Optimizations

- Efficient database queries with proper indexing
- Client-side filtering for instant search results
- Sticky form for easy access while scrolling
- Lazy loading of components
- Optimized CSS with minimal repaints

## Future Enhancements

- [ ] Email notifications for interview reminders
- [ ] Export job data to CSV/PDF
- [ ] Job statistics and analytics dashboard
- [ ] Interview preparation resources
- [ ] Resume upload and management
- [ ] Integration with job portals APIs
- [ ] Mobile app (React Native)
- [ ] Dark mode
- [ ] Multi-language support

## Troubleshooting

### MongoDB Connection Error
- Verify MongoDB URI in `.env`
- Check your IP is whitelisted in MongoDB Atlas
- Ensure username/password are correct

### Token Errors
- Clear localStorage and login again
- Check JWT_SECRET in backend .env
- Ensure token is sent in Authorization header

### CORS Errors
- Frontend and backend must run on different ports
- Backend CORS is configured to allow localhost:3000
- If running on different machine, update CORS origin

### Port Already in Use
```bash
# Find and kill process on port 5000 (backend)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# For port 3000 (frontend), create-react-app will prompt for different port
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Contact & Support

For questions or support, please open an issue on the GitHub repository.

---

**Happy job hunting! 🚀**

Remember: Tracking your applications is the first step to landing your dream job!
