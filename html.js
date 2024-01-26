function renderPokemonSmallCardHTML(pokemon){
    return /*html*/ `<div class="card" onclick="loadPokemon('${pokemon['name']}')">${pokemon['name']}</div>`
}