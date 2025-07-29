const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Alumni = require('../models/alumni');

// Read alumniList from JSON file
const alumniList = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/alumniList.json'), 'utf-8')
);

mongoose.connect('mongodb://localhost:27017/alumni-db')
  .then(() => Alumni.deleteMany({}))
  .then(() => Alumni.insertMany(alumniList))
  .then(() => {
    console.log("✅ Alumni database seeded from alumniList.json!");
    mongoose.disconnect();
  })
  .catch(console.error);
