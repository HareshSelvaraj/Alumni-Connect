# Alumni Connect Backend

A comprehensive backend platform for alumni-student networking with multiple microservices architecture.

## 🏗️ Project Structure

```
backend/
├── server.js                          # Main entry point
├── package.json                       # Root package configuration
├── render.yaml                        # Render deployment configuration
├── ENVIRONMENT_VARIABLES.md           # Environment variables documentation
├── README.md                          # This file
│
├── Feature 1(alumni-directory-search)/     # Alumni directory search service
│   ├── app.js
│   ├── package.json
│   ├── models/Alumni.js
│   ├── routes/alumni.js
│   └── data/alumniList.json
│
├── Feature 2(student-profile-referral-system)/  # Student profiles & referrals
│   ├── server.js
│   ├── package.json
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
│
├── Feature 3(trust-verification-layer)/    # Trust verification system
│   ├── server.js
│   ├── package.json
│   ├── models/user.js
│   └── middleware/auth.js
│
├── Feature 4(secure-messaging-chat)/       # Secure messaging system
│   ├── backend/server.js
│   ├── frontend/
│   └── package.json
│
├── Feature 5(admin-dashboard-oversight)/   # Admin dashboard
│   ├── app.js
│   ├── package.json
│   ├── models/
│   └── routes/admin.js
│
└── search-api/                        # Main search API service
    ├── server.js
    ├── package.json
    ├── seed-alumni.js
    └── seed-students.js
```

## 🚀 Services Overview

| Service | Port | Description | Main Features |
|---------|------|-------------|---------------|
| **Main Backend** | 3000 | Primary API gateway | Health checks, routing, documentation |
| **Search API** | 3002 | Core search functionality | Student/alumni search, authentication |
| **Feature 1** | 5000 | Alumni Directory | Alumni search, filtering, profiles |
| **Feature 2** | 3001 | Student Profiles | Student management, referrals, projects |
| **Feature 3** | 3003 | Trust Verification | User verification, approval system |
| **Feature 4** | 3004 | Secure Messaging | Real-time chat, message filtering |
| **Feature 5** | 3005 | Admin Dashboard | System oversight, error monitoring |

## 🛠️ Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB (Atlas recommended)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt, rate limiting, CORS
- **File Upload**: Multer
- **Email**: Nodemailer
- **Validation**: Express Validator

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- MongoDB Atlas account (recommended) or local MongoDB
- Git

## 🔧 Local Development Setup

### 1. Clone and Install Dependencies
```bash
git clone https://github.com/HareshSelvaraj/alumini-connect-backend.git
cd alumini-connect-backend
npm run install:all
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```bash
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/alumni_connect
JWT_SECRET=your-development-secret-key
```

### 3. Start Services
```bash
# Start main backend
npm start

# Or start individual services
npm run start:search      # Search API
npm run start:feature1    # Alumni Directory
npm run start:feature2    # Student Profiles
npm run start:feature3    # Trust Verification
npm run start:feature4    # Secure Messaging
npm run start:feature5    # Admin Dashboard
```

### 4. Seed Database (Optional)
```bash
# Seed the search API database
curl -X POST http://localhost:3002/api/seed
```

## 🌐 Render Deployment

### Option 1: Using render.yaml (Recommended)

1. **Connect Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Select the `render.yaml` file

2. **Configure Environment Variables**
   - Set up MongoDB Atlas database
   - Add required environment variables (see `ENVIRONMENT_VARIABLES.md`)
   - Generate JWT secret

3. **Deploy**
   - Render will automatically deploy all services
   - Each service gets its own URL

### Option 2: Manual Service Creation

1. **Create Database**
   - Go to Render Dashboard
   - Create new MongoDB database
   - Note the connection string

2. **Deploy Main Backend**
   ```bash
   Build Command: npm install
   Start Command: npm start
   Environment: Node
   ```

3. **Deploy Search API**
   ```bash
   Build Command: cd search-api && npm install
   Start Command: cd search-api && npm start
   Environment: Node
   ```

4. **Deploy Individual Features**
   - Repeat for each feature with appropriate build/start commands
   - Use different ports for each service

### Required Environment Variables for Render

```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/alumni_connect
JWT_SECRET=your-production-secret-key
PORT=3000
```

## 📊 API Endpoints

### Main Backend (Port 3000)
- `GET /health` - Health check
- `GET /api` - API documentation

### Search API (Port 3002)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `GET /api/search/students` - Search students
- `GET /api/search/alumni` - Search alumni
- `GET /api/search/filters` - Get search filters
- `POST /api/seed` - Seed database

### Feature 1 - Alumni Directory (Port 5000)
- `GET /api/alumni` - Get alumni list
- `GET /api/alumni/search` - Search alumni

### Feature 2 - Student Profiles (Port 3001)
- `GET /api/profile` - Student profiles
- `POST /api/referrals` - Create referrals
- `GET /api/projects` - Student projects

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Rate Limiting**: Prevents API abuse
- **CORS Protection**: Configurable cross-origin requests
- **Input Validation**: Express validator for data validation
- **Environment Variables**: Secure configuration management

## 📈 Monitoring & Logging

- Health check endpoints for all services
- Request logging middleware
- Error handling and reporting
- Admin dashboard for system oversight

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check MONGODB_URI environment variable
   - Ensure MongoDB Atlas IP whitelist includes Render IPs
   - Verify database credentials

2. **Port Already in Use**
   - Check if another service is running on the same port
   - Use different ports for each service

3. **JWT Token Issues**
   - Ensure JWT_SECRET is set
   - Check token expiration time
   - Verify token format in requests

4. **CORS Errors**
   - Update CORS_ORIGINS environment variable
   - Check frontend domain configuration

### Debug Commands
```bash
# Check service health
curl http://localhost:3000/health

# Test database connection
curl http://localhost:3002/api/health

# Seed database
curl -X POST http://localhost:3002/api/seed
```

## 📝 Development Guidelines

1. **Code Structure**: Follow the existing modular structure
2. **Environment Variables**: Always use environment variables for configuration
3. **Error Handling**: Implement proper error handling and logging
4. **Security**: Follow security best practices
5. **Documentation**: Update API documentation when adding new endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the troubleshooting section
- Review the API documentation

---

**Happy Coding! 🚀**
