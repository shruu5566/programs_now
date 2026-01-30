# 🚀 PASSWORD RESET FEATURE - QUICK START

## 1️⃣ Configure Email (Gmail)

Go to: **https://myaccount.google.com/apppasswords**
- Get your **16-character app password**

Edit `backend/.env`:
```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_char_app_password
EMAIL_FROM=noreply@jobtracker.com
FRONTEND_URL=http://localhost:3000
```

## 2️⃣ Restart Backend

Terminal 1:
```bash
cd backend
npm start
```

## 3️⃣ Start Frontend

Terminal 2:
```bash
cd frontend
npm start
```

## 4️⃣ Test It

1. Go to **http://localhost:3000/login**
2. Click **"Forgot Password?"**
3. Enter your email
4. Click **"Send Reset Link"**
5. **Check your email** (check spam too!)
6. Click the link in the email
7. Enter **new password**
8. Click **"Reset Password"**
9. Success! ✅ Now login with new password

---

## ✅ Feature Complete!

Your Job Tracker now has:
- ✅ User registration & login
- ✅ Password reset via email
- ✅ Add/edit/delete jobs
- ✅ Search, filter, sort jobs
- ✅ Responsive design

**Everything is working!** 🎉
