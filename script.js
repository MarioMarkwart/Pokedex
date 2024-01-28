const MAX_POKEMON = 25;
let pokemonIndex = 0;
let allPokemon = [];
let statsTable;
let pokedexOpened;
let pokemonInformations = {
    'name': [],
    'id': [],
    'img': [],
    'abilities': [],
    'height': [],
    'weight': [],
    'types': [],
    'baseStats': [],
    'moves': []
}


async function init(){
  
    await loadAllPokemon();
    await loadPokemonInformations();
    renderPokemonSmallCardOuter();
    // pickRandomPokemon()
    await loadPokemon(pokemonIndex);
}


function pickRandomPokemon(){
    let number = Math.floor(Math.random() * MAX_POKEMON);
    loadPokemon(number);
}


async function loadPokemonInformations(){
    console.log("Length: ", allPokemon.length)
    for (let i=0; i<allPokemon.length; i++){
        let url = allPokemon[i]['url'];
        let response = await fetch(url);
        let responseAsJson = await response.json();
        setPokemonInformations(responseAsJson);
        console.log("fetched: ", i+1);
    }

}

async function setPokemonInformations(currentPokemon){
    pokemonInformations['name'].push(currentPokemon['name']);
    pokemonInformations['id'].push(currentPokemon['id']);
    pokemonInformations['img'].push(currentPokemon['sprites']['other']['official-artwork']['front_shiny']);
    pokemonInformations['abilities'].push(currentPokemon['abilities']);
    pokemonInformations['height'].push(currentPokemon['height']);
    pokemonInformations['weight'].push(currentPokemon['weight']);
    pokemonInformations['types'].push(currentPokemon['types']);
    pokemonInformations['baseStats'].push(currentPokemon['stats']);
    pokemonInformations['moves'].push(currentPokemon['moves']);
    // console.log(pokemonInformations);
}


async function loadAllPokemon(){
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=${MAX_POKEMON}`
    let response = await fetch(url);
    let responseAsJson = await response.json();
    console.log(responseAsJson)
    for (let i=0; i<responseAsJson['results'].length; i++){
        allPokemon.push(responseAsJson['results'][i]);
    }
    console.log(allPokemon);
}


function renderPokemonSmallCardOuter(){
    for(let i=0; i<allPokemon.length;i++){
        renderPokemonSmallCardOuterHTML(i);
        renderPokemonSmallCardInnerHTML(i);
    }
}


async function loadPokemon(idx){
    pokemonIndex = idx;
    pokedexOpened = true;
    setFavIcon();
    setTitle();
    renderPokedex()
}

function renderPokedex(){
    renderPokedexTop();
    renderPokedexBottom(0);
}


function renderPokedexTop(){
    document.getElementById('pokemonName').innerHTML = firstLetterToUpperCase(pokemonInformations['name'][pokemonIndex]);
    let pokePic = pokemonInformations['img'][pokemonIndex];
    if (pokePic != null) document.getElementById('pokemonImage').src = pokePic;
    else (document.getElementById('pokemonImage').src = './img/questionmark.png')

    document.getElementById('pokemonId').innerHTML = /*html*/`#${pokemonInformations['id'][pokemonIndex]}`

    let pokedexTop = document.getElementById('pokedex-top');
    pokedexTop.className = "";
    pokedexTop.classList.add(`${pokemonInformations['types'][pokemonIndex][0]['type']['name']}`)

    document.getElementById('pokedex-container').classList.remove('d-none');
    document.getElementById('overview-container').classList.add('blur');
}


function renderPokedexBottom(index){
    let statsTable = document.getElementById('statsTable');
    statsTable.innerHTML = "";
    switch(index){
        case 0: renderAboutStatHTML(statsTable); break;
        case 1: renderBaseStatHTML(statsTable); break;
        case 2: renderMovesStatHTML(statsTable); break;
    }
}

function setStatsTab(index){
    for (let i = 0; i < 3; i++) {
        if (i === index){
            document.getElementById(`stat${i}`).classList.add('active');
        }
        else{
            document.getElementById(`stat${i}`).classList.remove('active')
        }
    }
    renderPokedexBottom(index, pokemonIndex);
}


function loadNextPokemon(){
    pokemonIndex === allPokemon.length - 1 ? loadPokemon(0) : loadPokemon(pokemonIndex + 1)
}

function loadPreviousPokemon(){
    pokemonIndex === 0 ? loadPokemon(allPokemon.length - 1) : loadPokemon(pokemonIndex - 1)
}

