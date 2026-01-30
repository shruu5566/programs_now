# Job Tracker - Quick Reference Guide

## 🚀 Quick Start (30 seconds)

```bash
# Backend Setup
cd backend
npm install
# Create .env file with MONGO_URI and JWT_SECRET
npm run dev

# Frontend Setup (new terminal)
cd frontend
npm install
npm start
```

App opens automatically at `http://localhost:3000`

## 📁 Key Files

### Backend
```
backend/
├── server.js           → Express app setup
├── models/
│   ├── User.js        → User schema + auth methods
│   └── Job.js         → Job schema
├── routes/
│   ├── authRoutes.js  → Login/Register endpoints
│   └── jobRoutes.js   → Job CRUD endpoints
└── middleware/
    └── auth.js        → JWT verification
```

### Frontend
```
frontend/
├── src/
│   ├── pages/
│   │   ├── Login.js     → Login page
│   │   ├── Register.js  → Signup page
│   │   └── JobPortal.js → Main dashboard
│   ├── components/
│   │   ├── JobForm.js   → Add/Edit form
│   │   ├── JobList.js   → Jobs wrapper
│   │   └── JobCard.js   → Individual job
│   └── styles/
│       ├── Auth.css
│       ├── Dashboard.css
│       ├── JobForm.css
│       ├── JobList.css
│       └── JobCard.css
```

## 📝 Common Tasks

### Add User Validation
Edit `backend/models/User.js` - UserSchema validators

### Add Job Status
Edit `backend/models/Job.js` - status enum array

### Change Colors
Edit `frontend/src/styles/*.css` - Search for `#667eea`

### Update API URL
Edit `frontend/src/pages/JobPortal.js` - Change localhost:5000

## 🔐 Environment Variables

**.env (backend)**
```
MONGO_URI=<your-mongodb-url>
JWT_SECRET=<random-32-char-string>
PORT=5000
```

## 🧪 API Endpoints Summary

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | /api/auth/register | No | Create account |
| POST | /api/auth/login | No | Login user |
| GET | /api/jobs | Yes | Get all jobs |
| POST | /api/jobs | Yes | Create job |
| PUT | /api/jobs/:id | Yes | Update job |
| DELETE | /api/jobs/:id | Yes | Delete job |

## 💾 Database Schema Quick Ref

**User**
```javascript
{
  _id, name, email, password (hashed), createdAt, updatedAt
}
```

**Job**
```javascript
{
  _id, userId, company, role, status, source, notes, createdAt, updatedAt
}
```

## 🎯 Component Hierarchy

```
App
├── Login
├── Register
└── JobPortal (Dashboard)
    ├── JobForm (Left)
    └── JobList (Right)
        └── JobCard (×N)
```

## 🔧 Debugging Tips

### Backend not responding?
```bash
# Check port 5000
netstat -ano | findstr :5000

# Restart server
npm run dev
```

### MongoDB error?
- Verify MONGO_URI in .env
- Check IP is whitelisted in Atlas
- Verify credentials

### Frontend can't reach backend?
- Backend must be running on port 5000
- Check CORS in server.js
- Frontend must be on port 3000

### Token errors?
```javascript
// Clear localStorage
localStorage.clear()
// Login again
```

## 📊 Data Flow

```
User Registration
Register.js → API /register → authRoutes.js → User.save() → MongoDB

User Login
Login.js → API /login → authRoutes.js → User.matchPassword() → JWT token

Add Job
JobForm.js → API /jobs → jobRoutes.js → Job.save() → MongoDB

Get Jobs
JobPortal.js → API /jobs?search=...&status=...&sort=... → jobRoutes.js → MongoDB query → JobCard
```

## 🎨 Styling Variables

**Primary Color:** `#667eea`
**Secondary Color:** `#764ba2`
**Light Background:** `#f5f7fa`
**Text Dark:** `#333`
**Text Gray:** `#666`
**Border Color:** `#e0e0e0`

## ✅ Testing Checklist

- [ ] Can register with valid email
- [ ] Can't register with invalid email
- [ ] Can login with correct credentials
- [ ] Can't login with wrong password
- [ ] Can add job with all fields
- [ ] Can add job with only required fields
- [ ] Can search jobs by company
- [ ] Can filter by status
- [ ] Can sort latest/oldest
- [ ] Can edit job
- [ ] Can delete job
- [ ] Logout clears token
- [ ] Dashboard protected (redirect to login)

## 🚢 Deployment Checklist

- [ ] Remove console.logs from code
- [ ] Set NODE_ENV=production
- [ ] Use environment variables for URLs
- [ ] Enable HTTPS for production
- [ ] Set secure JWT_SECRET
- [ ] Whitelist only prod IP in MongoDB
- [ ] Test all APIs in production
- [ ] Monitor error logs

## 📚 Additional Resources

- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [JWT.io](https://jwt.io/)
- [Mongoose Docs](https://mongoosejs.com/)

## 🆘 Getting Help

1. Check browser console (F12)
2. Check backend terminal logs
3. Review the README.md
4. Check FEATURES.md for details
5. Review code comments

## 🎓 Learning Paths

**For Frontend Developers:**
- Learn React hooks (useState, useEffect)
- Learn React Router
- Practice CSS layouts
- Understand localStorage

**For Backend Developers:**
- Learn Express middleware
- Learn MongoDB aggregations
- Practice error handling
- Learn JWT tokens

**For Full Stack:**
- Understand request/response cycle
- Learn API design
- Practice debugging
- Learn deployment

---

**Happy Coding! 💻**
