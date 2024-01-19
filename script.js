let currentPokemon;

// GIF: document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['showdown']['front_shiny']

async function loadPokemon(){
    let url = 'https://pokeapi.co/api/v2/pokemon/pikachu'
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log(currentPokemon);
    renderPokemonInfo(currentPokemon);

    setFavIcon();
    setTitle();
}

function renderPokemonInfo(){
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    // document.getElementById('pokemonImage').src = currentPokemon['sprites']['front_shiny'];
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['official-artwork']['front_shiny'];
    
}
function setFavIcon(){
    document.getElementById('favicon').href = currentPokemon['sprites']['other']['official-artwork']['front_shiny'];
}

function setTitle(){
    document.getElementById('title').innerHTML = `Pokédex - ${currentPokemon['name']}`
}