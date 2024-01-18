let currentPokemon;

async function loadPokemon(){
    let url = 'https://pokeapi.co/api/v2/pokemon/pikachu'
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log(currentPokemon);
    renderPokemonInfo(currentPokemon);
}

function renderPokemonInfo(){
    let pokemonName = currentPokemon['name'];
    document.getElementById('pokemonName').innerHTML = pokemonName;
}