let allPokemon = [];
let currentPokemon;
let currentPokemonName;

// GIF: document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['showdown']['front_shiny']
async function init(){
    await loadAllPokemon();
    await loadPokemon("ivysaur")
    await renderPokemonStats();
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
    currentPokemonName = await currentPokemon['name'].charAt(0).toUpperCase() + currentPokemon['name'].slice(1);

    console.log(currentPokemon);

    setFavIcon();
    setTitle();
    renderPokemonInfo(currentPokemon);
}

function renderPokemonInfo(){
    document.getElementById('pokemonName').innerHTML = currentPokemonName;
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['official-artwork']['front_shiny'];
    // document.getElementById('pokemonStats').innerHTML = currentPokemon[]
    console.log(currentPokemon);
}

function renderPokemonStats(){
    let statsTable = document.getElementById('statsTable');
    // stats.innerHTML = '<table>';
    for(let i=0; i<currentPokemon['stats'].length; i++){
        console.log(currentPokemon['stats'][i]['stat']['name'])
        statsTable.innerHTML += /*html*/`
        <tr>
            <td><b>${currentPokemon['stats'][i]['stat']['name']}:</b></td>
            <td>${currentPokemon['stats'][i]['base_stat']}</td>
        </tr>`
    }
    // stats.innerHTML += `</table>`
}

function setFavIcon(){
    document.getElementById('favicon').href = currentPokemon['sprites']['other']['official-artwork']['front_shiny'];
}

function setTitle(){
    let title = document.getElementById('title');

    if (currentPokemon == "") title.innerHTML = "Pokédex"
    else title.innerHTML = `Pokédex - ${currentPokemonName}`;
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

function loadStat(index){
    let content = document.getElementById('pokemonStats');
    for (let i = 0; i < 4; i++) {
        if (i === index){
            document.getElementById(`stat${i}`).classList.add('active');
            // content.innerHTML =  renderPokemonStats(i);
        }
        else{
            document.getElementById(`stat${i}`).classList.remove('active')
        }
    }


}