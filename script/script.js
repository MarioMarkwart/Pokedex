const DEBUGMODE = false;
const MAX_POKEMON = 25;
let url = `https://pokeapi.co/api/v2/pokemon/?limit=9999}`;
let availablePokemon = 0;
let allPokemon = {};
let searching = false;
let foundPokemon = [];
let loadedPokemon = 0;
let pokemonIndex = 0;
let loading = false;
let statsTable;
let actStatsTab = 0;
let pokedexOpened;
let actBatch = 0;

//TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:
/**
 * FIXME: Autoload not working in Responsive
 * TODO: Replace AutoLoad with Button (Bootstrap)
 * TODO: Autoload-Icon (DIV with checkbox (opacity 0) and icon)
 * 
 */
//TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:

async function init() {
	await loadAllPokemon();
	await loadPokemonInformations();
	renderBatch();
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
    for (let i=0; i<responseAsJson['results'].length; i++){
        allPokemon[i+1] = responseAsJson['results'][i];
        // console.log(i)
        // allPokemon.push(responseAsJson['results'][i]);
    }
    console.log(allPokemon);
    saveToLocalStorage();
}


async function loadPokemonInformations(){
    loading = true;

    let loadingList = [];

    for (let i=loadedPokemon; i<loadedPokemon + MAX_POKEMON; i++){
        loadingList.push(setPokemonInformations(allPokemon[i+1]['url']))
    }

    await Promise.all(loadingList);

    loadedPokemon += MAX_POKEMON;

    loading = false;
}


async function setPokemonInformations(url){
    let response = await fetch(url);
    let responseAsJson = await response.json();

    let pokemonId = responseAsJson['id']
    allPokemon[pokemonId] = {
        ['name']:responseAsJson['name'],
        ['id'] : responseAsJson['id'],
        ['img'] : responseAsJson['sprites']['other']['official-artwork']['front_shiny'],
        ['abilities'] : responseAsJson['abilities'],
        ['height'] : responseAsJson['height'],
        ['weight'] : responseAsJson['weight'],
        ['types'] : responseAsJson['types'],
        ['baseStats'] : responseAsJson['stats'],
        ['moves'] : responseAsJson['moves'],
        ['url'] : url
    }
}

function renderBatch(){
    document.getElementById('overview-container').innerHTML = "";
    for (let i=0; i<loadedPokemon; i++){
        // console.log(allPokemon[i+1]['id'])
        renderPokemonSmallCard(allPokemon[i+1]['id']);
    }
}


function renderPokemonSmallCard(pokemonId){
    renderPokemonSmallCardOuterHTML(pokemonId);
    renderPokemonSmallCardInnerHTML(pokemonId);
    renderMoreBtn();
}


function loadPokemon(idx){
    hidePrevNextBtn();
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
    document.getElementById('pokemonName').innerHTML = firstLetterToUpperCase(allPokemon[pokemonIndex]['name']);
    let pokePic = allPokemon[pokemonIndex]['img'];
    if (pokePic != null) document.getElementById('pokemonImage').src = pokePic;
    else (document.getElementById('pokemonImage').src = './img/questionmark.png')

    document.getElementById('pokemonId').innerHTML = /*html*/`#${allPokemon[pokemonIndex]['id']}`

    let pokedexTop = document.getElementById('pokedex-top');
    pokedexTop.className = "";
    pokedexTop.classList.add(`${allPokemon[pokemonIndex]['types'][0]['type']['name']}`)

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
    pokemonIndex === loadedPokemon  ? loadPokemon(1) : loadPokemon(pokemonIndex + 1)
    setStatsTab(actStatsTab);
}


function loadPreviousPokemon(){
    setStatsTab(actStatsTab);
    pokemonIndex === 1 ? loadPokemon(loadedPokemon) : loadPokemon(pokemonIndex - 1)
}


function setProgressBar(actBatch){
    let percent = actBatch * 100 / MAX_POKEMON;
    document.getElementById('progressBar').style.setProperty('width', `${percent}%`);
    document.getElementById('progressBar').innerHTML = `${percent}%`;
    if(percent == 100){
        document.getElementById('progressBar').style.setProperty('width', `${percent}%`);
        document.getElementById('progressBar').innerHTML = `${loadedPokemon + MAX_POKEMON} of ${availablePokemon} loaded`
    }
}


async function loadMorePokemon(){
    if(!loading){
        await loadPokemonInformations();
        renderBatch();
    }
}


function searchPokemon(){
    let word = document.getElementById('searchBox').value.toLowerCase();
    if (word == ""){
        searching = false;
        renderBatch();
    }else{
        searching = true;
        renderMoreBtn();
        foundPokemon = [];
        // console.log(Object.keys(allPokemon).length);
        document.getElementById('overview-container').innerHTML = "";
        for (let key in allPokemon){
            // console.log(allPokemon[key]['name'])
            if (allPokemon[key]['name'].includes(word)){
                foundPokemon.push(allPokemon[key]['url']);
            }
        }        
        // for(let i=0; i<Object.keys(allPokemon).length; i++){
        //     if(allPokemon[i+1]['name'].includes(word)){
        //         foundPokemon.push(i+1);
        //     }
        // }
        // console.log(foundPokemon)
        fetchFoundPokemon();
    }
}


async function fetchFoundPokemon(){
    document.getElementById('overview-container').innerHTML = "";
    let loadingList = []
    for (let i=0; i<foundPokemon.length; i++){
        console.log(foundPokemon)
        loadingList.push(setPokemonInformations(foundPokemon[i]))
    }
    await Promise.all(loadingList);
    renderFoundPokemon();
}


function renderFoundPokemon(){
    document.getElementById('overview-container').innerHTML = "";
    for (let i=0; i<foundPokemon.length; i++){
        renderPokemonSmallCard(getIdOutOfUrl(foundPokemon[i]));
    }
}