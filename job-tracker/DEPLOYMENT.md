# Job Tracker - Deployment Guide

Complete guide to deploy Job Tracker to production.

## 🚀 Deployment Options

### Option 1: Heroku (Easiest for Full Stack)

#### Prerequisites
- Heroku account (free tier available)
- Git installed
- Heroku CLI installed

#### Backend Deployment

1. **Create Heroku App**
```bash
heroku login
heroku create job-tracker-backend
```

2. **Add Environment Variables**
```bash
heroku config:set MONGO_URI=<your_mongodb_uri>
heroku config:set JWT_SECRET=<your_jwt_secret>
heroku config:set NODE_ENV=production
```

3. **Deploy**
```bash
git push heroku main
```

#### Frontend Deployment to Vercel

1. **Create Vercel Account**
   - Go to vercel.com
   - Sign up with GitHub

2. **Connect Repository**
   - Import your GitHub repo
   - Select `frontend` as root directory

3. **Set Environment Variables**
```
REACT_APP_API_URL=https://job-tracker-backend.herokuapp.com
```

4. **Deploy**
   - Click Deploy
   - Vercel auto-deploys on push to main

### Option 2: AWS (More Control)

#### Backend on EC2
1. Create EC2 instance (Node.js AMI)
2. SSH into instance
3. Clone repository
4. Install dependencies
5. Set environment variables
6. Run with PM2 for process management
7. Set up nginx as reverse proxy

#### Frontend on S3 + CloudFront
1. Build React app: `npm run build`
2. Upload build folder to S3
3. Configure CloudFront distribution
4. Update API endpoint to backend URL

### Option 3: DigitalOcean (Good for Learning)

1. Create Droplet (Ubuntu 20.04)
2. SSH into droplet
3. Install Node.js and MongoDB
4. Clone and setup application
5. Use Nginx as reverse proxy
6. Enable SSL with Let's Encrypt

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] Remove all console.logs
- [ ] Remove test files
- [ ] Update API URLs (remove localhost)
- [ ] Check for hardcoded values
- [ ] Review error messages (no sensitive data)
- [ ] Validate all inputs

### Security
- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Enable HTTPS only
- [ ] Set secure CORS origin
- [ ] Use environment variables
- [ ] Hash passwords properly
- [ ] No API keys in code

### Database
- [ ] Whitelist production IP in MongoDB
- [ ] Create backup of database
- [ ] Set up database replication
- [ ] Monitor database performance
- [ ] Test failover procedures

### Performance
- [ ] Minify frontend code
- [ ] Enable gzip compression
- [ ] Set up CDN for static files
- [ ] Optimize MongoDB queries
- [ ] Enable caching headers

## 🔧 Build & Optimize

### Frontend Build
```bash
cd frontend
npm run build
```

Creates optimized production build in `build/` folder.

### Backend Optimization
```javascript
// Add to server.js
const compression = require('compression');
app.use(compression());
```

## 🌍 Heroku Deployment (Step by Step)

### Backend

**1. Create Procfile**
```
# backend/Procfile
web: node server.js
```

**2. Update server.js**
```javascript
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**3. Add to package.json**
```json
"engines": {
  "node": "18.x"
}
```

**4. Deploy**
```bash
cd backend
heroku create job-tracker-api
git push heroku main
heroku config:set MONGO_URI=<url>
heroku config:set JWT_SECRET=<secret>
```

### Frontend

**1. Update API URL**
```javascript
// frontend/src/pages/Login.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

fetch(`${API_URL}/api/auth/login`, {
  // ...
})
```

**2. Create .env.production**
```
REACT_APP_API_URL=https://job-tracker-api.herokuapp.com
```

**3. Deploy to Vercel**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

## 🔐 Security Checklist

```javascript
// 1. Use HTTPS in production
const https = require('https');
const fs = require('fs');

// 2. Set secure headers
const helmet = require('helmet');
app.use(helmet());

// 3. Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// 4. CORS with specific origin
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));

// 5. Environment variables
require('dotenv').config();
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET not set');
}
```

## 📊 Monitoring & Logging

### Set Up Error Tracking
```bash
# Using Sentry
npm install @sentry/node

# Initialize in server.js
const Sentry = require("@sentry/node");
Sentry.init({
  dsn: process.env.SENTRY_DSN
});
```

### Database Monitoring
- Use MongoDB Atlas Dashboard
- Monitor connection count
- Check slow query logs
- Set up alerts

## 🔄 CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
        heroku_app_name: "job-tracker-api"
        heroku_email: "your@email.com"
        buildpack: "heroku/nodejs"
```

## 📈 Performance Optimization

### Frontend
```javascript
// Code splitting
const JobForm = React.lazy(() => import('./components/JobForm'));

// Memoization
const JobCard = React.memo(({ job, onEdit, onDelete }) => {
  // component
});
```

### Backend
```javascript
// Caching
const redis = require('redis');
const client = redis.createClient();

app.get('/api/jobs', (req, res) => {
  const key = `jobs:${req.userId}`;
  client.get(key, (err, data) => {
    if (data) return res.json(JSON.parse(data));
    // Otherwise fetch and cache
  });
});
```

## 🆘 Troubleshooting Deployments

### Heroku Build Fails
```bash
# Check logs
heroku logs --tail

# Rebuild
heroku rebuild
```

### MongoDB Connection Error
```bash
# Verify URI
heroku config:get MONGO_URI

# Whitelist IP
# Go to MongoDB Atlas > Network Access
```

### CORS Errors in Production
```javascript
// Update server.js
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

### Slow Performance
- Check database queries
- Enable compression
- Use CDN for static files
- Reduce payload size
- Implement pagination

## 📝 Post-Deployment

1. **Test Everything**
   - Register new account
   - Login with existing account
   - Add/Edit/Delete jobs
   - Search and filter
   - Check all forms

2. **Monitor**
   - Set up error tracking
   - Monitor database
   - Check logs daily
   - Monitor uptime

3. **Maintenance**
   - Regular backups
   - Security patches
   - Performance reviews
   - User feedback

4. **Analytics**
   - Track user registration
   - Monitor feature usage
   - Analyze performance
   - Gather user feedback

## 🎯 Production URLs

Once deployed, your application will be available at:
- **Frontend:** `https://yourdomain.vercel.app`
- **Backend:** `https://job-tracker-api.herokuapp.com`

Update frontend API URL:
```javascript
const API_URL = 'https://job-tracker-api.herokuapp.com';
```

## 💡 Best Practices

1. **Always use environment variables**
2. **Never commit secrets to git**
3. **Use HTTPS in production**
4. **Set up backups**
5. **Monitor error logs**
6. **Keep dependencies updated**
7. **Test before deploying**
8. **Use CI/CD pipeline**
9. **Document deployment process**
10. **Plan rollback strategy**

## 📚 Additional Resources

- [Heroku Node.js Guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Vercel Deployment](https://vercel.com/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
- [AWS Deployment](https://aws.amazon.com/getting-started/)
- [DigitalOcean Docs](https://docs.digitalocean.com/)

---

**Your application is ready for production! 🚀**
