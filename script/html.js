/**
 * 
 * @param {number} i the smallCard-number
 */

function renderPokemonSmallCardOuterHTML(i){
    let container = document.getElementById('overview-container');
    let type = allPokemon[i]['types'][0]['type']['name'];
    container.innerHTML += /*html*/`<div id="card${i}" class="smallCard ${type}" onclick="loadPokedex(${i})"></div>`
}

/**
 * 
 * @param {number} i the smallCard-number
 */
function renderPokemonSmallCardInnerHTML(i){
    let content = document.getElementById(`card${i}`)
    content.innerHTML += "";
    content.innerHTML += /*html*/`<div class="smallCardTitle"><h2>${firstLetterToUpperCase(allPokemon[i]['name'])}</h2><span class="smallCardId">#${allPokemon[i]['id']}</span></div>`
    for (let j=0; j<allPokemon[i]['types'].length; j++){
        content.innerHTML += /*html*/`<div class="type">${allPokemon[i]['types'][j]['type']['name']}`
    }
    content.innerHTML += `<img class="smallPokemon" src="${setImage(i)}" alt="${allPokemon[i]['name']}">`
    content.innerHTML += `</div>`
}


/**
 * if theres no pokemon image set it to a default questionmark-image
 * @param {number} idx index of the pokemon
 * @returns the url of the image
 */
function setImage(idx){
    if (allPokemon[idx]['img'] == null){
        return './img/questionmark.png'
    }
    return allPokemon[idx]['img']
}


/**
 * render the loadMoreButton
 */
function renderMoreBtn(){
    let loadMoreBtn = document.getElementById('loadMore');
    let checkbox = document.getElementById('chkbxautoload')
    loadMoreBtn.innerHTML = /*html*/`<div id="loadMoreBtn" class="loadMoreBtn d-none" onclick="loadMorePokemon()">Load More Pokemon</div>`
    if(searching){
        loadMoreBtn.children[0].classList.add('d-none');
        checkbox.checked = false;
        checkbox.disabled = true;
    } 
    else{
        loadMoreBtn.children[0].classList.remove('d-none');
        checkbox.disabled = false; 
    }
}

/**
 * 
 * @param {string} statsTable div to render in
 */
function renderAboutStatHTML(statsTable) {
	statsTable.innerHTML = `
        <div class="statTitle">Abilities</div>
        <div class="statBody" id="abilities"></div>`;

	toTempArray(allPokemon[pokemonIndex]["abilities"], "ability", "name").forEach((e) => {
		document.getElementById('abilities').innerHTML += `<div class="statValue">${e}</div>`;
	});

	statsTable.innerHTML += `
        <div class="statTitle">Height</div>
        <div class="statBody" id="height"></div>`;

    document.getElementById('height').innerHTML = 
        `<div class="statValue">${(allPokemon[pokemonIndex]["height"] / 10).toFixed(2)} cm</div>`
        
        statsTable.innerHTML += ` 
        <div class="statTitle">Weight</div>
        <div class="statBody" id="weight"></div>`;

    document.getElementById('weight').innerHTML += 
        `<div class="statValue">${allPokemon[pokemonIndex]["weight"] / 10} kg</div>`

    statsTable.innerHTML +=`
        <div class="statTitle">Type</div>
        <div class="statBody" id="type"></div>`;

	toTempArray(allPokemon[pokemonIndex]["types"],"type","name").forEach((e) => {
        document.getElementById('type').innerHTML += `<div class="statValue">${e}</div>`;
	});
}

/**
 * 
 * @param {string} statsTable div to render in
 */
function renderBaseStatHTML(statsTable){
    // WARUM KEINE BALKEN WENN LEER? WIRD DOCH DANACH GEFÜLLT?!"
    chartLabel = [];
    chartData = [];
    statsTable.innerHTML = `<canvas id="myChart"></canvas>`

    for(let i=0; i<allPokemon[pokemonIndex]["baseStats"].length; i++){
        chartLabel.push(allPokemon[pokemonIndex]["baseStats"][i]['stat']['name']);
        chartData.push(allPokemon[pokemonIndex]["baseStats"][i]['base_stat']);
        // statsTable.innerHTML += /*html*/`
        //     <p><b>${allPokemon["baseStats"][pokemonIndex][i]['stat']['name']}:</b>
        //     ${allPokemon["baseStats"][pokemonIndex][i]['base_stat']}</p>`
    }
    // console.log(chartLabel, chartData);
    drawChart();
}

/**
 * 
 * @param {string} statsTable div to render in
 */
function renderMovesStatHTML(statsTable){
    let moves = allPokemon[pokemonIndex]["moves"];
    statsTable.innerHTML = `<div class="statBody" id="moves"></div>`
    for (let i=0; i<moves.length; i++){
        document.getElementById('moves').innerHTML += /*html*/`<div class="statValue moveStats">${firstLetterToUpperCase(moves[i]['move']['name'])}</div>`
    }
}
