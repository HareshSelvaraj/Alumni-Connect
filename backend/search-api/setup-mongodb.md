# MongoDB Atlas Setup Guide

## **Step 1: Create .env file**

Create a `.env` file in the `backend/search-api/` directory with your MongoDB Atlas connection string:

```env
# MongoDB Atlas Connection String
MONGODB_URI= "Cluster srv link"

# Server Port
PORT=3002

# Environment
NODE_ENV=development
```

## **Step 2: Get Your MongoDB Atlas Connection String**

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Sign in to your account
3. Select your cluster
4. Click "Connect"
5. Choose "Connect your application"
6. Copy the connection string
7. Replace `username`, `password`, and `cluster` with your actual values

## **Step 3: Test the Connection**

After creating the `.env` file, run:

```powershell
npm run seed-alumni
npm run seed-students
```

## **Step 4: Verify Data in MongoDB Atlas**

1. Go to your MongoDB Atlas dashboard
2. Click on "Browse Collections"
3. Look for the `alumni-platform` database
4. Check for `alumni` and `students` collections

## **Current Issue**

The server is currently using a local MongoDB URI:
```
mongodb://localhost:27017/alumni-platform
```

This means data is being stored locally, not in MongoDB Atlas.

## **Quick Fix**

1. Create the `.env` file with your Atlas connection string
2. Restart the server: `npm run dev`
3. Re-seed the data: `npm run seed-alumni` and `npm run seed-students` 
