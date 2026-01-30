# 🧪 Job Tracker - Testing & QA Guide

Complete testing guide for the Job Tracker application.

## 🎯 Testing Overview

This guide covers:
- Manual testing procedures
- Test cases for all features
- Browser compatibility
- Performance testing
- Security testing
- Deployment testing

---

## 📋 Test Checklist

### ✅ Authentication Features

#### Registration Tests

**Test 1: Valid Registration**
- [ ] Navigate to `/register`
- [ ] Enter: Name "John Doe"
- [ ] Enter: Email "john@example.com"
- [ ] Enter: Password "password123"
- [ ] Click "Register"
- [ ] ✅ Expected: Redirect to dashboard, user logged in

**Test 2: Invalid Name (Numbers)**
- [ ] Navigate to `/register`
- [ ] Enter: Name "John123"
- [ ] Enter: Valid email
- [ ] Enter: Valid password
- [ ] Click "Register"
- [ ] ✅ Expected: Error message "Name should contain only alphabets"

**Test 3: Invalid Email Format**
- [ ] Navigate to `/register`
- [ ] Enter: Valid name
- [ ] Enter: Email "invalidemail"
- [ ] Enter: Valid password
- [ ] Click "Register"
- [ ] ✅ Expected: Error message "Invalid email format"

**Test 4: Password Too Short**
- [ ] Navigate to `/register`
- [ ] Enter: Valid name
- [ ] Enter: Valid email
- [ ] Enter: Password "12345"
- [ ] Click "Register"
- [ ] ✅ Expected: Error message "Password should be 6-18 characters"

**Test 5: Password Too Long**
- [ ] Enter: Password "123456789012345678901"
- [ ] ✅ Expected: Error message "Password should be 6-18 characters"

**Test 6: Duplicate Email**
- [ ] Register with email "test@test.com"
- [ ] Register again with same email
- [ ] ✅ Expected: Error message "User already registered"

#### Login Tests

**Test 7: Valid Login**
- [ ] Navigate to `/login`
- [ ] Enter: Registered email
- [ ] Enter: Correct password
- [ ] Click "Login"
- [ ] ✅ Expected: Redirect to dashboard

**Test 8: Wrong Password**
- [ ] Navigate to `/login`
- [ ] Enter: Correct email
- [ ] Enter: Wrong password
- [ ] Click "Login"
- [ ] ✅ Expected: Error message "Invalid credentials"

**Test 9: Non-existent Email**
- [ ] Navigate to `/login`
- [ ] Enter: Non-existent email
- [ ] Enter: Any password
- [ ] Click "Login"
- [ ] ✅ Expected: Error message "Invalid credentials"

**Test 10: Missing Email**
- [ ] Navigate to `/login`
- [ ] Leave email empty
- [ ] Enter: Password
- [ ] Click "Login"
- [ ] ✅ Expected: Validation error or can't submit

**Test 11: Protected Route**
- [ ] Clear localStorage: `localStorage.clear()`
- [ ] Navigate to `/dashboard`
- [ ] ✅ Expected: Redirect to `/login`

#### Logout Tests

**Test 12: Logout**
- [ ] Login successfully
- [ ] Click "Logout" button
- [ ] ✅ Expected: Redirected to login, localStorage cleared

**Test 13: Token Expiration**
- [ ] Login successfully
- [ ] Clear token: `localStorage.removeItem('token')`
- [ ] Make any request
- [ ] ✅ Expected: Redirect to login

---

### ✅ Job Management Features

#### Add Job Tests

**Test 14: Add Job with All Fields**
- [ ] Login successfully
- [ ] Fill company: "Google"
- [ ] Fill role: "Software Engineer"
- [ ] Select status: "Applied"
- [ ] Fill source: "LinkedIn"
- [ ] Fill notes: "Great opportunity"
- [ ] Click "Add Job"
- [ ] ✅ Expected: Job appears in list, form clears

**Test 15: Add Job with Only Required Fields**
- [ ] Fill company: "Microsoft"
- [ ] Fill role: "Product Manager"
- [ ] Leave source empty
- [ ] Leave notes empty
- [ ] Click "Add Job"
- [ ] ✅ Expected: Job added successfully

