let currentPokemon;
let currentPokemonName;

// GIF: document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['showdown']['front_shiny']

async function loadPokemon(){
    let url = 'https://pokeapi.co/api/v2/pokemon/pikachu'
    let response = await fetch(url);
    currentPokemon = await response.json();
    currentPokemonName = currentPokemon['name'].charAt(0).toUpperCase() + currentPokemon['name'].slice(1);

    console.log(currentPokemon);
    renderPokemonInfo(currentPokemon);

    setFavIcon();
    setTitle();
}

function renderPokemonInfo(){
    document.getElementById('pokemonName').innerHTML = currentPokemonName;
    // document.getElementById('pokemonImage').src = currentPokemon['sprites']['front_shiny'];
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['official-artwork']['front_shiny'];
}

function setFavIcon(){
    document.getElementById('favicon').href = currentPokemon['sprites']['other']['official-artwork']['front_shiny'];
}

function setTitle(){
    let title = document.getElementById('title');

    if (currentPokemon == "") title.innerHTML = "Pokédex"
    else title.innerHTML = `Pokédex - ${currentPokemonName}`;

}
