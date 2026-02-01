# 📧 Fix Email Sending Error - Step by Step

## ❌ Error: "Error sending message" 

This means your email credentials in `.env` are **NOT configured**.

---

## ✅ SOLUTION: Configure Gmail (2 minutes)

### Step 1: Enable 2-Factor Authentication

1. Go to: **https://myaccount.google.com**
2. Click **"Security"** on left menu
3. Scroll down to **"2-Step Verification"**
4. Click **"2-Step Verification"**
5. Follow steps to enable it (use your phone)
6. **Done!** ✅

### Step 2: Get Your App Password

1. Go back to **https://myaccount.google.com**
2. Click **"Security"** again
3. Scroll down to **"App passwords"** (only shows if 2FA is enabled)
4. Select:
   - **App:** Mail
   - **Device:** Windows Computer
5. Click **"Generate"**
6. **Copy the 16-character password** (like: `abcd efgh ijkl mnop`)

### Step 3: Update backend/.env File

Open: `backend/.env`

**Replace these lines:**
```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

**With your actual Gmail:**
```
EMAIL_USER=yourname@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

**Example:**
```
EMAIL_USER=yourname@gmail.com
EMAIL_PASS=your_16_char_app_password
```

### Step 4: Restart Backend

Terminal:
```bash
cd backend
npm start
```

### Step 5: Test Password Reset

1. Go to **http://localhost:3000/login**
2. Click **"Forgot Password?"**
3. Enter **your registered email** (the one from Step 3)
4. Click **"Send Reset Link"**
5. **Check your email** (wait 10 seconds, check spam folder too)
6. Click the link in the email
7. Enter new password
8. Success! ✅

---

## ⚠️ Common Issues

### Issue 1: Still Getting "Error sending message"
- Did you enable **2-Factor Authentication**? (Required!)
- Is your email correct in `.env`?
- Did you restart the backend after updating `.env`?
- Try generating a **new app password**

### Issue 2: "User not found"
- This is **NORMAL!** Means you're using an email that wasn't registered
- **Solution:** Use the email you registered with the app

### Issue 3: No email received
- Check your **SPAM/JUNK folder**
- Wait 10-20 seconds
- Make sure you're using **registered email address**
- Check if Gmail shows blocked apps in **Security settings**

### Issue 4: Gmail says "Less secure apps blocked"
- Go to: https://myaccount.google.com/security
- Scroll to **"Less secure app access"**
- Turn it **ON**
- Try again

---

## ✅ Step-by-Step for Google Gmail

### For Windows PC Users:

1. **Open Gmail**: https://mail.google.com
2. **Click your profile picture** (top right)
3. **Click "Manage your Google Account"**
4. **Click "Security" tab**
5. **Enable "2-Step Verification"** (if not already enabled)
   - Use your phone to verify
6. **Find "App passwords"** section (scroll down)
7. **Select:**
   - App = Mail
   - Device = Windows Computer
8. **Click "Generate"**
9. **Copy the 16 characters** (ignore spaces when pasting)
10. **Update `backend/.env`:**
    ```
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=paste_16_chars_here
    ```
11. **Restart backend:** `npm start`
12. **Test:** Click "Forgot Password?" and enter email

---

## 📝 Your .env Should Look Like:

```
# MongoDB Connection String
MONGO_URI=mongodb+srv://shrushtibp_db_user:SHRUthedeveloper1807@cluster0.zx78g9b.mongodb.net/?appName=Cluster0

# JWT Secret Key
JWT_SECRET=your_super_secret_jwt_key_here_min_32_characters_long_12345

# Server Port
PORT=5000

# Email Configuration (using Gmail)
EMAIL_USER=shrushtibp@gmail.com
EMAIL_PASS=wxyzabcdefghijkl
EMAIL_FROM=noreply@jobtracker.com

# Frontend URL for password reset link
FRONTEND_URL=http://localhost:3000
```

---

## 🚀 Done!

Once you update `.env` and restart the backend, password reset will work perfectly! ✅

Need more help? Check the backend console logs for specific error messages.
