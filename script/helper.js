function toTempArray(valuesToPush, part1, part2){
    let tempArray = [];

    for (let i = 0; i < valuesToPush.length; i++) {
        tempArray.push(firstLetterToUpperCase(valuesToPush[i][part1][part2]));
    }
    return tempArray;
}

function closePokedex(){
    // console.log("close")
    pokedexOpened = false;
    document.getElementById('pokedex-container').classList.add("d-none");
    document.getElementById('overview-container').classList.remove("blur");
    setFavIcon();
    setTitle();
}


function doNotClose(event){
    // console.log('Don\'t close');
    event.stopPropagation();
}


function firstLetterToUpperCase(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}


function setFavIcon(){
    if (pokedexOpened) document.getElementById('favicon').href = pokemonInformations[pokemonIndex]['img'];
    else document.getElementById('favicon').href = '/img/favicon.png';
}


function setTitle(){
    let title = document.getElementById('title');

    if (pokedexOpened == "") title.innerHTML = "Pokédex"
    else title.innerHTML = `Pokédex - ${firstLetterToUpperCase(pokemonInformations[pokemonIndex]['name'])}`;
}

 function scrollToTop(){
    window.scrollTo(0,0);
}

addEventListener('change', () => {
    let chkbx = document.getElementById('chkbxautoload')

    if (chkbx.checked){
        document.getElementById('loadMore').classList.add('d-none');
        document.getElementById('overview-container').style = "padding-bottom: 75px !important"
    }else{
        document.getElementById('loadMore').classList.remove('d-none');
        document.getElementById('overview-container').style = "padding-bottom: 0 !important"
    }

})

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
    if ((scrollTop + windowHeight >= fullHeight) && document.getElementById('chkbxautoload').checked) {
        loadMorePokemon();
    }
  })

function saveToLocalStorage() {
    localStorage.setItem("allPokemon", JSON.stringify(allPokemon));
}

function loadFromLocalStorage() {
    let allPokemonAsString = JSON.parse(localStorage.getItem("allPokemon"));

    if (allPokemonAsString) {
        allPokemon = allPokemonAsString;
        console.log("loaded from localStorage");
        console.log(allPokemon);
        return true;
    } else {
        console.log("loaded from API");
        return false;
    }
}