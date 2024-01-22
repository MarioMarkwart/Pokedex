let allPokemon = [];
let currentPokemon;
let currentPokemonName;
let statsTable;

// GIF: document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['showdown']['front_shiny']
async function init(){
    await loadAllPokemon();
    await loadPokemon("caterpie")
    renderPokemonStats(0);
}


async function loadAllPokemon(){
    let url = "https://pokeapi.co/api/v2/pokemon/?limit=1500"
    let response = await fetch(url);
    let responseAsJson = await response.json();

    for (let i=0; i<responseAsJson['results'].length; i++){
        allPokemon.push(responseAsJson['results'][i]);
    }
    console.log(allPokemon)
}

async function loadPokemon(name){
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`
    let response = await fetch(url);
    currentPokemon = await response.json();
    currentPokemonName = await currentPokemon['name'];
    currentPokemonName = firstLetterToUpperCase(currentPokemonName);

    console.log(currentPokemon);

    setFavIcon();
    setTitle();
    renderPokemonInfoTop(currentPokemon);
}

function renderPokemonInfoTop(){
    document.getElementById('pokemonName').innerHTML = currentPokemonName;
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['official-artwork']['front_shiny'];
    let pokemonId = document.getElementById('pokemonId');
    console.log(currentPokemon['id'].toString().length)
    if (currentPokemon['id'].toString().length == 1) pokemonId.innerHTML = /*html*/`#000${currentPokemon['id']}`
    else if (currentPokemon['id'].toString().length == 2) pokemonId.innerHTML = /*html*/`#00${currentPokemon['id']}`
    else if (currentPokemon['id'].toString().length == 3) pokemonId.innerHTML = /*html*/`#0${currentPokemon['id']}`
    else pokemonId.innerHTML = /*html*/`#${currentPokemon['id']}`
}

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

function toTempArray(valuesToPush, part1, part2){
    let tempArray = [];

    for (let i = 0; i < valuesToPush.length; i++) {
        tempArray.push(firstLetterToUpperCase(valuesToPush[i][part1][part2]));
    }
    return tempArray;
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