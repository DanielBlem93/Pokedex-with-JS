// ============In this file are just the functions for the search and search-reset functions================

// search function to look for a pokemon
let searchedPokemon = ['missingno']
function prepareSearching() {
    searchedPokemon = ['missingno']
    for (let i = 1; i < pokemons2.length; i++) {
        let pokemon = pokemons2[i]['names']['5']['name'];
        pokemon = pokemon.toLowerCase()
        searchedPokemon.push(pokemon)
    }
}

function search() {

    let input = document.getElementById('search-input').value
    let pokedex = document.getElementById('pokedex')
    input = input.toLowerCase();
    pokedex.innerHTML = ''

    for (let i = 1; i < searchedPokemon.length; i++) {

        pokemon = searchedPokemon[i].toLowerCase()

        if (pokemon.includes(input)) {

            pokedex.innerHTML += /*html*/` 
            <div  id="${i}" onclick="togglePopup('flex'), renderInformationCard(${i}),toggleNoScroll('add')" class="pokemon-card bg${i}">
                <div class="image-frame">
                    <img class="pokemon-img-style pokemon-img${i}" src="">
                </div>
                <div class="info-container">
                    <div class="info-box">
                        <div class="row">
                            <p>
                                <b>#</b><span class="pokemon-number${i} numbers"></span>
                            </p>
                            <div class="elements element1${i}" >Normal</div>
                        </div>
                        <div class="row">
                            <p class="pokemon-name${i} pokemon-names"></p>
                            <div class="elements element2${i}" >Pflanze</div> 
                        </div>
                    </div>
                </div>
            </div>`

            renderMainData(i, 0)
            resetCounter = 1

        }
    }
}
// eventlistener to execute the search function when pressing enter
document.getElementById('search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        search()
    }
});
// executes the search function on every keypress
document.getElementById('search-input').addEventListener('keyup', function (e) {
    reset()
});

// resets the search wenn every charakter is deleted from inputfield
function reset() {
    let input = document.getElementById('search-input').value
    if (input.length == 0 && resetCounter === 1) {
        clear()
    }
}
// reset the search wenn you click on the reset button
function resetOnClick() {
    let input = document.getElementById('search-input').value
    if (input.length >= 1) {
        clear()
    }
}
// emptys the input and re-render all pokemons
function clear() {
    pokemoncounter = currentPokemonCounter
    document.getElementById('search-input').value = ''
    render(1)
    resetCounter = 0
}