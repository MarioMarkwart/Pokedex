let currentPokemon;

async function loadPokemon(){
    let url = 'https://pokeapi.co/api/v2/pokemon/pikachu'
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log(currentPokemon);
    renderPokemonInfo(currentPokemon);
}

function renderPokemonInfo(){
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonFront').innerHTML = `<img src="${currentPokemon['sprites']['front_shiny']}" alt="${currentPokemon['name']}">`
}