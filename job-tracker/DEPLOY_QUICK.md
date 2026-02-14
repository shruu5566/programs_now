# 🚀 Job Tracker - Deployment Guide (Complete)

## Overview

Your Job Tracker app is now ready to deploy! Follow this step-by-step guide to make it live for recruiters.

---

## 📋 **Pre-Deployment Checklist**

- ✅ Guest login working locally
- ✅ All API calls updated to use environment variables
- ✅ MongoDB Atlas account created (or using existing)
- ✅ GitHub repo uploaded with all code

---

## **PART 1: Database Setup (MongoDB Atlas)**

### Step 1: Create MongoDB Atlas Cluster

1. Go to: https://www.mongodb.com/cloud/atlas
2. **Sign Up** (free tier available)
3. Create a **New Project** (name: "job-tracker")
4. Click **Create a Deployment** → Select **Free Tier (M0)**
5. Choose your region (recommended: closest to you)
6. Click **Create**

### Step 2: Set Up Database User & Connection String

1. Go to **Database Access** → Click **Add New Database User**
   - Username: `admin`
   - Password: `create a strong password` (save this!)
   - Click **Add User**

2. Go to **Network Access** → Click **Add IP Address**
   - Click **Allow Access from Anywhere** (for testing)
   - Click **Confirm**

3. Go to **Clusters** → Click **Connect**
   - Choose **Drivers**
   - Copy your **Connection String** (looks like):
     ```
     mongodb+srv://admin:PASSWORD@cluster0.xxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - **Replace** `<password>` with your actual password

4. Save the connection string (you'll need it soon)

---

## **PART 2: Deploy Backend to Render**

### Step 1: Prepare Backend for Deployment

1. Create a `Procfile` in `backend/` folder:
   ```
   web: npm start
   ```

2. Push your code to GitHub (if not already done)

### Step 2: Deploy on Render

1. Go to: https://render.com
2. **Sign Up** with GitHub
3. Click **New +** → **Web Service**
4. **Connect GitHub Repository:**
   - Select your `job-tracker` repo
   - Click **Connect**

5. **Fill in Deployment Details:**
   - **Name:** `job-tracker-backend`
   - **Region:** Choose closest to you
   - **Branch:** `main` (or your default branch)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

6. **Add Environment Variables** (click "Add Environment Variable"):
   ```
   MONGO_URI=mongodb+srv://admin:PASSWORD@cluster0.xxx.mongodb.net/jobtracker?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_here_min_32_characters_long_12345
   PORT=5000
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_16_char_app_password
   EMAIL_FROM=noreply@jobtracker.com
   FRONTEND_URL=https://job-tracker-frontend.vercel.app
   ```

7. Click **Deploy**
8. Wait for deployment (takes 2-5 minutes)
9. Once done, copy your **backend URL** (e.g., `https://job-tracker-backend.onrender.com`)

---

## **PART 3: Deploy Frontend to Vercel**

### Step 1: Prepare Frontend

1. Create a `vercel.json` in the `frontend/` folder:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/static-build",
         "config": { "distDir": "build" }
       }
     ],
     "routes": [
       { "src": "/api(.*)", "dest": "/api$1" },
       { "src": "/(.*)", "dest": "/index.html" }
     ],
     "env": {
       "REACT_APP_API_URL": "@react_app_api_url"
     }
   }
   ```

### Step 2: Deploy on Vercel

1. Go to: https://vercel.com
2. **Sign Up** with GitHub
3. Click **Add New** → **Project**
4. **Import Repository:**
   - Select your `job-tracker` repo
   - Click **Import**

5. **Configure Project:**
   - **Framework:** React
   - **Root Directory:** `frontend`
   - Click **Environment Variables**

6. **Add Environment Variables:**
   - Key: `REACT_APP_API_URL`
   - Value: `https://job-tracker-backend.onrender.com` (your backend URL from Render)
   - Click **Add**

7. Click **Deploy**
8. Wait for deployment (2-3 minutes)
9. Once complete, you get your **Frontend URL** (e.g., `https://job-tracker-frontend.vercel.app`)

---

## **PART 4: Final Configuration**

### Update Backend with Frontend URL

1. Go back to **Render Dashboard** → Your backend service
2. Click **Settings**
3. Find `FRONTEND_URL` environment variable
4. Update it to: `https://your-frontend-url.vercel.app`
5. Click **Save** (backend will auto-redeploy)

---

## **PART 5: Test Your Deployed App**

1. **Open your frontend URL** in browser:
   ```
   https://your-frontend-url.vercel.app
   ```

2. **Test the following:**
   - ✅ Click "Login as Guest" → Should load sample jobs
   - ✅ Sign up with new email
   - ✅ Add a new job
   - ✅ Edit a job
   - ✅ Delete a job
   - ✅ Test password reset (check email)
   - ✅ Try search/filter/sort

3. **Debug if issues:** Check browser console (F12) for errors

---

## **PART 6: Share with Recruiters**

### Update Your README.md

Add this section at the top of your README:

```markdown
## 🚀 Live Demo

**Visit:** [Job Tracker App](https://your-frontend-url.vercel.app)

### Quick Start:
1. Click **"Login as Guest"** to explore the app with sample data
2. **Email:** `guest@jobtracker.com` | **Password:** `guest123`
3. Try adding, editing, searching jobs!

### Tech Stack:
- **Frontend:** React.js + React Router
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **Deployment:** Vercel (Frontend) + Render (Backend)

### Features:
- ✅ User authentication & authorization
- ✅ Add/Edit/Delete job applications
- ✅ Search & filter by status
- ✅ Password reset via email
- ✅ Guest login for quick demo
```

### Share These Links:

```
📱 Live App: https://your-frontend-url.vercel.app
🔗 GitHub: https://github.com/yourusername/job-tracker
📧 Guest Login: guest@jobtracker.com / guest123
```

---

## **Troubleshooting**

### Backend not connecting?

1. Check MongoDB Atlas connection string is correct
2. Verify IP is whitelisted in MongoDB Atlas Network Access
3. Check all environment variables in Render are set

### Frontend showing errors?

1. Open browser console (F12)
2. Check `REACT_APP_API_URL` is correctly set in Vercel
3. Verify backend URL is accessible

### Guest login not working?

1. Restart Render backend service
2. Clear browser cache (Ctrl+Shift+Delete)
3. Try logging in with your own registered account

### Email not being sent?

1. Verify `EMAIL_USER` and `EMAIL_PASS` are correct in `.env`
2. Check Gmail app password is valid (not regular password)
3. Ensure 2FA is enabled in Gmail

---

## **Free Tier Limits**

| Service | Free Tier | Limit |
|---------|-----------|-------|
| **MongoDB** | 512MB storage | Upgrade if > 512MB |
| **Render** | 750 hours/month | ✅ Enough for hobby use |
| **Vercel** | Unlimited | ✅ No limits on hobby tier |
| **Email** | Nodemailer (Gmail) | Limited sends/day (100+) |

---

## **Next Steps**

1. ✅ Deployment complete!
2. 📸 Add screenshots to your GitHub README
3. 🎥 (Optional) Create a 1-minute demo video with Loom
4. 🧰 Monitor app for first 24 hours
5. 🎉 Share with recruiters!

---

## **Useful Links**

- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)

---

**You're live! 🚀 Congratulations!**
