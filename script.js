let currentPokemon;
let currentPokemonName;
let allPokemon = [];

// GIF: document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['showdown']['front_shiny']

async function loadPokemon(name){
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`
    let response = await fetch(url);
    currentPokemon = await response.json();
    currentPokemonName = await currentPokemon['name'].charAt(0).toUpperCase() + currentPokemon['name'].slice(1);

    console.log(currentPokemon);
    renderPokemonInfo(currentPokemon);

    setFavIcon();
    setTitle();
}

// function render
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

async function loadAllPokemon(){
    let url = "https://pokeapi.co/api/v2/pokemon/?limit=1500"
    let response = await fetch(url);
    let responseAsJson = await response.json();
    // console.log('Length: ', responseAsJson['results'].length)

    for (let i=0; i<responseAsJson['results'].length; i++){
        // console.log(i, responseAsJson['results'][i]);
        allPokemon.push(responseAsJson['results'][i]);
    }
    console.log(allPokemon)
}

function renderAllPokemon(){
    for (let i=0; i<50; i++){
        // url += allPokemon[i]['name'];
        let url = `https://pokeapi.co/api/v2/pokemon/${allPokemon[i]['name']}`
        console.log(url);
        document.getElementById('allPokemon').innerHTML += `<div class="card">${url}</div>`;
    }
}