import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [listaPokemon, setListaPokemon] = useState([]);
  const [mostrarLista, setMostrarLista] = useState(false);

  useEffect(() => {
    const cargarPokemon = async () => {
      const URL = "https://pokeapi.co/api/v2/pokemon";
      try {
        const respuesta = await axios.get(URL);
        setListaPokemon(respuesta.data.results);
      } catch (error) {
        console.error("Ocurrió un error al cargar los Pokémon:", error);
      }
    }

    if (mostrarLista) {
      cargarPokemon();
    }
  }, [mostrarLista]);

  const handleClick = () => {
    // Este manejador se llama al hacer clic en el botón
    console.log("Fetch Pokemon clicked");
    setMostrarLista(true); // Mostrar la lista de Pokémon al hacer click
  };

  return (
    <div className="App">
      <h1>API Pokemon</h1>
      <button onClick={handleClick}>Fetch Pokemon</button>
      {mostrarLista && (
        <div className="contenedor-pokemon">
          <ul>
            {listaPokemon.map((pokemon, index) => (
              <li key={index}>{pokemon.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
