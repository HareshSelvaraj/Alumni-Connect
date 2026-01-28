# MongoDB Alumni Search Setup Guide

This guide will help you set up the MongoDB Atlas backend for alumni search functionality with comprehensive filtering options.

## 🚀 Quick Setup

### **Step 1: Environment Setup**
```powershell
# Navigate to backend directory
cd backend/search-api

# Install dependencies
npm install
```

### **Step 2: Configure MongoDB Atlas**
1. Create a `.env` file in `backend/search-api/`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/alumni-platform?retryWrites=true&w=majority
PORT=3001
NODE_ENV=development
```

2. Replace the `MONGODB_URI` with your actual MongoDB Atlas connection string.

### **Step 3: Populate Database**
```powershell
# Run the setup script to populate alumni data
npm run setup
```

### **Step 4: Start Backend Server**
```powershell
# Start the development server
npm run dev
```

### **Step 5: Test the API**
```powershell
# Test search functionality
Invoke-WebRequest -Uri "http://localhost:3001/api/search/alumni?query=sarah"

# Test filters
Invoke-WebRequest -Uri "http://localhost:3001/api/search/alumni?department=Computer Science&company=Google"
```

## 📊 Alumni Data Included

The setup includes 10 comprehensive alumni profiles with:

- **Companies**: Google, Microsoft, Meta, Stripe, Airbnb, Netflix, Uber, Amazon, Apple, StartupXYZ
- **Positions**: Senior Software Engineer, Product Manager, Engineering Manager, VP Engineering, Staff Engineer, CTO, Principal Engineer, Senior Staff Engineer, Software Engineer
- **Skills**: Java, Python, JavaScript, React, System Design, Leadership, Cloud Computing, AWS, iOS Development, and more
- **Departments**: Computer Science
- **Locations**: San Francisco, Seattle, Mountain View, Menlo Park, Austin, Los Gatos, Cupertino

## 🔍 Search Features

### **Text Search**
- Search by name, company, position, department, skills, location
- Case-insensitive matching
- Partial word matching

### **Filter Options**
- **Department**: Filter by specific departments
- **Company**: Filter by company name
- **Position**: Filter by job title
- **Skills**: Filter by specific skills
- **Graduation Year**: Filter by graduation year
- **Location**: Filter by location

### **Combined Search**
- Use multiple filters simultaneously
- Results sorted by rating (highest first)
- Limited to 20 results per search

## 🌐 API Endpoints

### **Search Alumni**
```
GET /api/search/alumni?query=sarah&department=Computer Science&company=Google
```

**Query Parameters:**
- `query`: Text search term
- `department`: Department filter
- `company`: Company filter
- `position`: Position filter
- `skills`: Comma-separated skills
- `graduationYear`: Graduation year
- `location`: Location filter

### **Get Search Filters**
```
GET /api/search/filters?userType=student
```

### **Get Alumni by ID**
```
GET /api/alumni/:id
```

## 🧪 Testing

### **Test Search Queries**
```powershell
# Search by name
Invoke-WebRequest -Uri "http://localhost:3001/api/search/alumni?query=sarah"

# Search by company
Invoke-WebRequest -Uri "http://localhost:3001/api/search/alumni?company=Google"

# Search by skills
Invoke-WebRequest -Uri "http://localhost:3001/api/search/alumni?skills=Python,JavaScript"

# Complex search
Invoke-WebRequest -Uri "http://localhost:3001/api/search/alumni?department=Computer Science&company=Google&skills=Python"
```

### **Test Filter Options**
```powershell
# Get available filters
Invoke-WebRequest -Uri "http://localhost:3001/api/search/filters?userType=student"
```

## 🔧 Troubleshooting

### **Port Already in Use**
If port 3001 is busy, change the port in `.env`:
```env
PORT=3002
```

### **MongoDB Connection Issues**
1. Check your MongoDB Atlas connection string
2. Ensure your IP is whitelisted in MongoDB Atlas
3. Verify network connectivity

### **API Not Responding**
1. Check if the server is running: `npm run dev`
2. Verify the port in the URL matches your `.env` file
3. Check console for error messages

## 📱 Frontend Integration

The frontend is already configured to use this API through the `MongoDBService` class. The search functionality will automatically:

1. Fetch alumni data from MongoDB Atlas
2. Apply filters based on user selection
3. Display results with comprehensive profile information
4. Support real-time search with debouncing

## 🎯 Features

- ✅ **Real-time Search**: Instant results as you type
- ✅ **Advanced Filtering**: Multiple filter options
- ✅ **Comprehensive Data**: Rich alumni profiles with skills, experience, ratings
- ✅ **Scalable**: Built for production use with MongoDB Atlas
- ✅ **Type-safe**: Full TypeScript support
- ✅ **Error Handling**: Robust error handling and fallbacks

## 📈 Performance

- **Search Speed**: Optimized MongoDB queries with indexes
- **Result Limit**: 20 results per search to maintain performance
- **Caching**: Frontend caching for repeated searches
- **Debouncing**: Prevents excessive API calls during typing

## 🔄 Updates

To add more alumni data:
1. Edit `seed-alumni.js` to add new alumni profiles
2. Run `npm run setup` to repopulate the database
3. The new data will be immediately available for search

---

**Ready to test?** Start the backend server and try searching for alumni in the frontend! 