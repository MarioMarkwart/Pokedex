const MAX_POKEMON = 25; //set amount of Pokemon to be loaded each batch
let url = `https://pokeapi.co/api/v2/pokemon/?limit=9999`;
let allPokemon = {};
let foundPokemon = [];
let language = 'de';
let namesLanguageField = 'germanName';
let statsTable = "";
let availablePokemon = 0;
let loadedPokemon = 0;
let pokemonIndex = 0;
let actStatsTab = 0;
let searchTimeout;
let loading = false;
let pokedexOpened = false;
let searching = false;
let autoload = false;


/**
 * initial function
 */
async function init() {
	await loadAllPokemon();
	await loadPokemonInformations();
    checkIfMobileDevice();
    setAutoLoad();
	renderBatch();
    printWelcomeMessage();
}


/**
 * fetch all names and urls
 */
async function loadAllPokemon() {
	let response = await fetch(url);
	let responseAsJson = await response.json();
	availablePokemon = responseAsJson["count"];
	for (let i = 0; i < responseAsJson["results"].length; i++) {
		if (getIdOutOfUrl(responseAsJson["results"][i]["url"]) < 10000){
            allPokemon[getIdOutOfUrl(responseAsJson["results"][i]["url"])] =
                responseAsJson["results"][i];
        }
	}
}


/**
 * loading batches of MAX_POKEMON
 * => setPokemonInformations
 */
async function loadPokemonInformations(){
    loading = true;
    setProgressBar()
    let loadingList = [];
    for (let i=loadedPokemon; i<loadedPokemon + MAX_POKEMON; i++){
        loadingList.push(setPokemonInformations(allPokemon[i+1]['url']))
    }
    await Promise.all(loadingList);
    loadedPokemon += MAX_POKEMON;
    loading = false;
    setProgressBar();
}


/**
 * fetch needed information for each given pokemon
 * @param {string} url the url of the pokemon
 */
