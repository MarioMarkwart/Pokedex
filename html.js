function renderPokemonSmallCardOuterHTML(i){
    let type = pokemonInformations['types'][i][0]['type']['name'];
    let container = document.getElementById('overview-container');
    container.innerHTML += /*html*/`<div id="card${i}" class="card ${type}" onclick="loadPokemon(${i})"></div>`
}

function renderPokemonSmallCardInnerHTML(i){
    let content = document.getElementById(`card${i}`)
    content.innerHTML += "";
    content.innerHTML += /*html*/`<h2>${firstLetterToUpperCase(allPokemon[i]['name'])}</h2>`
    for (let j=0; j<pokemonInformations['types'][i].length; j++){
        content.innerHTML += /*html*/`<div class="type">${pokemonInformations['types'][i][j]['type']['name']}`
    }
    content.innerHTML += `<img class="smallPokemon" src="${pokemonInformations['img'][i]}">`
    content.innerHTML += `</div>`

}

function renderAboutStatHTML(statsTable) {
	let abilities = pokemonInformations["abilities"][pokemonIndex];
	statsTable.innerHTML = "<p><b>Abilities</b></p>";
	toTempArray(abilities, "ability", "name").forEach((e) => {
		statsTable.innerHTML += `<p>${e}</p>`;
	});
	statsTable.innerHTML += `
        <p>&nbsp</p>
        <p><b>Height</b></p>
        <p>${(pokemonInformations["height"][pokemonIndex] / 10).toFixed(2)} cm</p>
        <p><p>&nbsp</p></p>
        
        <p><b>Weight</b></p>
        <p>${pokemonInformations["weight"][pokemonIndex] / 10} kg</p>
        <p>&nbsp</p>        
        <tr><b>Type</b></p>`;

	toTempArray(pokemonInformations["types"][pokemonIndex],"type","name").forEach((e) => {
		statsTable.innerHTML += `<p>${e}</p>`;
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

