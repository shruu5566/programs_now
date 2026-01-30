# 🚀 GET RUNNING NOW! (5 Minutes)

## ⚠️ FIX FIRST: Clear Old Test Data

**You're getting "User already registered" because test data exists in the database.**

### Terminal 1 - Clear Database:
```bash
cd backend
node clearDatabase.js
```

Wait for: `✅ Deleted X users` and `✨ Database cleared successfully!`

---

## ✅ NOW START BOTH APPS

### Terminal 1 - Start Backend (keep it running):
```bash
cd backend
npm start
```

**Wait for both messages:**
- ✅ Server running on port 5000
- ✅ MongoDB Connected

### Terminal 2 (New) - Start Frontend:
```bash
cd frontend
npm start
```

**Wait for:**
- ✅ Compiled successfully!
- Browser opens to http://localhost:3000

---

## 🎯 TEST THE APP

### Step 1: REGISTER
1. Click "Register"
2. Fill form:
   - Name: John Doe
   - Email: john@test.com (use YOUR email)
   - Password: password123
3. Click "Register"
4. Should go to dashboard ✅

### Step 2: ADD A JOB
1. On dashboard, fill left form:
   - Company: Google
   - Role: Software Engineer
   - Status: Applied
   - Source: LinkedIn
   - Notes: Great company
2. Click "Add Job"
3. Job appears in list on right ✅

### Step 3: TEST FEATURES
- **Search:** Type company name in search box
- **Filter:** Select status in dropdown
- **Sort:** Select "Latest" or "Oldest"
- **Edit:** Click "Edit" on job card
- **Delete:** Click "Delete" on job card

---

## ❌ STILL NOT WORKING?

### Check Backend Is Running
```
Error: Cannot fetch from localhost:5000?
→ Make sure backend terminal shows:
   ✅ Server running on port 5000
   ✅ MongoDB Connected
```

### Check Frontend Is Running
```
Error: Page won't load?
→ Browser should show: http://localhost:3000
→ Terminal should show: Compiled successfully!
```

### Check Database Cleared
```
Error: User already registered?
→ Run: cd backend && node clearDatabase.js
→ Then try registering with DIFFERENT email
```

### Check .env File
```
Error: MongoDB Connection Error?
→ backend/.env should exist
→ Should have MONGO_URI and JWT_SECRET
→ Check file is in BACKEND folder, not frontend!
```

---

## 📋 CHECKLIST

- [ ] Ran `node clearDatabase.js` ✅
- [ ] Backend running: `npm start` in backend/
- [ ] Backend shows: "Server running on port 5000" ✅
- [ ] Backend shows: "MongoDB Connected" ✅
- [ ] Frontend running: `npm start` in frontend/
- [ ] Frontend shows: "Compiled successfully!" ✅
- [ ] Browser shows: http://localhost:3000 ✅
- [ ] Can click "Register" button ✅
- [ ] Register page loads ✅
- [ ] Can enter email and register ✅
- [ ] Redirects to dashboard ✅
- [ ] Can add job ✅
- [ ] Job appears in list ✅

---

## 🎊 WORKING? CONGRATS!

You now have a fully working Job Tracker app!

- ✅ Register new users
- ✅ Login to account
- ✅ Add job applications
- ✅ Search, filter, sort
- ✅ Edit and delete jobs

**Enjoy! 🚀**

---

## 📞 Quick Help

| Problem | Fix |
|---------|-----|
| "User already registered" | Run: `node backend/clearDatabase.js` |
| Backend won't start | Make sure .env file exists in backend folder |
| Frontend won't load | Make sure backend is running first |
| "Cannot find module" | Run: `npm install` in backend/ and frontend/ |
| MongoDB error | Check .env MONGO_URI and IP whitelist |

---

**Everything is ready! Just follow the 5-step setup above.** ✨
