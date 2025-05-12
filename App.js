// App.js - React App Setup
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [animals, setAnimals] = useState([]);
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [vaccinations, setVaccinations] = useState([]);
  const [feed, setFeed] = useState(0);

  // Fetch animals from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/animals')
      .then(res => setAnimals(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add new animal
  const addAnimal = async () => {
    const newAnimal = { species, breed, quantity, vaccinations, feed };
    await axios.post('http://localhost:5000/api/animals', newAnimal);
    setSpecies('');
    setBreed('');
    setQuantity(0);
    setVaccinations([]);
    setFeed(0);
  };

  return (
    <div className="App">
      <h1>Bosco.Inc Livestock Manager</h1>

      <h2>Add New Animal</h2>
      <input type="text" value={species} onChange={(e) => setSpecies(e.target.value)} placeholder="Species" />
      <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} placeholder="Breed" />
      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
      <input type="text" value={vaccinations} onChange={(e) => setVaccinations(e.target.value.split(','))} placeholder="Vaccinations (comma separated)" />
      <input type="number" value={feed} onChange={(e) => setFeed(e.target.value)} placeholder="Feed Quantity (kg)" />
      <button onClick={addAnimal}>Add Animal</button>

      <h2>Animal List</h2>
      <ul>
        {animals.map((animal, index) => (
          <li key={index}>
            <strong>{animal.species} - {animal.breed}</strong> - Quantity: {animal.quantity} - Feed: {animal.feed}kg
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
