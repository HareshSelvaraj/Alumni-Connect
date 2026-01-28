# MongoDB Atlas Search API

This backend provides search functionality for the alumni platform using MongoDB Atlas.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/alumni-platform?retryWrites=true&w=majority

# Server Port
PORT=3001

# Environment
NODE_ENV=development
```

### 3. MongoDB Atlas Setup
1. Create a MongoDB Atlas account at https://cloud.mongodb.com
2. Create a new cluster
3. Get your connection string from the cluster
4. Replace the MONGODB_URI in your .env file

### 4. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### 5. Seed Sample Data
```bash
npm run seed
```

## API Endpoints

### Search Students
```
GET /api/search/students?query=john&department=Computer Science&batch=Final Year
```

### Search Alumni
```
GET /api/search/alumni?query=sarah&department=Computer Science&company=Google
```

### Get Search Filters
```
GET /api/search/filters?userType=student
```

### Get Student by ID
```
GET /api/students/:id
```

### Get Alumni by ID
```
GET /api/alumni/:id
```

### Seed Data
```
POST /api/seed
```

## Features

- **Text Search**: Search by name, department, company, position, skills
- **Filtering**: Filter by department, company, batch, position
- **Real-time Results**: Fast search with MongoDB Atlas
- **Scalable**: Built for production use with MongoDB Atlas

## Frontend Integration

The frontend uses the `MongoDBService` class to communicate with this API. Make sure the frontend environment variable `NEXT_PUBLIC_API_URL` points to this server (default: http://localhost:3001/api). 