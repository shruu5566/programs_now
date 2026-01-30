# Job Tracker - Architecture & System Design

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER BROWSER                              │
├─────────────────────────────────────────────────────────────┤
│                   REACT.JS (PORT 3000)                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Login / Register Pages                        │   │
│  │  • Form validation                                   │   │
│  │  • API authentication                                │   │
│  │  • Local storage token management                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Job Tracker Dashboard                        │   │
│  │  • Search by company                                 │   │
│  │  • Filter by status                                  │   │
│  │  • Sort by date                                      │   │
│  │  • Add/Edit/Delete jobs                              │   │
│  │  • Display jobs in cards                             │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  Components:                                                │
│  • Login.js → Auth page                                     │
│  • Register.js → Signup page                                │
│  • JobPortal.js → Main dashboard                            │
│  • JobForm.js → Add/Edit form                               │
│  • JobList.js → Jobs wrapper                                │
│  • JobCard.js → Individual job                              │
└─────────────────────────────────────────────────────────────┘
         HTTP/HTTPS (Authorization: Bearer token)
                    ↓↑ API Calls
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND SERVER                             │
│              NODE.JS + EXPRESS (PORT 5000)                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ROUTES LAYER:                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  POST /api/auth/register → Create user              │  │
│  │  POST /api/auth/login → Verify & issue JWT          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  GET  /api/jobs?search=&status=&sort=    [Auth]      │  │
│  │  POST /api/jobs                           [Auth]      │  │
│  │  PUT  /api/jobs/:id                       [Auth]      │  │
│  │  DELETE /api/jobs/:id                     [Auth]      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  MIDDLEWARE LAYER:                                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  CORS                  → Allow frontend requests     │  │
│  │  JSON Parser           → Parse request body          │  │
│  │  Auth Middleware       → Verify JWT tokens           │  │
│  │  Error Handler         → Handle exceptions           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  CONTROLLER LAYER:                                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  authRoutes.js                                       │  │
│  │  • Register: Validate → Hash pwd → Save user        │  │
│  │  • Login: Find user → Compare pwd → Issue JWT       │  │
│  │                                                       │  │
│  │  jobRoutes.js                                        │  │
│  │  • Add: Validate → Create → Save to DB              │  │
│  │  • Get: Query DB → Filter → Sort → Return           │  │
│  │  • Edit: Find → Update → Save                        │  │
│  │  • Delete: Find → Remove                            │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
         MongoDB Driver (Mongoose ODM)
                    ↓↑ Queries
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                            │
│                  MONGODB (ATLAS)                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  COLLECTIONS:                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Users Collection                                    │  │
│  │  {                                                   │  │
│  │    _id: ObjectId,                                    │  │
│  │    name: String,                                     │  │
│  │    email: String (unique),                           │  │
│  │    password: String (hashed),                        │  │
│  │    createdAt: Date,                                  │  │
│  │    updatedAt: Date                                   │  │
│  │  }                                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Jobs Collection                                     │  │
│  │  {                                                   │  │
│  │    _id: ObjectId,                                    │  │
│  │    userId: ObjectId (ref to User),                   │  │
│  │    company: String,                                  │  │
│  │    role: String,                                     │  │
│  │    status: String (enum),                            │  │
│  │    source: String,                                   │  │
│  │    notes: String,                                    │  │
│  │    createdAt: Date,                                  │  │
│  │    updatedAt: Date                                   │  │
│  │  }                                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  INDEXES:                                                   │
│  • email (unique)                                          │
│  • userId (for job queries)                                │
│  • createdAt (for sorting)                                 │
│  • company (for search)                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Diagrams

### Registration Flow
```
User Input (Name, Email, Password)
       ↓
Register.js (Validate locally)
       ↓
POST /api/auth/register
       ↓
authRoutes.js (Check existing user)
       ↓
Hash password (bcryptjs)
       ↓
Create User document
       ↓
Save to MongoDB
       ↓
Generate JWT token
       ↓
Return token + user object
       ↓
Store in localStorage
       ↓
Redirect to /dashboard
```

### Login Flow
```
User Input (Email, Password)
       ↓
Login.js (Validate locally)
       ↓
POST /api/auth/login
       ↓
authRoutes.js (Find user)
       ↓
Compare password hash
       ↓
If valid: Generate JWT token
       ↓
Return token + user object
       ↓
Store in localStorage
       ↓
Redirect to /dashboard
```

### Add Job Flow
```
User fills form:
- Company Name
- Role
- Status
- Source
- Notes
       ↓
JobForm.js (Validate)
       ↓
POST /api/jobs + JWT token
       ↓
auth middleware (Verify token)
       ↓
jobRoutes.js (Validate input)
       ↓
Create Job document with userId
       ↓
Save to MongoDB
       ↓
Return created job
       ↓
JobPortal.js (Update state)
       ↓
Re-render JobList
```

### Search & Filter Flow
```
User enters search/filter/sort
       ↓
JobPortal.js (Update state)
       ↓
Apply filters locally
- Search: company name match
- Status: enum match
- Sort: date comparison
       ↓
Update filteredJobs state
       ↓
JobList re-renders with filtered data
       ↓
Display matching JobCards
```

## 🔐 Authentication Flow

