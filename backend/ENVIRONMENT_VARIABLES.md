# Environment Variables Configuration

## Required Environment Variables for Render Deployment

### Core Configuration
```bash
NODE_ENV=production
PORT=3000
```

### Database Configuration
```bash
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/alumni_connect
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/alumni_connect
```

### Authentication & Security
```bash
# JWT Secret Key (Generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### Email Configuration (Feature 2)
```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
```

### Service Ports
```bash
FEATURE1_PORT=5000
FEATURE2_PORT=3001
FEATURE3_PORT=3003
FEATURE4_PORT=3004
FEATURE5_PORT=3005
SEARCH_API_PORT=3002
```

### CORS Configuration
```bash
CORS_ORIGINS=http://localhost:3000,https://your-frontend-domain.com
```

### File Upload Configuration
```bash
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### Admin Configuration
```bash
ADMIN_EMAIL=admin@alumni-connect.com
ADMIN_PASSWORD=admin-password-change-this
```

## How to Set Environment Variables in Render

1. Go to your Render dashboard
2. Select your service
3. Go to "Environment" tab
4. Add each variable with its value
5. Click "Save Changes"

## Important Notes

- **JWT_SECRET**: Generate a strong random string (at least 32 characters)
- **MONGODB_URI**: Use your MongoDB Atlas connection string
- **EMAIL_***: Configure for your email service provider
- **CORS_ORIGINS**: Add your frontend domain(s)
- **ADMIN_***: Change default admin credentials
