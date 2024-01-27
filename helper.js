function toTempArray(valuesToPush, part1, part2){
    let tempArray = [];

    for (let i = 0; i < valuesToPush.length; i++) {
        tempArray.push(firstLetterToUpperCase(valuesToPush[i][part1][part2]));
    }
    return tempArray;
}

function closePokedex(){
    console.log("close")
    pokedexOpened = false;
    document.getElementById('pokedex-container').classList.add("d-none");
    document.getElementById('overview-container').classList.remove("blur");
    setFavIcon();
    setTitle();
}


function doNotClose(event){
    console.log('Don\'t close');
    event.stopPropagation();
}


function firstLetterToUpperCase(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}


function setFavIcon(){
    if (pokedexOpened) document.getElementById('favicon').href = pokemonInformations['img'][pokemonIndex];
    else document.getElementById('favicon').href = '/img/favicon.png';
}


function setTitle(){
    let title = document.getElementById('title');

    if (pokedexOpened == "") title.innerHTML = "Pokédex"
    else title.innerHTML = `Pokédex - ${firstLetterToUpperCase(pokemonInformations['name'][pokemonIndex])}`;
}