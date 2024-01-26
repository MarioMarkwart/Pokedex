const MAX_POKEMON = 151;
let allPokemon = [];
let currentPokemon;
let currentPokemonName;
let statsTable;
let fetchedStats = {
    name: [],
    id: [],
    img: [],
    type: [],
    ability: [],
    weight: [],
    height: [],
    base: [],
    moves: [],
  };

// GIF: document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['showdown']['front_shiny']
async function init(){
    // let randomPokemon = pickRandomPokemon();
    await loadAllPokemon();
    // await loadPokemon(pickRandomPokemon());
    await loadPokemon('pikachu-starter')
    renderPokemonStats(0);
}

function pickRandomPokemon(){
    let number = Math.floor(Math.random() * 1301);
    return allPokemon[number]['name'];
}

function setFetchedStats(){
    // Aufruf:
    // loadPokemon(responseAsJson['results'][i]['name']);
    fetchedStats['name'].push(currentPokemon['name']);
}

async function loadAllPokemon(){
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=${MAX_POKEMON}`
    let response = await fetch(url);
    let responseAsJson = await response.json();
    console.log(responseAsJson)
    for (let i=0; i<responseAsJson['results'].length; i++){
        allPokemon.push(responseAsJson['results'][i]);
        renderPokemonSmallCard(responseAsJson['results'][i]['name']);
    }
    console.log(allPokemon)
}
async function renderPokemonSmallCard(name){
    let content = document.getElementById('overview-container');
    content.innerHTML += `<div class="card" onclick="loadPokemon('${name}')">${name}</div>`
    
// console.log(name)
}


async function loadPokemon(name){
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`
    let response = await fetch(url);
    currentPokemon = await response.json();
    currentPokemonName = await currentPokemon['name'];
    currentPokemonName = firstLetterToUpperCase(currentPokemonName);
    // console.log(currentPokemon);

    setFavIcon();
    setTitle();
    renderPokemonInfoTop(currentPokemon);
}

function renderPokemonInfoTop(){
    document.getElementById('pokemonName').innerHTML = currentPokemonName;
    let pokePic = currentPokemon['sprites']['other']['official-artwork']['front_shiny'];
    if (pokePic != null) document.getElementById('pokemonImage').src = pokePic;
    else (document.getElementById('pokemonImage').src = './img/questionmark.png')

    document.getElementById('pokemonId').innerHTML = /*html*/`#${currentPokemon['id']}`

    let pokedex = document.getElementById('pokedex');
    pokedex.className = "";
    pokedex.classList.add(`${currentPokemon['types'][0]['type']['name']}`)

    document.getElementById('card-container').classList.remove('d-none');
}

/**
 * 
 * @param {*} index 
 */
function renderPokemonStats(index){
    let statsTable = document.getElementById('statsTable');
    statsTable.innerHTML = "";
    switch(index){
        case 0: renderAboutStatHTML(statsTable); break;
        case 1: renderBaseStatHTML(statsTable); break;
        case 2: renderMovesStatHTML(statsTable); break;
    }
}


function renderAboutStatHTML(statsTable){
    let abilities = currentPokemon['abilities'];
    statsTable.innerHTML = "<td><b>Abilities</b></td>"

    toTempArray(abilities, 'ability','name').forEach(e => {
        statsTable.innerHTML += `<td>${e}</td>`;
    });
    statsTable.innerHTML += `
        <tr>
        <td><b>Height</b></td>
        <td>${(currentPokemon['height']/10).toFixed(2)} cm</td>
        </tr>
        <tr>
        <td><b>Weight</b></td><td>${currentPokemon['weight']/10} kg
        <tr><b>Type</b></tr>`

    toTempArray(currentPokemon['types'], 'type', 'name').forEach(e =>{
        statsTable.innerHTML += `<td>${e}</td>`
    })
}

function renderBaseStatHTML(statsTable){
    for(let i=0; i<currentPokemon['stats'].length; i++){
        statsTable.innerHTML += /*html*/`
        <tr>
            <td><b>${currentPokemon['stats'][i]['stat']['name']}:</b></td>
            <td>${currentPokemon['stats'][i]['base_stat']}</td>
        </tr>`
    }
}

function renderMovesStatHTML(statsTable){

    let moves = currentPokemon['moves'];
    for (let i=0; i<moves.length; i++){
        // console.log(moves[i]['move']['name']);
        statsTable.innerHTML += /*html*/`<tr>${firstLetterToUpperCase(moves[i]['move']['name'])}</tr>`;
    }
}

function toTempArray(valuesToPush, part1, part2){
    let tempArray = [];

    for (let i = 0; i < valuesToPush.length; i++) {
        tempArray.push(firstLetterToUpperCase(valuesToPush[i][part1][part2]));
    }
    return tempArray;
}

function setFavIcon(){
    document.getElementById('favicon').href = currentPokemon['sprites']['other']['official-artwork']['front_shiny'];
}


function setTitle(){
    let title = document.getElementById('title');

    if (currentPokemon == "") title.innerHTML = "Pokédex"
    else title.innerHTML = `Pokédex - ${currentPokemonName}`;
}


function loadStat(index){
    for (let i = 0; i < 3; i++) {
        if (i === index){
            document.getElementById(`stat${i}`).classList.add('active');
        }
        else{
            document.getElementById(`stat${i}`).classList.remove('active')
        }
    }
    renderPokemonStats(index);
}


async function renderPokemonMainScreen(){

    for (let i=0; i<50; i++){
        // // url += allPokemon[i]['name'];
        // let url = `https://pokeapi.co/api/v2/pokemon/${allPokemon[i]['url']}`
        // console.log(url)
        // let response = await fetch(url);
        // let responseAsJson = await response.json();
        // console.log(responseAsJson);

        // let imgSrc = responseAsJson['sprites']['other']['official-artwork']['front_shiny'];

        // document.getElementById('allPokemon').innerHTML += /*html*/`<div class="card"><img src="${imgSrc}"></div>`;
    }
}

function firstLetterToUpperCase(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function closeCard(){
    console.log("close")
    document.getElementById('card-container').classList.add("d-none");
}