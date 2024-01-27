const MAX_POKEMON = 10;
let allPokemon = [];
let currentPokemon;
let currentPokemonName;
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
    loadPokemonInformations();
    // await loadPokemonInformations();
    // await loadPokemon(5);
    // renderPokemonSmallCard();
}


function pickRandomPokemon(){
    let number = Math.floor(Math.random() * 1301);
    return allPokemon[number]['name'];
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


function renderPokemonSmallCard(){
    let content = document.getElementById('overview-container');
    for(let i=0; i<allPokemon.length;i++){
            content.innerHTML += renderPokemonSmallCardHTML(i);
    }
}


async function loadPokemon(index){
    // let url = `https://pokeapi.co/api/v2/pokemon/${name}`
    let url = `https://pokeapi.co/api/v2/pokemon/${index}`
    let response = await fetch(url);
    currentPokemon = await response.json();
    currentPokemonName = await firstLetterToUpperCase(currentPokemon['name']);
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
    document.getElementById('pokemonName').innerHTML = currentPokemonName;
    let pokePic = currentPokemon['sprites']['other']['official-artwork']['front_shiny'];
    if (pokePic != null) document.getElementById('pokemonImage').src = pokePic;
    else (document.getElementById('pokemonImage').src = './img/questionmark.png')

    document.getElementById('pokemonId').innerHTML = /*html*/`#${currentPokemon['id']}`

    let pokedexTop = document.getElementById('pokedex-top');
    pokedexTop.className = "";
    pokedexTop.classList.add(`${currentPokemon['types'][0]['type']['name']}`)

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


function toTempArray(valuesToPush, part1, part2){
    let tempArray = [];

    for (let i = 0; i < valuesToPush.length; i++) {
        tempArray.push(firstLetterToUpperCase(valuesToPush[i][part1][part2]));
    }
    return tempArray;
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
    renderPokedexBottom(index);
}