async function setPokemonInformations(url){

    if (!checkIfPokemonInformationLoaded(url)){
        let response = await fetch(url);
        let responseAsJson = await response.json();
        let pokemonId = responseAsJson['id']
        allPokemon[pokemonId] = {
            ['name']:responseAsJson['name'],
            ['germanName']:germanNames[responseAsJson['id']]['name'],
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
}


// PROGRESS BAR
function setProgressBar(){
    let progressBar = document.getElementById('progressBar')
    if(loading){
        progressBar.classList.add("progress-bar-striped")
        progressBar.classList.add("progress-bar-animated")
        progressBar.innerHTML = "...loading..."
    }else{
        progressBar.classList.remove("progress-bar-striped")
        progressBar.classList.remove("progress-bar-animated")
        if (searching) progressBar.innerHTML = `${foundPokemon.length} Pokémon found`
        else progressBar.innerHTML = `Showing ${loadedPokemon} of ${availablePokemon} Pokémon`
    }
}


// SMALLCARD
/**
 * render batches of size MAX_POKEMON
 */
function renderBatch(){
    document.getElementById('overview-container').innerHTML = "";
    for (let i=0; i<loadedPokemon; i++){
        renderPokemonSmallCard(allPokemon[i+1]['id']);
    }
}


/**
 * render the card on overview for any pokemon
 * @param {*} pokemonId the pokemon id
 */
function renderPokemonSmallCard(pokemonId){
    renderPokemonSmallCardOuterHTML(pokemonId);
    renderPokemonSmallCardInnerHTML(pokemonId);
    renderMoreBtn();
}


// POKEDEX (card)
/**
 * load the card for a specific pokemon
 * @param {*} pokemonId the pokemon id
 */
function loadPokedex(pokemonId){
    hidePrevNextBtn();
    pokemonIndex = pokemonId;
    pokedexOpened = true;
    toggleNoScroll();
    setFavIcon();
    setTitle();
    renderPokedex();
}


/**
 * render the loaded card
 */
function renderPokedex(){
    renderPokedexTop();
    renderPokedexBottom(actStatsTab);
}


/**
 * render the top part of the card
 */
function renderPokedexTop(){
    document.getElementById('pokemonName').innerHTML = firstLetterToUpperCase(allPokemon[pokemonIndex][namesLanguageField]);
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


/**
 * render the tab (1, 2 or 3) of informations on the bottom of the card
 * @param {number} tab 
 */
function renderPokedexBottom(tab){
    let statsTable = document.getElementById('statsTable');
    actStatsTab = tab;
    statsTable.innerHTML = "";
    switch(tab){
        case 0: renderAboutStatHTML(statsTable); break;
        case 1: renderBaseStatHTML(statsTable); break;
        case 2: renderMovesStatHTML(statsTable); break;
    }
}


// PREVIOUS / NEXT
/**
 * load the previous card
 */
function loadNextPokemon(){
    pokemonIndex === loadedPokemon  ? loadPokedex(1) : loadPokedex(pokemonIndex + 1)
    setStatsTab(actStatsTab);
}


/**
 * load the next card
 */
function loadPreviousPokemon(){
    setStatsTab(actStatsTab);
    pokemonIndex === 1 ? loadPokedex(loadedPokemon) : loadPokedex(pokemonIndex - 1)
}


/**
 * load and render the next batch of size MAX_POKEMON
 */
async function loadMorePokemon(){
    if(!loading){
        await loadPokemonInformations();
        renderBatch();
    }
}


// SEARCHING
/**
 * get value from input field to search for pokemon.
 * disable the loadMore-button while searching
 */
function searchPokemon() {
    let word = document.getElementById('searchBox').value.toLowerCase();
    if (word == "") {
        searching = false;
        renderBatch();
        setAutoLoad();
        setProgressBar();
    } else {
        searching = true;
        setAutoLoad();
        clearTimeout(searchTimeout);
        renderMoreBtn();
        fillFoundPokemon(word);
        closePokedex();
    }
}


/**
 * search in the array for matches and push the results in foundPokemon[],
 * finally fetch the found pokemon 
 * @param {string} word 
*/
function fillFoundPokemon(word){
    foundPokemon = [];
    searchTimeout = setTimeout(function() {
        for (let key in allPokemon) {
            if (allPokemon[key]['name'].includes(word) || germanNames[key]['name'].toLowerCase().includes(word)) {
                if (!foundPokemon.includes(allPokemon[key]['url']))
                    foundPokemon.push(allPokemon[key]['url']);
            }
        }
        fetchFoundPokemon();
    }, 1000);
}


/**
 * load all found pokemon
 */
async function fetchFoundPokemon(){
    if (searching){
        document.getElementById('overview-container').innerHTML = "";
        let loadingList = []
        for (let i=0; i<foundPokemon.length; i++){
            loadingList.push(setPokemonInformations(foundPokemon[i]))
        }
        loading = true;
        setProgressBar();
        await Promise.all(loadingList);
        loading = false;
        setProgressBar();
        renderFoundPokemon();
    }
}


/**
 * render the search results
 */
function renderFoundPokemon(){
    document.getElementById('overview-container').innerHTML = "";
    for (let i=0; i<foundPokemon.length; i++){
        renderPokemonSmallCard(getIdOutOfUrl(foundPokemon[i]));
    }
}


/**
 * switch the language of the pokemon names between us and de
 * and also set the flag inside of the pokeball
 */
function switchLanguage() {
    if (language == "us") {
        namesLanguageField = "germanName";
		language = "de";
	} else if (language == "de") {
        namesLanguageField = "name";
		language = "us"
    }
    setPokeballLanguageIcon();
    setTitle();
    if(pokedexOpened) renderPokedex();
	
    if(searching) renderFoundPokemon(); 
    else renderBatch();
}


/**
 * printing a welcome message on the console
 */
function printWelcomeMessage(){
    console.log(
`Welcome to my Pokedex!

You can search out of ${availablePokemon} Pokemon with the original english name convention or the german version.
Switch the names by clicking the Pokeball on the top left side.
Just start searching and see some statistics of your favorite Pokemon!

On desktop browsers is an autoload available, which is deativated on mobile devices.

Have fun! :)`);
}