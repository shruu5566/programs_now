# Job Tracker - Setup Guide

Quick setup instructions to get the Job Tracker application running on your machine.

## Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)
- **MongoDB Atlas Account** - [Sign up free](https://www.mongodb.com/cloud/atlas)

## Step 1: MongoDB Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account
   - Create a new project

2. **Create a Cluster**
   - Click "Create a Deployment"
   - Select "M0 FREE" tier
   - Choose your preferred region
   - Click "Create Deployment"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password (save these!)
   - Add privileges: "Built-in Role" → "Atlas Admin"
   - Click "Add User"

4. **Whitelist IP Address**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow access from anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Click "Databases" → "Connect" button
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your credentials
   - Example: `mongodb+srv://user:password@cluster0.mongodb.net/job-tracker?retryWrites=true&w=majority`

## Step 2: Clone Repository

```bash
# Open your terminal/command prompt
git clone <your-repo-url>
cd job-tracker
```

## Step 3: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# Windows: type nul > .env
# Mac/Linux: touch .env
```

**Edit the .env file and add:**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/job-tracker?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_here_min_32_chars
PORT=5000
```

**Start the backend server:**
```bash
# For development (with auto-reload)
npm run dev

# Or for production
npm start
```

You should see:
```
Server running on port 5000
MongoDB Connected
```

Keep this terminal open.

## Step 4: Frontend Setup

**Open a NEW terminal window** and:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The app should automatically open in your browser at `http://localhost:3000`

If not, open your browser and go to: `http://localhost:3000`

## Step 5: Test the Application

1. **Register a new account**
   - Click "Register"
   - Enter: Name, Email, Password
   - Click "Register"

2. **Login**
   - You should be redirected to dashboard
   - Or click "Login" and enter your credentials

3. **Add a job**
   - Fill in the form on the left
   - Company: "Google"
   - Role: "Software Engineer"
   - Status: "Applied"
   - Source: "LinkedIn"
   - Notes: "Great opportunity"
   - Click "Add Job"

4. **Test features**
   - Search for company name
   - Filter by status
   - Sort by latest/oldest
   - Edit a job
   - Delete a job

## Directory Structure

```
job-tracker/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── .env (create this)
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── public/
│
└── README.md
```

## Troubleshooting

### Problem: "MongoDB Connection Error"
**Solution:**
- Check your MONGO_URI in .env file
- Verify username and password are correct
- Make sure your IP is whitelisted in MongoDB Atlas
- Check internet connection

### Problem: "Port 5000 already in use"
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Problem: "Port 3000 already in use"
**Solution:**
When you run `npm start` in frontend, React will ask if you want to use a different port. Say "Y".

### Problem: "CORS Error"
**Solution:**
- Make sure backend is running on port 5000
- Make sure frontend is running on port 3000
- Backend already has CORS configured

### Problem: "Cannot find module"
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Problem: "Token is not valid" on login
**Solution:**
- Clear browser localStorage: Press F12 → Application → localStorage → Clear All
- Logout and login again
- Make sure JWT_SECRET is the same in .env

## Development Commands

### Backend
```bash
cd backend

npm install        # Install dependencies
npm run dev        # Start with auto-reload (nodemon)
npm start          # Start in production
```

### Frontend
```bash
cd frontend

npm install        # Install dependencies
npm start          # Start development server
npm build          # Build for production
npm test           # Run tests
```

## Environment Variables

### Backend (.env)
```
# MongoDB Connection String
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/job-tracker

# JWT Secret Key (use a long random string)
JWT_SECRET=your_secret_key_min_32_characters_long

# Server Port
PORT=5000
```

## API Endpoints Reference

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login to account

### Jobs (require authentication header)
- `GET /api/jobs` - Get all jobs with filters
- `POST /api/jobs` - Create new job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

## Technologies Used

- **Frontend:** React.js, React Router, CSS3
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT, bcryptjs
- **HTTP:** REST API

## Next Steps

1. Explore the codebase
2. Customize styling in `frontend/src/styles/`
3. Add more features (notifications, export, etc.)
4. Deploy to production (Heroku, Vercel, AWS)

## Getting Help

- Check the main [README.md](README.md) for detailed documentation
- Review the code comments
- Check browser console for errors (F12)
- Check backend terminal for API errors

## Happy Job Hunting! 🚀

You now have a fully functional job tracking application. Start adding your job applications and organize your job search!
