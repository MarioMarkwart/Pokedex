const MAX_POKEMON = 25;
let url = `https://pokeapi.co/api/v2/pokemon/?limit=${MAX_POKEMON}`;
let availablePokemon = 0;
let pokemonIndex = 0;
let fetchedPokemon = 0;
let allPokemon = [];
let loading = false;
let statsTable;
let actStatsTab = 0;
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
    renderPokemonSmallCard();
}


function pickRandomPokemon(){
    let number = Math.floor(Math.random() * MAX_POKEMON);
    loadPokemon(number);
}


async function loadAllPokemon(){
    let response = await fetch(url);
    let responseAsJson = await response.json();

    url = responseAsJson['next'];
    availablePokemon = responseAsJson['count'];
    console.log(responseAsJson)
    for (let i=0; i<responseAsJson['results'].length; i++){
        allPokemon.push(responseAsJson['results'][i]);
    }
    console.log(allPokemon);
}


async function loadPokemonInformations(){
    loading = true;
    for (let i=0; i<allPokemon.length; i++){
        if (!pokemonInformations['id'].includes(i+1)){
            let url = allPokemon[i]['url'];
            let response = await fetch(url);
            let responseAsJson = await response.json();
            setPokemonInformations(responseAsJson);
            fetchedPokemon++;
            loadingScreen(i+1);
        }
    }
    loading = false;
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
}


function renderPokemonSmallCard(){
    document.getElementById('overview-container').innerHTML = "";
    for(let i=0; i<allPokemon.length;i++){
        renderPokemonSmallCardOuterHTML(i);
        renderPokemonSmallCardInnerHTML(i);
    }
    renderMoreBtn();
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
    renderPokedexBottom(actStatsTab);
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
    actStatsTab = index;
    statsTable.innerHTML = "";
    switch(index){
        case 0: renderAboutStatHTML(statsTable); break;
        case 1: renderBaseStatHTML(statsTable); break;
        case 2: renderMovesStatHTML(statsTable); break;
    }
}


function setStatsTab(index){
    for (let i = 0; i < 3; i++) {
        i === index 
        ? document.getElementById(`stat${i}`).classList.add('active')
        : document.getElementById(`stat${i}`).classList.remove('active')
    }
    renderPokedexBottom(index);
}


function loadNextPokemon(){
    console.warn("loadNext: ", actStatsTab)
    pokemonIndex === allPokemon.length - 1 ? loadPokemon(0) : loadPokemon(pokemonIndex + 1)
    setStatsTab(actStatsTab);
}


function loadPreviousPokemon(){
    console.log("PREV: ", actStatsTab)
    setStatsTab(actStatsTab);
    pokemonIndex === 0 ? loadPokemon(allPokemon.length - 1) : loadPokemon(pokemonIndex - 1)
}


function loadingScreen(i){
    let loadingScreen = document.getElementById('loadingScreen');
    let loaded = 0;
    //FIXME:

    if (i<MAX_POKEMON) loaded = i * 100 / MAX_POKEMON;
    else loaded = (i - loaded) * 100 / MAX_POKEMON;

    loadingScreen.innerHTML =  `${loaded.toFixed(2)}% geladen`;
    loaded < 100 ? loadingScreen.classList.remove('d-none') : loadingScreen.classList.add('d-none')
}


async function loadMorePokemon(){
    if(!loading){
        await loadAllPokemon();
        await loadPokemonInformations();
        renderPokemonSmallCard();
    }
}

