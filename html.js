function renderPokemonSmallCardHTML(pokemon){
    return /*html*/ `<div class="card" onclick="loadPokemon('${pokemon['name']}')">${pokemon['name']}</div>`
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

function renderPokemonSmallCardHTML(i){
    return /*html*/`<div class="card" onclick="loadPokemon('${i+1}')">${firstLetterToUpperCase(allPokemon[i]['name'])}</div>`

}