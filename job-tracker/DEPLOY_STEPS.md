# Deployment Steps for Job Tracker

## Your Repository
`https://github.com/shruu5566/programs_now/tree/main/job-tracker`

---

## Option A: Quick Deploy (Recommended)

### 1️⃣ Deploy Backend to Railway

**Step 1:** Go to https://railway.app
- Sign up with GitHub (or login if you have account)
- Click "Create New Project"

**Step 2:** Deploy from GitHub
- Click "Deploy from GitHub"
- Connect your GitHub account
- Select `shruu5566/programs_now` repository
- Click Deploy

**Step 3:** Configure Root Directory
- In Railway dashboard, go to Settings
- Set "Root Directory" to `job-tracker/backend`
- Click "Deploy"

**Step 4:** Add Environment Variables
- Go to "Variables" tab
- Click "Add Variable" and add these:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?appName=Cluster0
JWT_SECRET=your_super_secret_jwt_key_here_min_32_characters_long_12345
EMAIL_USER=<your-email@gmail.com>
EMAIL_PASS=<your-app-password>
EMAIL_FROM=noreply@jobtracker.com
FRONTEND_URL=https://job-tracker-vercel.vercel.app
PORT=5000
```

⚠️ Replace `FRONTEND_URL` with your actual Vercel URL (get it after Step 2)

**Step 5:** Get Your Backend URL
- Go to "Settings" in Railway
- Copy the Domain URL (looks like: `https://job-tracker-production.up.railway.app`)
- Save it! You'll need this for the frontend.

---

### 2️⃣ Deploy Frontend to Vercel

**Step 1:** Go to https://vercel.com
- Sign up with GitHub (or login)
- Click "Add New" → "Project"

**Step 2:** Import GitHub Repository
- Click "Continue with GitHub"
- Find and select `shruu5566/programs_now`
- Click "Import"

**Step 3:** Configure Project
- **Framework Preset:** React
- **Root Directory:** `job-tracker/frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `build`

**Step 4:** Add Environment Variables
- Before clicking Deploy, scroll to "Environment Variables"
- Add:
  - Name: `REACT_APP_API_URL`
  - Value: `https://your-railway-domain.up.railway.app` (from Step 1️⃣, Step 5)
- Click "Deploy"

**Step 5:** Get Your Public URL
- Vercel shows you the URL after deployment (looks like: `https://job-tracker-vercel.vercel.app`)
- This is your public link! 🎉

---

### 3️⃣ Update Backend with Frontend URL

Go back to Railway:
1. Open your backend project
2. Click "Variables"
3. Edit `FRONTEND_URL`:
   - Old: `http://localhost:3000`
   - New: `https://job-tracker-vercel.vercel.app` (your Vercel URL)
4. Save and Railway will auto-redeploy

---

## Testing Your Live App

1. Open: https://job-tracker-vercel.vercel.app (your Vercel URL)
2. Click "Guest Login" or "Register" to test
3. Try "Forgot Password" to test email
4. Click the reset link in your email

---

## Share with Everyone

Send them this link:
```
https://job-tracker-vercel.vercel.app
```

They can:
- Register new account
- Login
- Add/track jobs
- Use forgot password
- Everything works!

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot reach API" | Check `REACT_APP_API_URL` is correct in Vercel |
| "Email not sending" | Verify Gmail app password in Railway |
| "Token invalid" | Check `FRONTEND_URL` in Railway matches your Vercel URL |
| Page not loading | Check Railway backend is running in dashboard |

---

## After Deployment

Your app is live! 
- **Frontend:** `https://job-tracker-vercel.vercel.app`
- **Backend API:** `https://your-railway-domain.up.railway.app/api`

Every time you push to GitHub, both Vercel and Railway auto-redeploy! 🚀

