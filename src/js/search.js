// ============In this file are just the functions for the search and search-reset functions================

// search function to look for a pokemon

function search() {

    let input = document.getElementById('search-input').value
    input = input.toLowerCase();
    console.log(input)

    for (let i = 1; i < pokemons2.length; i++) {
        let pokemon = pokemons2[i]['names']['5']['name'];
        pokemon = pokemon.toLowerCase()
        if (pokemon.includes(input)) {

            let number = pokemons2[i]['id']
            pokemoncounter = number
            render(number)
            resetCounter = 1
            break

        } else {
            let pokedex = document.getElementById('pokedex')

            pokedex.innerHTML = ''
            pokedex.innerHTML += `<h1>Pokemon nicht gefunden</h2>`
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
    pokemoncounter = 151
    document.getElementById('search-input').value = ''
    render(1)
    resetCounter = 0
}