# 🔧 Troubleshooting Guide - Login/Register Issues

## Problem: "User already registered" when trying to register

### Solution: Clear Database

Run this command in the backend folder:

```bash
cd backend
node clearDatabase.js
```

This will delete all test data from MongoDB. Then try registering with a new email address.

---

## Problem: Apps not starting / npm start fails

### Solution: Reinstall dependencies

```bash
# Backend
cd backend
rm -r node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -r node_modules package-lock.json
npm install
```

---

## Quick Start (Both Apps)

### Terminal 1 - Start Backend:
```bash
cd backend
npm start
```

You should see:
```
Server running on port 5000
MongoDB Connected
```

### Terminal 2 - Start Frontend:
```bash
cd frontend
npm start
```

Browser automatically opens at http://localhost:3000

---

## Testing the App

### Step 1: Register (Clear database first if needed!)
- Go to http://localhost:3000/register
- Enter:
  - Name: "John Doe"
  - Email: "john@example.com"
  - Password: "password123"
- Click "Register"
- Should redirect to dashboard

### Step 2: Login (if you got registered)
- Go to http://localhost:3000/login
- Enter:
  - Email: "john@example.com"
  - Password: "password123"
- Click "Login"
- Should show dashboard

### Step 3: Add a Job
- On dashboard, fill the form:
  - Company: "Google"
  - Role: "Software Engineer"
  - Status: "Applied"
  - Source: "LinkedIn"
  - Notes: "Great company"
- Click "Add Job"
- Job should appear in the list

---

## Common Issues & Fixes

### Issue 1: "Cannot GET /register" or "Cannot GET /login"
**Problem:** Frontend not running or not routing correctly
**Fix:** 
- Make sure frontend is running on port 3000
- Check if browser shows "localhost:3000" in address bar

### Issue 2: "User already registered" every time
**Problem:** Email already exists in database
**Fix:** Either:
- Option A: Use a different email
- Option B: Clear database: `node clearDatabase.js`

### Issue 3: "Network request failed" or cannot connect to backend
**Problem:** Backend not running on port 5000
**Fix:**
- Check if backend server is running
- Look for "Server running on port 5000" message
- Check if MongoDB is connected: "MongoDB Connected"

### Issue 4: MongoDB Connection Error
**Problem:** .env file missing or wrong credentials
**Fix:**
- Check backend/.env exists
- Verify MONGO_URI is correct
- Check your MongoDB username and password
- Make sure your IP is whitelisted in MongoDB Atlas

### Issue 5: "Cannot find module" errors
**Problem:** Dependencies not installed
**Fix:**
```bash
cd backend && npm install
cd ../frontend && npm install
```

---

## Verify Setup is Correct

### Check Backend
```bash
cd backend
npm start
```
Should show:
- ✅ "Server running on port 5000"
- ✅ "MongoDB Connected"

### Check Frontend
```bash
cd frontend
npm start
```
Should show:
- ✅ "Compiled successfully!"
- ✅ Opens browser to http://localhost:3000

### Check Database
After registering a user, the database should have one user document.

---

## Step-by-Step Setup

1. **Create .env file** (should already exist)
   ```
   backend/.env contains:
   MONGO_URI=...
   JWT_SECRET=...
   PORT=5000
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd frontend
   npm install
   ```

3. **Start Backend**
   ```bash
   cd backend
   npm start
   ```
   Wait for: "Server running on port 5000" and "MongoDB Connected"

4. **Start Frontend** (new terminal)
   ```bash
   cd frontend
   npm start
   ```
   Wait for: "Compiled successfully!" and browser opens

5. **Test Registration**
   - Clear old data: `node backend/clearDatabase.js`
   - Go to http://localhost:3000/register
   - Register with new email
   - Should redirect to dashboard

6. **Test Login**
   - Go to http://localhost:3000/login
   - Use same email and password
   - Should login successfully

7. **Test Add Job**
   - Fill form on dashboard
   - Click "Add Job"
   - Job should appear in list

---

## Still Having Issues?

### Debug Steps

1. **Check backend console output**
   - Look for errors when starting
   - Check MongoDB connection message

2. **Check browser console** (Press F12)
   - Look for network errors
   - Check if requests are reaching backend

3. **Check backend .env file**
   - Should be in `backend/.env`
   - Should have MONGO_URI and JWT_SECRET

4. **Check if ports are free**
   - Backend: port 5000
   - Frontend: port 3000

5. **Check MongoDB Atlas**
   - Make sure your IP is whitelisted
   - Make sure database exists
   - Check connection string

---

## Need Help?

- ✅ Backend running on port 5000?
- ✅ Frontend running on port 3000?
- ✅ .env file exists in backend folder?
- ✅ MongoDB Atlas connection working?
- ✅ Cleared old user data with clearDatabase.js?

If all these are YES, app should work! 🚀
