const DEBUGMODE = false;
const MAX_POKEMON = 50;
let url = `https://pokeapi.co/api/v2/pokemon/?limit=9999}`;
let availablePokemon = 0;
let allPokemon = [];
let pokemonToSearch = [];
let loadedPokemon = 0;
let pokemonIndex = 0;
let loading = false;
let statsTable;
let actStatsTab = 0;
let pokedexOpened;
let pokemonInformations = {};

//TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:
/**
 * FIXME: Autoload not working in Responsive
 * TODO: Replace AutoLoad with Button (Bootstrap)
 * TODO: Autoload-Icon (DIV with checkbox (opacity 0) and icon)
 * 
 */
//TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:

async function init(){
    if (!DEBUGMODE){
        if (!loadFromLocalStorage()){
            await loadAllPokemon();
        }
        availablePokemon = allPokemon.length;
        await loadPokemonInformations();
        renderPokemonSmallCard();
    }
}


function pickRandomPokemon(){
    let number = Math.floor(Math.random() * MAX_POKEMON);
    loadPokemon(number);
}


async function loadAllPokemon(){
    console.log("running loadAllPokemon")
    let response = await fetch(url);
    let responseAsJson = await response.json();

    url = responseAsJson['next'];
    availablePokemon = responseAsJson['count'];
    console.log(responseAsJson)
    for (let i=0; i<responseAsJson['results'].length; i++){
        allPokemon.push(responseAsJson['results'][i]);
    }
    console.log(allPokemon);
    saveToLocalStorage();
}


async function loadPokemonInformations(){
    loading = true;
    let actBatch = 0;
    for (let i=loadedPokemon; i<loadedPokemon + MAX_POKEMON; i++){
        let url = allPokemon[i]['url'];
        let response = await fetch(url);
        let responseAsJson = await response.json();

        pokemonInformations[i] = {
            ['name']:responseAsJson['name'],
            ['id'] : responseAsJson['id'],
            ['img'] : responseAsJson['sprites']['other']['official-artwork']['front_shiny'],
            ['abilities'] : responseAsJson['abilities'],
            ['height'] : responseAsJson['height'],
            ['weight'] : responseAsJson['weight'],
            ['types'] : responseAsJson['types'],
            ['baseStats'] : responseAsJson['stats'],
            ['moves'] : responseAsJson['moves']
        }
        actBatch++;
        setProgressBar(actBatch);
        (console.log(Object.keys(pokemonInformations).length));
    }
    loadedPokemon += MAX_POKEMON;
    
    loading = false;
}

        // if (!pokemonInformations['id'].includes(i+1)){
        //     let url = allPokemon[i]['url'];
        //     let response = await fetch(url);
        //     let responseAsJson = await response.json();
        //     setPokemonInformations(responseAsJson);
        //     actBatch++;
        //     setProgressBar(actBatch);
        // }
//     }
// }


// async function setPokemonInformations(currentPokemon){
//     pokemonInformations['name'].push(currentPokemon['name']);
//     pokemonInformations['id'].push(currentPokemon['id']);
//     pokemonInformations['img'].push(currentPokemon['sprites']['other']['official-artwork']['front_shiny']);
//     pokemonInformations['abilities'].push(currentPokemon['abilities']);
//     pokemonInformations['height'].push(currentPokemon['height']);
//     pokemonInformations['weight'].push(currentPokemon['weight']);
//     pokemonInformations['types'].push(currentPokemon['types']);
//     pokemonInformations['baseStats'].push(currentPokemon['stats']);
//     pokemonInformations['moves'].push(currentPokemon['moves']);
// }


function renderPokemonSmallCard(){
    document.getElementById('overview-container').innerHTML = "";
    console.log("RENDER: ", loadedPokemon)
    for(let i=0; i<loadedPokemon;i++){
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
    document.getElementById('pokemonName').innerHTML = firstLetterToUpperCase(pokemonInformations[pokemonIndex]['name']);
    let pokePic = pokemonInformations[pokemonIndex]['img'];
    if (pokePic != null) document.getElementById('pokemonImage').src = pokePic;
    else (document.getElementById('pokemonImage').src = './img/questionmark.png')

    document.getElementById('pokemonId').innerHTML = /*html*/`#${pokemonInformations[pokemonIndex]['id']}`

    let pokedexTop = document.getElementById('pokedex-top');
    pokedexTop.className = "";
    pokedexTop.classList.add(`${pokemonInformations[pokemonIndex]['types'][0]['type']['name']}`)

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
    pokemonIndex === loadedPokemon - 1 ? loadPokemon(0) : loadPokemon(pokemonIndex + 1)
    setStatsTab(actStatsTab);
}


function loadPreviousPokemon(){
    console.log("PREV: ", actStatsTab)
    setStatsTab(actStatsTab);
    pokemonIndex === 0 ? loadPokemon(loadedPokemon - 1) : loadPokemon(pokemonIndex - 1)
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
        renderPokemonSmallCard();
    }
}

function searchPokemon(){
    let word = document.getElementById('searchBox').value.toLowerCase();
    console.clear();
    if (word == ""){
        renderPokemonSmallCard();
    }else{
        pokemonToSearch = [];
        for(let i=0; i<allPokemon.length; i++){
            if(allPokemon[i]['name'].includes(word)){
                console.log(i, allPokemon[i]['name'])
                pokemonToSearch.push(allPokemon[i]['url']);
            }
        }
    }
}

async function renderFoundPokemon(){
    document.getElementById('overview-container').innerHTML = "";
    console.log(pokemonToSearch)
    for (let i=0; i<pokemonToSearch.length; i++){
        //?????????????
    }
}