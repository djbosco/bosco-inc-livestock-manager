// server.js - Express Server Setup
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("MongoDB connection error:", err));

// Animal Schema
const animalSchema = new mongoose.Schema({
  species: String,
  breed: String,
  quantity: Number,
  date_added: { type: Date, default: Date.now },
  vaccinations: [String],
  feed: { type: Number, default: 0 }, // in kilograms
});

const Animal = mongoose.model('Animal', animalSchema);

// Routes
app.get('/api/animals', async (req, res) => {
  const animals = await Animal.find();
  res.json(animals);
});

app.post('/api/animals', async (req, res) => {
  const { species, breed, quantity, vaccinations, feed } = req.body;
  const animal = new Animal({ species, breed, quantity, vaccinations, feed });
  await animal.save();
  res.json(animal);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