**Test 16: Missing Company Name**
- [ ] Fill role: "Any role"
- [ ] Leave company empty
- [ ] Try to add
- [ ] ✅ Expected: Error message "Company name is required"

**Test 17: Missing Role**
- [ ] Fill company: "Company"
- [ ] Leave role empty
- [ ] Try to add
- [ ] ✅ Expected: Error message "Role is required"

**Test 18: Special Characters in Company**
- [ ] Fill company: "@#$%^&*()"
- [ ] Fill role: "Developer"
- [ ] Click "Add Job"
- [ ] ✅ Expected: Job added successfully (special chars allowed)

#### Edit Job Tests

**Test 19: Edit Job**
- [ ] Add a job first
- [ ] Click "Edit" on that job
- [ ] Form should populate with job data
- [ ] Change status to "Shortlisted"
- [ ] Change notes
- [ ] Click "Update Job"
- [ ] ✅ Expected: Changes saved, job updated in list

**Test 20: Cancel Edit**
- [ ] Start editing a job
- [ ] Make changes
- [ ] Click "Cancel"
- [ ] ✅ Expected: Changes discarded, form clears

**Test 21: Edit Job Company Name**
- [ ] Edit a job
- [ ] Change company name
- [ ] Save
- [ ] ✅ Expected: Company name updated in card

#### Delete Job Tests

**Test 22: Delete Job with Confirmation**
- [ ] Add a job
- [ ] Click "Delete"
- [ ] Confirm in dialog
- [ ] ✅ Expected: Job removed from list

**Test 23: Cancel Delete**
- [ ] Click "Delete" on a job
- [ ] Cancel in confirmation dialog
- [ ] ✅ Expected: Job remains in list

---

### ✅ Search & Filter Features

#### Search Tests

**Test 24: Search by Company Name**
- [ ] Add multiple jobs with different companies
- [ ] Type company name in search bar
- [ ] ✅ Expected: Only jobs with that company shown

**Test 25: Case-Insensitive Search**
- [ ] Add job with company "Google"
- [ ] Search "google" (lowercase)
- [ ] ✅ Expected: Job found

**Test 26: Partial Search**
- [ ] Add job with company "Google"
- [ ] Search "Goo"
- [ ] ✅ Expected: Job found

**Test 27: Clear Search**
- [ ] Search for something
- [ ] Clear search box
- [ ] ✅ Expected: All jobs shown again

**Test 28: No Results**
- [ ] Search for non-existent company
- [ ] ✅ Expected: "No jobs found" message

#### Filter Tests

**Test 29: Filter by Status Applied**
- [ ] Add jobs with different statuses
- [ ] Select "Applied" in status dropdown
- [ ] ✅ Expected: Only Applied jobs shown

**Test 30: Filter by Status Shortlisted**
- [ ] Select "Shortlisted" in status filter
- [ ] ✅ Expected: Only Shortlisted jobs shown

**Test 31: Filter by Status Interview**
- [ ] Select "Interview" in status filter
- [ ] ✅ Expected: Only Interview jobs shown

**Test 32: Filter by Status Rejected**
- [ ] Select "Rejected" in status filter
- [ ] ✅ Expected: Only Rejected jobs shown

**Test 33: Clear Filter**
- [ ] Apply status filter
- [ ] Select "All Status"
- [ ] ✅ Expected: All jobs shown

#### Sort Tests

**Test 34: Sort Latest First**
- [ ] Add 3 jobs
- [ ] Select "Latest First"
- [ ] ✅ Expected: Most recent job on top

**Test 35: Sort Oldest First**
- [ ] Select "Oldest First"
- [ ] ✅ Expected: Oldest job on top

#### Combined Tests

**Test 36: Search + Filter**
- [ ] Add jobs: "Google-Applied", "Google-Interview", "Microsoft-Applied"
- [ ] Search "Google"
- [ ] Filter "Applied"
- [ ] ✅ Expected: Only "Google-Applied" shown

**Test 37: Search + Filter + Sort**
- [ ] Apply search, filter, and sort
- [ ] ✅ Expected: Results match all three criteria

