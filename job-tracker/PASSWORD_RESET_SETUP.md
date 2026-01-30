# 🔐 Password Reset Feature - Setup Guide

## What's New?

✅ **Forgot Password** - Users can request a password reset
✅ **Reset Password** - Users can set a new password via email link
✅ **Email Verification** - Secure token-based reset links (30-minute expiry)

---

## ⚙️ SETUP (Required for Email to Work)

### Step 1: Get Gmail App Password

1. Go to: https://myaccount.google.com/security
2. Click **"2-Step Verification"** and enable it (if not already enabled)
3. Go back to Security → **"App passwords"**
4. Select **Mail** and **Windows Computer**
5. Copy the **16-character password**

### Step 2: Update .env File

Edit `backend/.env`:

```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_char_app_password
EMAIL_FROM=noreply@jobtracker.com
FRONTEND_URL=http://localhost:3000
```

Example:
```
EMAIL_USER=myemail@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
EMAIL_FROM=noreply@jobtracker.com
FRONTEND_URL=http://localhost:3000
```

### Step 3: Test It

1. **Restart backend:**
   ```bash
   cd backend
   npm start
   ```

2. **Go to login page** → Click **"Forgot Password?"**

3. **Enter your email** → Click **"Send Reset Link"**

4. **Check your email** for the reset link

5. **Click the link** → Enter new password → Done! ✅

---

## 🔑 How It Works

### Flow 1: Request Password Reset
```
User clicks "Forgot Password?" 
    ↓
User enters email
    ↓
System checks if email exists
    ↓
Generates secure reset token
    ↓
Sends reset link to email
    ↓
User receives email with link
```

### Flow 2: Reset Password
```
User clicks link in email
    ↓
Page loads with reset form
    ↓
User enters new password
    ↓
System validates token (not expired?)
    ↓
Updates password in database
    ↓
Redirects to login
    ↓
User logs in with new password ✅
```

---

## 📁 Files Added/Modified

### Backend
- **models/User.js** - Added `resetToken` and `resetTokenExpiry` fields
- **routes/authRoutes.js** - Added `/forgot-password` and `/reset-password/:token` endpoints
- **utils/sendEmail.js** - NEW: Email sending utility
- **package.json** - Added `nodemailer` dependency
- **.env** - Added email configuration

### Frontend  
- **pages/ForgotPassword.js** - NEW: Forgot password page
- **pages/ResetPassword.js** - NEW: Reset password page
- **pages/Login.js** - Added "Forgot Password?" link
- **App.js** - Added routes for forgot/reset password

---

## 🧪 Testing Checklist

- [ ] Backend running with npm start
- [ ] .env file configured with email credentials
- [ ] Click "Forgot Password?" on login page
- [ ] Enter email and click "Send Reset Link"
- [ ] Check email for reset link
- [ ] Click reset link in email
- [ ] Enter new password (6-18 chars)
- [ ] Click "Reset Password"
- [ ] See success message
- [ ] Login with new password ✅

---

## ⚠️ Troubleshooting

### "Error sending email"
- Check .env EMAIL_USER and EMAIL_PASS
- Make sure Gmail 2FA is enabled
- Make sure you're using **App Password**, not regular password
- Check if Gmail blocked the app (check Security tab)

### "Invalid or expired reset token"
- Reset link expired (30 minutes max)
- Request a new password reset
- Check you copied the full link

### Email not received
- Check spam/junk folder
- Check your email username is correct
- Try with a different email account

---

## 🚀 To Use With Other Email Services

Change in `backend/utils/sendEmail.js`:

```javascript
// For Outlook
const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// For SendGrid API
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY
  }
});
```

---

## 🎉 Done!

Your app now has **secure password reset functionality**! Users can safely recover their accounts. 🔐

Questions? Check console logs on backend for detailed error messages.
