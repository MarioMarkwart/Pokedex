function renderPokemonSmallCardOuterHTML(i){
    let container = document.getElementById('overview-container');
    let type = pokemonInformations['types'][i][0]['type']['name'];
    container.innerHTML += /*html*/`<div id="card${i}" class="smallCard ${type}" onclick="loadPokemon(${i})"></div>`
}


function renderPokemonSmallCardInnerHTML(i){
    let content = document.getElementById(`card${i}`)
    content.innerHTML += "";
    content.innerHTML += /*html*/`<h2>${pokemonInformations['id'][i]}${firstLetterToUpperCase(pokemonInformations['name'][i])}</h2>`
    for (let j=0; j<pokemonInformations['types'][i].length; j++){
        content.innerHTML += /*html*/`<div class="type">${pokemonInformations['types'][i][j]['type']['name']}`
    }
    content.innerHTML += `<img class="smallPokemon" src="${pokemonInformations['img'][i]}">`
    content.innerHTML += `</div>`
    
}


function renderMoreBtn(){
    document.getElementById('loadMore').innerHTML = /*html*/`<div class="loadMoreBtn" onclick="loadMorePokemon()">Load More Pokemon</div>`
}

function renderAboutStatHTML(statsTable) {
	let abilities = pokemonInformations["abilities"][pokemonIndex];
	statsTable.innerHTML = `
    <div class="statTitle">Abilities</div>
    <div class="statBody" id="statBody></div>`;

    let statBody = document.getElementById('statBody');

	toTempArray(abilities, "ability", "name").forEach((e) => {
		statBody.innerHTML += `<div>${e}</div>`;
	});
	statBody.innerHTML += `
        <div class="statTitle">Height</div>
        <div>${(pokemonInformations["height"][pokemonIndex] / 10).toFixed(2)} cm</div>
        
        <div class="statTitle">Weight</div>
        <div>${pokemonInformations["weight"][pokemonIndex] / 10} kg</div>
        
        <div class="statTitle">Type</div>`

	toTempArray(pokemonInformations["types"][pokemonIndex],"type","name").forEach((e) => {
		stat.innerHTML += `<div>${e}</div>`;
	});
}


function renderBaseStatHTML(statsTable){
    for(let i=0; i<pokemonInformations["baseStats"][pokemonIndex].length; i++){
        statsTable.innerHTML += /*html*/`
            <p><b>${pokemonInformations["baseStats"][pokemonIndex][i]['stat']['name']}:</b>
            ${pokemonInformations["baseStats"][pokemonIndex][i]['base_stat']}</p>`
    }
}


function renderMovesStatHTML(statsTable){

    let moves = pokemonInformations["moves"][pokemonIndex];
    for (let i=0; i<moves.length; i++){
        statsTable.innerHTML += /*html*/`<p>${firstLetterToUpperCase(moves[i]['move']['name'])}</p>`;
    }
}

/**
 *TODO:
 * 
 * <div>Abilities</div>
 * <div abilitiesContainer>FOR OF...abillities</div>
 * ...
 * 
 * 
 * 
 */