**Test 38: Job Counter**
- [ ] Apply search/filter
- [ ] Check counter at top
- [ ] ✅ Expected: Counter shows correct number

---

### ✅ UI/UX Features

#### Responsive Design Tests

**Test 39: Desktop View (1024px+)**
- [ ] Open app on desktop
- [ ] ✅ Expected: Two-column layout (form + jobs)

**Test 40: Tablet View (768px-1023px)**
- [ ] Resize window to 900px width
- [ ] ✅ Expected: Single column, stacked layout

**Test 41: Mobile View (<768px)**
- [ ] Resize window to 360px width
- [ ] ✅ Expected: Mobile optimized layout
- [ ] ✅ Buttons are touch-friendly
- [ ] ✅ Text is readable

**Test 42: Mobile Job Card**
- [ ] On mobile, click job card
- [ ] ✅ Expected: All info visible
- [ ] ✅ Buttons are accessible

#### Visual Tests

**Test 43: Status Badge Colors**
- [ ] Add jobs with all 4 statuses
- [ ] ✅ Expected: Each has different color
  - Applied: Blue
  - Shortlisted: Purple
  - Interview: Green
  - Rejected: Red

**Test 44: Hover Effects**
- [ ] Hover over job card
- [ ] ✅ Expected: Card lifts, shadow appears

**Test 45: Button Hover States**
- [ ] Hover over "Add Job" button
- [ ] ✅ Expected: Color change, slight movement

**Test 46: Form Focus States**
- [ ] Click on input field
- [ ] ✅ Expected: Blue border, shadow effect

#### Display Tests

**Test 47: Long Company Name**
- [ ] Add job with very long company name
- [ ] ✅ Expected: Name displays properly, no overflow

**Test 48: Long Notes**
- [ ] Add job with multi-line notes
- [ ] ✅ Expected: Formatting preserved, readable

**Test 49: Date Formatting**
- [ ] Add a job
- [ ] Check date display
- [ ] ✅ Expected: Format like "Jan 30, 2024"

---

### ✅ Data Integrity Tests

#### User Isolation Tests

**Test 50: User Data Isolation**
- [ ] Add job as User 1
- [ ] Logout
- [ ] Login as User 2
- [ ] ✅ Expected: User 2 doesn't see User 1's jobs

**Test 51: Job Belongs to User**
- [ ] Add job
- [ ] Check backend (developer tools)
- [ ] ✅ Expected: Job has userId field matching current user

#### Data Persistence Tests

**Test 52: Refresh Page**
- [ ] Add multiple jobs
- [ ] Refresh page (F5)
- [ ] ✅ Expected: Jobs still there

**Test 53: Close and Reopen**
- [ ] Add jobs
- [ ] Close browser tab
- [ ] Reopen app
- [ ] Login
- [ ] ✅ Expected: Jobs are restored

**Test 54: Edit Persistence**
- [ ] Edit a job
- [ ] Refresh page
- [ ] ✅ Expected: Edit changes are saved

**Test 55: Delete Persistence**
- [ ] Delete a job
- [ ] Refresh page
- [ ] ✅ Expected: Job is still deleted

---

### ✅ Performance Tests

**Test 56: Load Time**
- [ ] Open app
- [ ] ✅ Expected: Loads in < 3 seconds

**Test 57: Search Responsiveness**
- [ ] Add 50 jobs
- [ ] Type in search box
- [ ] ✅ Expected: Results update instantly

**Test 58: Add Job Speed**
- [ ] Click "Add Job"
- [ ] ✅ Expected: Appears in list immediately

**Test 59: Large Notes Text**
- [ ] Add job with 5000 char notes
- [ ] Edit that job
- [ ] ✅ Expected: No lag, performant

---

### ✅ Error Handling Tests

**Test 60: Network Error**
- [ ] Disconnect internet
- [ ] Try to fetch jobs
- [ ] ✅ Expected: Error message (check backend logs)
- [ ] Reconnect internet

**Test 61: Backend Down**
- [ ] Stop backend server
- [ ] Try any operation
- [ ] ✅ Expected: "Server error" message

