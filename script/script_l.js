let responseAsJson;
let responseLenght = 0;
let pokemons = 0;
let renderedPokemonNumber = 1;
let responseLength = 0;
let pokemonAsJson;
let maxRender = 25;
let fetchPokemons = {
  name: [],
  id: [],
  img: [],
  type: [],
  ability: [],
  weight: [],
  height: [],
  stats: [],
  moves: [],
};


async function loadAPI() {
  addLoadingScreen();
  let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1400`;
  let response = await fetch(url);
  responseAsJson = await response.json();
  responseLength = responseAsJson["count"] - 289;
  const fetchPromises = [];
  fetchPromises.push(await init());
  await Promise.all(fetchPromises);
}


function addLoadingScreen() {
  document.getElementById("loading-screen").classList.remove("d-none");
  document.getElementById("body").classList.add("noscroll");
}


function removeLoadingScreen() {
  document.getElementById("loading-screen").classList.add("d-none");
  document.getElementById("body").classList.remove("noscroll");
}


async function init() {
  const batchSize = 100;
  
  for (let i = renderedPokemonNumber; i > responseLenght; i += batchSize) {
    const batchPromises = [];
    loadBatch(batchSize, batchPromises, i);
    await Promise.all(batchPromises);
    await new Promise((resolve) => setTimeout(resolve, 10));
    if (fetchPokemons["name"].length > 50) {
      renderPokemonFor();
    }
  }
}


function renderPokemonFor() {
  for (let i = renderedPokemonNumber; i < maxRender + 1; i++) {
    renderPokemon(i);
    renderedPokemonNumber++;
  }
  removeLoadingScreen();
  enableLoadMore();
}


function loadBatch(batchSize, batchPromises, i) {
  for (let j = 0; j < batchSize && i + j < responseLength; j++) {
    batchPromises.push(
      loadPokemon(responseAsJson["results"][i + j - 1], i + j - 1)
    );
  }
}


async function loadPokemon(index, i) {
  const pokemonUrl = await fetch(index.url);
  const pokemonAsJson = await pokemonUrl.json();
  const names = pokemonAsJson["name"];
  const imgs = await pokemonAsJson["sprites"]["front_default"];
  const types = await pokemonAsJson.types;
  fetchPokemons.name.push(names);
  fetchPokemons.id.push(i + 1);
  fetchPokemons.img.push(imgs);
  fetchPokemons.type.push(types);
  await loadPokeInfos(pokemonAsJson);
}


async function loadPokeInfos(pokemonAsJson) {
  const ability = pokemonAsJson["abilities"];
  const moves = pokemonAsJson["moves"];
  const weight = pokemonAsJson["weight"];
  const height = pokemonAsJson["height"];
  const stats = pokemonAsJson["stats"];
  fetchPokemons.ability.push(ability);
  fetchPokemons.weight.push(weight);
  fetchPokemons.height.push(height);
  fetchPokemons.stats.push(stats);
  fetchPokemons.moves.push(moves);
}


function loadMore() {
  addLoadingScreen();
  disableLoadMore();
  maxRender = maxRender + 50;
  if (maxRender < responseLength) {
    renderPokemonFor();
  } else if (maxRender >= responseLength) {
    maxRender = responseLenght;
    renderPokemonFor();
  }
}


function enableLoadMore() {
  document.getElementById("loadMoreBtn").classList.remove("no-click");
  document.getElementById("loadMoreBtn").innerHTML = "Load more Pokemon";
}


function disableLoadMore() {
  document.getElementById("loadMoreBtn").classList.add("no-click");
  document.getElementById("loadMoreBtn").innerHTML = "Please wait...";
}


function renderPokemon(i) {
  let pokemonIndex = fetchPokemons["id"].indexOf(i);
  let pokeName = fetchPokemons["name"][pokemonIndex].charAt(0).toUpperCase() + fetchPokemons["name"][pokemonIndex].slice(1);
  let pokeId = fetchPokemons["id"][pokemonIndex];
  let pokeTypes = fetchPokemons["type"][pokemonIndex];
  let pokeType = [];
  let pokeImg = fetchPokemons["img"][pokemonIndex];
  let color = fetchPokemons["type"][pokemonIndex][0]["type"]["name"];
  for (let j = 0; j < pokeTypes.length; j++) {
    let pokeTypeElement = pokeTypes[j]["type"]["name"];
    pokeType += cardPokeTypesSmall(pokeTypeElement, pokemonIndex, j);
  }
  document.getElementById("card-container").innerHTML += renderPokemonSmallCard(pokeId,pokeName,pokeType,pokeImg,pokemonIndex);
  document.getElementById(`pokeCard${i}`).classList.add(`box-shadow-${color}`);
}


function renderPokemonBig(i) {
  let pokemonIndex = fetchPokemons["id"].indexOf(i);
  let pokeName = fetchPokemons["name"][pokemonIndex].charAt(0).toUpperCase() + fetchPokemons["name"][pokemonIndex].slice(1);
  let pokeId = fetchPokemons["id"][pokemonIndex];
  let pokeTypes = fetchPokemons["type"][pokemonIndex];
  let pokeType = [];
  let pokeImg = fetchPokemons["img"][pokemonIndex];
  let color = fetchPokemons["type"][pokemonIndex][0]["type"]["name"];
  for (let j = 0; j < pokeTypes.length; j++) {
    let pokeTypeElement = pokeTypes[j]["type"]["name"];
    pokeType += cardPokeTypesBig(pokeTypeElement, i, j);
  }
  document.getElementById("big-Card").innerHTML = renderPokemonBigCard(pokeId,pokeImg,pokeName,pokeType,i);
  document.getElementById(`pokeCardBigColor${i}`).classList.add(`box-shadow-${color}`);
  document.getElementById("body").classList.add("noscroll");
  renderOverview(i);
}


function renderOverview(i) {
  let pokemonIndex = fetchPokemons["id"].indexOf(i);
  let height = fetchPokemons["height"][pokemonIndex] / 10;
  let weight = fetchPokemons["weight"][pokemonIndex] / 10;
  let abilities = fetchPokemons["ability"][pokemonIndex];
  let ability = [];
  for (let j = 0; j < abilities.length; j++) {
    let pokeAbilities = abilities[j]["ability"]["name"].charAt(0).toUpperCase() + abilities[j]["ability"]["name"].slice(1);
    ability += renderOverviewAbilities(pokeAbilities);
  }
  document.getElementById(`card-overview${i}`).innerHTML = "";
  document.getElementById(`card-overview${i}`).innerHTML = renderOverviewTab(height, weight, ability);
  toggleAbout();
}


function toggleAbout(){
  document.getElementById("about").classList.add("active");
  document.getElementById("stats").classList.remove("active");
  document.getElementById("moves").classList.remove("active");
}


function renderMoves(i) {
  let pokemonIndex = fetchPokemons["id"].indexOf(i);
  let moves = fetchPokemons["moves"][pokemonIndex];
  let move = [];

    for (let j = 0; j < 5; j++) {
      let pokeMove = moves[j]["move"]["name"].charAt(0).toUpperCase() + moves[j]["move"]["name"].slice(1);
      move += `<div class="moves-list"><img src="./img/pokeball.png" class="icon-big-card">${pokeMove}</div>`;
    }
  toggleMoves(i, move);
}


function toggleMoves(i, move){
    document.getElementById("moves").classList.add("active");
    document.getElementById("about").classList.remove("active");
    document.getElementById("stats").classList.remove("active");
    document.getElementById(`card-overview${i}`).innerHTML = "";
    document.getElementById(`card-overview${i}`).innerHTML = `<div class="card-moves">${move}</div>`;
    event.stopPropagation();
}


function renderStats(i) {
  renderChart(i);
}


function closeBigCard() {
  document.getElementById("pokeCardBig").classList.add("d-none");
  document.getElementById("container-big-background").classList.add("d-none");
  document.getElementById("container-big").classList.add("d-none");
  document.getElementById("body").classList.remove("noscroll");
}


function loadNextPokemon(i) {
  let newIndex = i + 1;
  if (newIndex >= responseLength - 1) {
    newIndex = 1;
    renderPokemonBig(newIndex);
  }
  renderPokemonBig(newIndex);
  event.stopPropagation();
}


function loadPrevPokemon(i) {
  let newIndex = i - 1;
  if (newIndex <= 0) {
    if (fetchPokemons["name"].length - 1 === responseLength - 2) {
      newIndex = responseLength - 2;
      renderPokemonBig(newIndex);
    } else {
      alert("Bitte warte noch einen kurzen Augenblick bis alle Pokemon geladen sind.");
    }
  } else if (newIndex > 0) {
    renderPokemonBig(newIndex);
  }
  event.stopPropagation();
}


function filterName() {
  let search = document.getElementById("searchName").value;
  search = search.toLowerCase();
  let list = document.getElementById("card-container");
  list.innerHTML = "";
  if (search.length === 0) {
    renderedPokemonNumber = 1;
    renderPokemonFor();
    document.getElementById("loadMoreBtn").classList.remove("d-none");
  } else {
    renderSearchName(search, list);
    document.getElementById("loadMoreBtn").classList.add("d-none");
  }
}


function renderSearchName(search, list) {
  for (let i = 0; i < fetchPokemons["name"].length; i++) {
    let name = fetchPokemons["name"][i];
    if (name.toLowerCase().startsWith(search)) renderSearchCard(i, list, name);
  }
}


function renderSearchCard(i, list, name) {
  let nameIndex = fetchPokemons["name"].indexOf(name);
  let pokeTypes = fetchPokemons["type"][nameIndex];
  let pokeType = [];
  let pokeId = fetchPokemons["id"][nameIndex];
  let pokeImg = fetchPokemons["img"][nameIndex];
  let color = fetchPokemons["type"][nameIndex][0]["type"]["name"];

  for (let j = 0; j < pokeTypes.length; j++) {
    let pokeTypeElement = pokeTypes[j]["type"]["name"];
    pokeType += cardPokeTypesSmallSearch(pokeTypeElement, nameIndex, j);
  }
  list.innerHTML += searchCardSmall(pokeId, pokeType, pokeImg, name);
  document.getElementById(`pokeCardSearch${pokeId}`).classList.add(`box-shadow-${color}`);
}


function cardPokeTypesSmallSearch(pokeTypeElement, i, j) {
  return /*html*/ `<div class='pokeType box-shadow-${pokeTypeElement}' id='color-type-big${i}${j}'>${pokeTypeElement}</div>`;
}