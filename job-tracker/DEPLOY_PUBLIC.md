# Deploy Your Job Tracker Publicly

## Step 1: Prepare Your Code
```bash
# Make sure all changes are committed to git
git add .
git commit -m "Ready for deployment"
git push
```

## Step 2: Deploy Backend to Railway

### Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project

### Deploy Backend
1. Click "Deploy from GitHub"
2. Select your `job-tracker` repository
3. Select the `backend` directory as root
4. Click "Deploy"

### Add Environment Variables in Railway
1. Go to your Railway project dashboard
2. Click on "Variables" tab
3. Add these variables:
   - `MONGO_URI` → (your MongoDB connection string from .env)
   - `JWT_SECRET` → (your JWT secret from .env)
   - `EMAIL_USER` → (your Gmail)
   - `EMAIL_PASS` → (your app password)
   - `EMAIL_FROM` → noreply@jobtracker.com
   - `FRONTEND_URL` → (will get this from Vercel)
   - `PORT` → 5000

4. Click "Deploy"

### Get Your Backend URL
- Railway will give you a domain like: `https://job-tracker-production.up.railway.app`
- Copy this URL (you'll need it for frontend)

---

## Step 3: Deploy Frontend to Vercel

### Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Import your project

### Deploy Frontend
1. Click "Import Project"
2. Paste your GitHub repository URL
3. Select `frontend` as the root directory
4. Click "Deploy"

### Add Environment Variables in Vercel
1. Go to project Settings → Environment Variables
2. Add this variable:
   - `REACT_APP_API_URL` → `https://job-tracker-production.up.railway.app/api` (your Railway backend URL)
3. Click "Deploy"

### Get Your Frontend URL
- Vercel will give you a URL like: `https://job-tracker.vercel.app`
- This is your public link!

---

## Step 4: Update Backend FRONTEND_URL

1. Go back to Railway dashboard
2. Edit the `FRONTEND_URL` variable:
   - Old: `http://localhost:3000`
   - New: `https://job-tracker.vercel.app` (your Vercel URL)
3. Save and redeploy

---

## Step 5: Test Everything

1. Open your Vercel URL: `https://job-tracker.vercel.app`
2. Test registration
3. Test login
4. Test forgot password (email should work with your Gmail)
5. Test reset password link

---

## Troubleshooting

### "API not found" error
- Check that `REACT_APP_API_URL` is set correctly in Vercel
- Verify Railway backend is running
- Check CORS is enabled in backend

### "Email not sending"
- Verify `EMAIL_USER` and `EMAIL_PASS` are correct in Railway
- Check that Gmail 2FA is enabled and app password is used

### "Invalid token" on password reset
- Check that token URL encoding is working
- Verify `FRONTEND_URL` is set in Railway

---

## Share Your Project
Once deployed, share these URLs:
- **Live App**: `https://job-tracker.vercel.app`
- **Users can register, login, and track jobs!**