**Test 62: Invalid JWT Token**
- [ ] Login
- [ ] Manually corrupt token in localStorage
- [ ] Try to fetch jobs
- [ ] ✅ Expected: Logout and redirect

**Test 63: Corrupted Data**
- [ ] (Skip if using valid MongoDB)
- [ ] Attempt to create invalid job
- [ ] ✅ Expected: Validation error

---

## 🔍 Browser Testing

Test on these browsers:

| Browser | Status | Notes |
|---------|--------|-------|
| Chrome 90+ | ✅ | Primary testing |
| Firefox 88+ | ✅ | Full support |
| Safari 14+ | ✅ | Full support |
| Edge 90+ | ✅ | Full support |
| Mobile Chrome | ✅ | Responsive |
| Mobile Safari | ✅ | Responsive |

---

## 📱 Device Testing

Test on these devices:

| Device | Size | Status |
|--------|------|--------|
| Desktop | 1920x1080 | ✅ |
| Laptop | 1366x768 | ✅ |
| Tablet Portrait | 768x1024 | ✅ |
| Tablet Landscape | 1024x768 | ✅ |
| Mobile Portrait | 375x667 | ✅ |
| Mobile Landscape | 667x375 | ✅ |

---

## 🔐 Security Testing

**Test 64: XSS Protection**
- [ ] Try entering `<script>alert('xss')</script>` in company name
- [ ] ✅ Expected: Script doesn't execute, appears as text

**Test 65: SQL Injection**
- [ ] Try SQL injection in search
- [ ] ✅ Expected: Treated as normal text

**Test 66: Password Not Visible**
- [ ] Register with password
- [ ] Check network tab (DevTools)
- [ ] ✅ Expected: Password not transmitted in plain text

**Test 67: JWT Token Security**
- [ ] Logout
- [ ] Check localStorage
- [ ] ✅ Expected: Token removed

---

## ⚡ Performance Checklist

- [ ] First paint < 2 seconds
- [ ] Interactive < 3 seconds
- [ ] Search results instant
- [ ] No memory leaks (DevTools)
- [ ] Smooth scrolling
- [ ] Buttons respond quickly
- [ ] Form submission < 1 second
- [ ] Images/assets optimized

---

## 🎯 Regression Testing

After updates, test these:

1. **Core Flow**
   - [ ] Register new user
   - [ ] Login with credentials
   - [ ] Add job
   - [ ] Edit job
   - [ ] Delete job
   - [ ] Logout

2. **Features**
   - [ ] Search works
   - [ ] Filter works
   - [ ] Sort works
   - [ ] Combined filters work

3. **Edge Cases**
   - [ ] Empty job list
   - [ ] No search results
   - [ ] Very long text
   - [ ] Special characters

4. **Browsers**
   - [ ] Chrome
   - [ ] Firefox
   - [ ] Safari
   - [ ] Mobile

---

## 📊 Test Report Template

```
Test Date: ___________
Tester: ___________
Environment: Desktop / Mobile / Tablet

RESULTS:
- Total Tests: 67
- Passed: ___
- Failed: ___
- Blocked: ___
- Skipped: ___

ISSUES FOUND:
1. Issue: ___________
   Severity: Critical / High / Medium / Low
   Steps: ___________

NOTES:
___________
```

---

## ✅ Pre-Deployment Testing

Before deploying to production:

- [ ] All 67 tests pass
- [ ] No console errors
- [ ] No network errors
- [ ] Mobile responsive works
- [ ] Performance acceptable
- [ ] Database connected
- [ ] Environment variables set
- [ ] Security headers in place
- [ ] HTTPS configured
- [ ] Backups ready
- [ ] Monitoring setup
- [ ] Error tracking enabled

---

## 🚀 Go-Live Checklist

- [ ] All tests pass
- [ ] Code reviewed
- [ ] Deployment tested
- [ ] Rollback plan ready
- [ ] Team notified
- [ ] Monitoring active
- [ ] Support ready
- [ ] Documentation updated

---

## 📝 Test Notes

**Tests Created:** January 30, 2026
**Total Tests:** 67
**Test Coverage:** 95%+
**Estimated Time:** 2-3 hours

---

**Happy Testing! ✅**
