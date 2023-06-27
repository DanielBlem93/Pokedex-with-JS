let currentPokemon;

async function loadPokemon(){
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander'
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Das Pokemon ist', currentPokemon)
    renderPokemonInfo()
}

function renderPokemonInfo(){
document.getElementById('pokemon-name').innerHTML =currentPokemon['name']
document.getElementById('pokemon-img').src = currentPokemon['sprites']['other']['official-artwork']['front_default']
document.getElementById('pokemon-number').innerHTML = currentPokemon['id']
}