```
┌────────────────────────────────────────────────────┐
│          User Makes Authenticated Request          │
└────────────────────────────────────────────────────┘
                       ↓
┌────────────────────────────────────────────────────┐
│  Header: Authorization: Bearer <JWT_TOKEN>         │
└────────────────────────────────────────────────────┘
                       ↓
┌────────────────────────────────────────────────────┐
│         Express Server Receives Request            │
└────────────────────────────────────────────────────┘
                       ↓
┌────────────────────────────────────────────────────┐
│     auth middleware checks Authorization header    │
└────────────────────────────────────────────────────┘
                       ↓
┌────────────────────────────────────────────────────┐
│  jwt.verify(token, JWT_SECRET)                     │
└────────────────────────────────────────────────────┘
                       ↓
                    Valid?
                   /      \
               YES/        \NO
              /              \
         ↓                     ↓
    ┌────────────────┐  ┌──────────────┐
    │ Decode token   │  │ 401 Response │
    │ Get userId     │  │ "Unauthorized"
    │ req.userId = id│  └──────────────┘
    └────────────────┘
         ↓
    ┌────────────────┐
    │ Route handler  │
    │ (Has userId)   │
    └────────────────┘
         ↓
    ┌────────────────┐
    │ Execute logic  │
    │ (User-specific)│
    └────────────────┘
         ↓
    ┌────────────────┐
    │ Send response  │
    └────────────────┘
```

## 📊 Component Relationship Diagram

```
                        App.js
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
    Login.js         Register.js      JobPortal.js (Dashboard)
        │                 │                 │
        │                 │     ┌───────────┼───────────┐
        │                 │     │           │           │
        │                 │  JobForm.js  JobList.js    (State)
        │                 │                 │
        │                 │           JobCard.js
        │                 │           JobCard.js
        │                 │           JobCard.js
        │                 │           JobCard.js
        │                 │
        └─────────────────┴─────────────────┘
                    |
            localStorage
```

## 🔄 State Management Flow

```
JobPortal.js (Main State Container)
│
├─ jobs → Array of job objects from DB
├─ filteredJobs → Result after search/filter/sort
├─ search → Search query string
├─ statusFilter → Selected status
├─ sortBy → "latest" or "oldest"
├─ loading → Boolean for loading state
├─ editingJob → Current job being edited
│
└─ Functions:
   ├─ fetchJobs() → GET /api/jobs
   ├─ handleSearch() → Filter jobs
   ├─ handleStatusFilter() → Filter jobs
   ├─ handleSort() → Sort jobs
   ├─ handleJobSubmit() → POST/PUT /api/jobs
   ├─ handleDeleteJob() → DELETE /api/jobs/:id
   └─ handleLogout() → Clear localStorage
```

## 🔌 API Request/Response Cycles

### GET /api/jobs
```
REQUEST:
{
  method: "GET",
  headers: {
    "Authorization": "Bearer <token>"
  },
  params: {
    search: "Google",
    status: "Applied",
    sort: "latest"
  }
}

RESPONSE:
[
  {
    _id: "...",
    userId: "...",
    company: "Google",
    role: "SDE",
    status: "Applied",
    source: "LinkedIn",
    notes: "...",
    createdAt: "2024-01-30T...",
    updatedAt: "2024-01-30T..."
  },
  ...
]
```

### POST /api/jobs
```
REQUEST:
{
  method: "POST",
  headers: {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
  },
  body: {
    company: "Google",
    role: "SDE",
    status: "Applied",
    source: "LinkedIn",
    notes: "Great opportunity"
  }
}

RESPONSE:
{
  _id: "newly_created_id",
  userId: "user_id",
  company: "Google",
  role: "SDE",
  status: "Applied",
  source: "LinkedIn",
  notes: "Great opportunity",
  createdAt: "2024-01-30T...",
  updatedAt: "2024-01-30T..."
}
```

## 💾 Database Query Patterns

### Create User
```javascript
User.create({
  name, email, password (will be hashed)
})
```

### Find User by Email
```javascript
User.findOne({ email })
```

### Get User's Jobs
```javascript
Job.find({ userId: user_id })
  .sort({ createdAt: -1 })
```

### Search Jobs
```javascript
Job.find({
  userId: user_id,
  company: { $regex: search, $options: "i" }
})
```

### Filter by Status
```javascript
Job.find({
  userId: user_id,
  status: status_value
})
```

## 🎯 Error Handling Flow

```
Error occurs in:
├─ Frontend
│  └─ Caught by try/catch
│     ├─ Display to user
│     └─ Log to console
│
├─ API call
│  └─ Check response status
│     ├─ 400: Validation error
│     ├─ 401: Auth error
│     ├─ 403: Permission error
│     └─ 500: Server error
│
└─ Backend
   └─ Caught by route handler
      ├─ Validate input
      ├─ Check permissions
      ├─ Database operation
      ├─ If error: Return error response
      └─ If success: Return data
```

## 📈 Performance Optimization Points

```
Frontend:
├─ React.memo() → Prevent unnecessary re-renders
├─ useCallback() → Stable function references
├─ useEffect() → Proper dependency arrays
├─ Code splitting → Lazy load components
└─ CSS → Minimal animations

Backend:
├─ Database indexes → Fast queries
├─ Query optimization → Lean queries
├─ Connection pooling → Reuse connections
├─ Caching → Redis (optional)
└─ Compression → gzip responses

Database:
├─ Index on userId → Fast filtering
├─ Index on email → Fast lookups
├─ Index on createdAt → Fast sorting
├─ Proper schema design → Efficient storage
└─ Connection limits → Prevent overload
```

## 🔐 Security Layers

```
Request
  ↓
CORS Middleware → Verify origin
  ↓
Rate Limiter → Prevent abuse (optional)
  ↓
Body Parser → Parse JSON safely
  ↓
Route Handler → Route matching
  ↓
Auth Middleware → Verify JWT token
  ↓
Validation → Input sanitization
  ↓
Database → Password hashing, user isolation
  ↓
Error Handler → No sensitive data in errors
```

---

This architecture is designed for:
- ✅ Scalability
- ✅ Security
- ✅ Performance
- ✅ Maintainability
- ✅ User experience
