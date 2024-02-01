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
	statsTable.innerHTML = `
        <div class="statTitle">Abilities</div>
        <div class="statBody" id="abilities"></div>`;

	toTempArray(pokemonInformations["abilities"][pokemonIndex], "ability", "name").forEach((e) => {
		document.getElementById('abilities').innerHTML += `<div class="statValue">${e}</div>`;
	});

	statsTable.innerHTML += `
        <div class="statTitle">Height</div>
        <div class="statBody" id="height"></div>`;

    document.getElementById('height').innerHTML = 
        `<div class="statValue">${(pokemonInformations["height"][pokemonIndex] / 10).toFixed(2)} cm</div>`
        
        statsTable.innerHTML += ` 
        <div class="statTitle">Weight</div>
        <div class="statBody" id="weight"></div>`;

    document.getElementById('weight').innerHTML += 
        `<div class="statValue">${pokemonInformations["weight"][pokemonIndex] / 10} kg</div>`

    statsTable.innerHTML +=`
        <div class="statTitle">Type</div>
        <div class="statBody" id="type"></div>`;

	toTempArray(pokemonInformations["types"][pokemonIndex],"type","name").forEach((e) => {
        document.getElementById('type').innerHTML += `<div class="statValue">${e}</div>`;
	});
}


function renderBaseStatHTML(statsTable){
    // WARUM KEINE BALKEN WENN LEER? WIRD DOCH DANACH GEFÜLLT?!"
    chartLabel = [];
    chartData = [];
    statsTable.innerHTML = `<canvas id="myChart"></canvas>`

    for(let i=0; i<pokemonInformations["baseStats"][pokemonIndex].length; i++){
        chartLabel.push(pokemonInformations["baseStats"][pokemonIndex][i]['stat']['name']);
        chartData.push(pokemonInformations["baseStats"][pokemonIndex][i]['base_stat']);
        // statsTable.innerHTML += /*html*/`
        //     <p><b>${pokemonInformations["baseStats"][pokemonIndex][i]['stat']['name']}:</b>
        //     ${pokemonInformations["baseStats"][pokemonIndex][i]['base_stat']}</p>`
    }
    console.log(chartLabel, chartData);
    drawChart();
}


function renderMovesStatHTML(statsTable){

    let moves = pokemonInformations["moves"][pokemonIndex];
    statsTable.innerHTML = `<div class="statBody" id="moves"></div>`
    for (let i=0; i<moves.length; i++){
        document.getElementById('moves').innerHTML += /*html*/`<div class="statValue moveStats">${firstLetterToUpperCase(moves[i]['move']['name'])}</div>`
    }
}

//Farbe + Komplementärfarbe = Weiß / Weiß - Farbe = Komplementärfarbe
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