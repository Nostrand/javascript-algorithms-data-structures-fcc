// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const pokemonContainer = document.getElementById("pokemon-container");

  // Add an event listener to the search button that triggers when clicked
  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      fetchPokemonData(query);
    }
  });

// Fetch the author data from the PokéAPI Proxy
const fetchPokemonData = (query) => {
    fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${query.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Pokémon not found");
        }
        return res.json();
      })
      .then((data) => {
        displayPokemon(data);
      })
      .catch((err) => {
        alert("Pokémon not found");
        console.error(err.message);
      });
  };

  // Function to display the Pokémon's details such as name, ID, weight, height, image, types, and stats
 const displayPokemon = (pokemon) => {
    const { name, sprites, id, weight, height, types, stats } = pokemon;

    // Update name, id, weight, height, types
    document.getElementById("pokemon-name").innerText = `${name.toUpperCase()}`;
    document.getElementById("pokemon-id").innerText = `#${id}`;
    document.getElementById("weight").innerText = `Weight: ${weight / 10} kg`;
    document.getElementById("height").innerText = `Height: ${height / 10} m`;

    // Clear the previous image (if any) without clearing other data
    const resultsContainer = document.getElementById("results");
    const existingImage = resultsContainer.querySelector("img");
    if (existingImage) {
      existingImage.remove();
    }

    // Update image
    const imageUrl = sprites.front_default;
    const imageContainer = document.createElement("img");
    imageContainer.src = imageUrl;
    imageContainer.alt = name;
    imageContainer.id = "sprite";
    document.querySelector(".image-container").appendChild(imageContainer);

    // Clear the previous types (if any)
    const typesContainer = document.getElementById("types");
    typesContainer.innerHTML = ''; // Clear previous types before adding new ones

    // Iterate through each type and create a new "box" for it
    types.forEach(type => {
      const typeBox = document.createElement("span");
      typeBox.classList.add("type-box", type.type.name); // Add the type class (e.g., "fire")
      typeBox.innerText = type.type.name.toUpperCase(); // Capitalize the type name
      typesContainer.appendChild(typeBox); // Append the type box to the container
    });
    
    // Update stats
    stats.forEach((stat) => {
      const statElement = document.getElementById(stat.stat.name);
      if (statElement) {
        statElement.innerText = stat.base_stat;
      }
    });
  };
});