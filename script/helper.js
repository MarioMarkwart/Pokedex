/**
 * checks if the pokemon with the current url is already loaded
 * => by checking if key "id" is in the specific pokemons json
 * 
 * @param {string} url url of the pokemon
 * @returns true if pokemon is already loaded, otherwise returns false
 */
function checkIfPokemonInformationLoaded(url){
    let idx = getIdOutOfUrl(url);
    if (allPokemon[idx].hasOwnProperty('id')){
        return true;
    }
    return false;
}


/**
 * 
 * @param {string} valuesToPush the json-array
 * @param {string} depth1 the child-element of the given json
 * @param {string} depth2 the child-element of depth1
 * @returns 
 */
function toTempArray(valuesToPush, depth1, depth2){
    let tempArray = [];

    for (let i = 0; i < valuesToPush.length; i++) {
        tempArray.push(firstLetterToUpperCase(valuesToPush[i][depth1][depth2]));
    }
    return tempArray;
}


/**
 * extracts the id out of the pokemon-url
 * @param {string} urlToSplit the pokemon-url
 * @returns the id as string
 */
function getIdOutOfUrl(urlToSplit){
    return urlToSplit.split('/')[6];
}


/**
 * closing the card
 */
function closePokedex(){
    pokedexOpened = false;
    document.getElementById('pokedex-container').classList.add("d-none");
    document.getElementById('overview-container').classList.remove("blur");
    setFavIcon();
    setTitle();
}


/**
 * set the current tab as active
 * @param {number} tab 
 */
function setStatsTab(tab){
    for (let i = 0; i < 3; i++) {
        i === tab 
        ? document.getElementById(`stat${i}`).classList.add('active')
        : document.getElementById(`stat${i}`).classList.remove('active')
    }
    renderPokedexBottom(tab);
}


/**
 * prohibit to close the card when clicking on an element in it
 * @param {event} event 
 */
function doNotClose(event){
    event.stopPropagation();
}


/**
 * 
 * @param {string} str 
 * @returns the input string with the first letter set to uppercase
 */
function firstLetterToUpperCase(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}


/**
 * when a card is opened set favIcon to opened pokemon,
 * otherwise it's a pokeball
 */
function setFavIcon(){
    if (pokedexOpened) document.getElementById('favicon').href = allPokemon[pokemonIndex]['img'];
    else document.getElementById('favicon').href = '/img/favicon.png';
}


/**
 * when a card is opened set title to the opended pokemons name
 */
function setTitle(){
    let title = document.getElementById('title');

    if (pokedexOpened == "") title.innerHTML = "Pokédex"
    else title.innerHTML = `Pokédex - #${allPokemon[pokemonIndex]['id']} ${firstLetterToUpperCase(allPokemon[pokemonIndex]['name'])}`;
}

function setAmountLoadedPokemon() {
	let count = 0;
	for (var key in allPokemon) {
		if (allPokemon[key].hasOwnProperty("id")) {
			count++;
		}
	}
	return count;
}

/**
 * the up-arrow-button behaviour,
 * scrolls the page to the top
 */
function scrollToTop(){
    window.scrollTo(0,0);
}


/**
 * hide the previous / next button on searched cards
 */
function hidePrevNextBtn(){
    if (searching) {
        document.getElementById('prevBtn').classList.add("d-none");
        document.getElementById('nextBtn').classList.add("d-none");
    }else{
        document.getElementById('prevBtn').classList.remove("d-none");
        document.getElementById('nextBtn').classList.remove("d-none");
    }
    
}


/**
 * check the scroll-y-position
 * if reached the bottom and autoload is checked run loadMorePokemon
 */
window.addEventListener('scroll', () => {
    // Calculate the distance from the top of the page to the scroll position
    let scrollTop = window.scrollY;

    // show/hide ScrollToTop-Button
    if (scrollTop > 100) document.getElementById('scrollUp').classList.remove('d-none');
    else document.getElementById('scrollUp').classList.add('d-none');

    // Calculate the total scrollable height
    let windowHeight = window.innerHeight;
    let fullHeight = document.body.offsetHeight;

    // Check if the scroll is within a certain range from the bottom
    if ((scrollTop + windowHeight >= fullHeight) && autoload) {
        loadMorePokemon();
    }
  })


/**
 * activate the autoLoad 
 */
function setAutoLoad(){
    autoload = !autoload;

    if (searching) autoload = false;

    if (autoload){
        document.getElementById('autoload').classList.add('autoloadActive');
        document.getElementById('loadMore').classList.add('d-none');
        document.getElementById('overview-container').style = "padding-bottom: 75px !important"
    }else{
        document.getElementById('autoload').classList.remove('autoloadActive');
        document.getElementById('loadMore').classList.remove('d-none');
        document.getElementById('overview-container').style = "padding-bottom: 0 !important"
    }
}



/**
 * save allPokemon to localStorage
 */
function saveToLocalStorage() {
    localStorage.setItem("allPokemon", JSON.stringify(allPokemon));
}


/**
 * checks if allPokemon found in localStorage
 * if so => get it from localstorage and set allPokemon
 * @returns true / false
 */
async function loadedFromLocalStorage() {
    let allPokemonAsString = await JSON.parse(localStorage.getItem("allPokemon"));

    if (allPokemonAsString) {
        allPokemon = allPokemonAsString;
        return false;
    }
    return true;
}
