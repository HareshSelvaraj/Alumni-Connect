# Authentication System Setup

This document explains how to set up and test the authentication system for the PIXIL platform.

## Overview

The authentication system supports both students and alumni with the following features:
- User registration and login
- JWT token-based authentication
- Persistent sessions using localStorage
- Route protection with AuthGuard
- Integration with existing backend features

## Backend Setup

### 1. Start the Backend Services

The authentication system integrates with existing backend features. Start these services:

```bash
# Feature 2: Student Profile & Referral System (Port 3000)
cd backend/Feature\ 2\(student-profile-referral-system\)
npm install
npm start

# Feature 3: Trust Verification Layer (Port 4000) - for Alumni
cd backend/Feature\ 3\(trust-verification-layer\)
npm install
npm start

# Feature 1: Alumni Directory Search (Port 5000) - Unified endpoint
cd backend/Feature\ 1\(alumni-directory-search\)
npm install
npm start
```

### 2. Environment Variables

Make sure each backend service has the required environment variables:

```bash
# For all services
JWT_SECRET=your-secret-key-here
MONGODB_URI=mongodb://localhost:27017/pixil
```

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start the Frontend

```bash
npm run dev
```

## Testing the Authentication System

### 1. Access the Test Page

Navigate to `http://localhost:3000/test-auth` to see the authentication test page.

### 2. Test Registration

1. Go to the home page (`http://localhost:3000`)
2. Click "Get Started" or "Login"
3. Click "Register here" to switch to registration mode
4. Fill in the form with test data:
   - **Student**: Name, Email, Password, Year of Study, Department
   - **Alumni**: Name, Email, Password, Company, Batch selection
5. Click "Create Account"

### 3. Test Login

1. After registration, you'll be automatically logged in
2. Or use the login form with existing credentials
3. You should be redirected to the appropriate dashboard

### 4. Test Session Persistence

1. Refresh the page - you should remain logged in
2. Close and reopen the browser - you should remain logged in
3. Check the test page to see your user information

### 5. Test Logout

1. Click the logout button on the test page
2. You should be redirected to the home page
3. Try accessing protected routes - you should be redirected to login

## API Endpoints

The authentication system uses these endpoints:

### Student Authentication
- `POST http://localhost:3000/api/auth/register` - Student registration
- `POST http://localhost:3000/api/auth/login` - Student login
- `GET http://localhost:3000/api/auth/profile` - Get student profile

### Alumni Authentication
- `POST http://localhost:4000/api/auth/register` - Alumni registration
- `POST http://localhost:4000/api/auth/login` - Alumni login

## File Structure

```
frontend/
├── lib/
│   └── auth-service.ts          # Main authentication service
├── contexts/
│   └── user-context.tsx         # User context with auth state
├── components/
│   └── auth-guard.tsx           # Route protection component
├── app/
│   ├── page.tsx                 # Landing page with login/register forms
│   └── test-auth/
│       └── page.tsx             # Authentication test page
└── README-AUTH.md               # This file
```

## Key Features

### 1. Unified Authentication Service
- Handles both student and alumni authentication
- Automatic token management
- Persistent session storage
- Error handling and validation

### 2. User Context
- Global authentication state
- Loading states
- Login/logout functions
- Registration support

### 3. Route Protection
- AuthGuard component for protecting routes
- User type validation
- Automatic redirects

### 4. Form Integration
- Dynamic forms (login vs register)
- Validation and error display
- Loading states
- User type switching

## Troubleshooting

### Common Issues

1. **Backend not running**: Make sure all backend services are running on the correct ports
2. **CORS errors**: Check that backend services allow requests from `http://localhost:3000`
3. **JWT errors**: Verify that `JWT_SECRET` is set in all backend services
4. **Database connection**: Ensure MongoDB is running and accessible

### Debug Mode

Enable debug logging by opening browser dev tools and checking the console for authentication-related logs.

## Security Notes

- Passwords are hashed using bcrypt in the backend
- JWT tokens are used for session management
- Tokens are stored in localStorage (consider httpOnly cookies for production)
- All API calls include proper error handling

## Next Steps

1. Add email verification for registration
2. Implement password reset functionality
3. Add social login (LinkedIn, Google)
4. Implement role-based access control
5. Add session timeout handling
6. Consider implementing refresh tokens
