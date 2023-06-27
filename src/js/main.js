let currentPokemon;
let currentPokemon2;

async function render() {


    pokedex.innerHTML = '';

     for (let i = 1; i < 12; i++) {

        await loadPokemon(i)

        let pokedex = document.getElementById('pokedex')

        pokedex.innerHTML += /*html*/` 

        <div class="pokemon-card">
            <div class="image-frame">
                <img class="pokemon-img-style" id="pokemon-img${i}" src="">
            </div>
    
            <div class="info-container">
                <div class="info-box">
                    <div class="row">
                        <p class="pokemon-name${i} pokemon-names"></p>
                        <div class="elements element1${i}" >Normal</div>
                    </div>
                    <div class="row">
                        <p>
                            # <span class="pokemon-number${i}"></span>
                        </p>
                    <div class="elements element2${i}" >Pflanze</div>
                    
                </div>
            </div>

        </div>`
        renderPokemonInfo(i)
    }
}



async function loadPokemon(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`
    let url2 = `https://pokeapi.co/api/v2/pokemon-species/${i} `
    let response = await fetch(url);
    let response2 = await fetch(url2);

    currentPokemon = await response.json();
    currentPokemon2 = await response2.json();
    console.log('Das Pokemon ist', currentPokemon)
    console.log('Siehe da:', currentPokemon2)

}

async function renderPokemonInfo(i) {
    let id = document.getElementsByClassName(`pokemon-number${i}`)[0]
    let image = document.getElementById(`pokemon-img${i}`)
    let name = document.getElementsByClassName(`pokemon-name${i}`)[0]
    

    id.innerHTML =  currentPokemon.id
    image.src =  currentPokemon['sprites']['other']['official-artwork']['front_default']
    name.innerHTML =  currentPokemon2['names']['5']['name']
    

}






// async function renderPokemonInfo(i) {
//     let id = document.getElementsByClassName(`pokemon-number${i}`)[0]
//     let image = document.getElementById(`pokemon-img${i}`)
//     let name = document.getElementsByClassName(`pokemon-name${i}`)[0]let
//  
//      let color = currentPokemon2['color']['name']
        // let text = currentPokemon2['flavor_text_entries']['25']['flavor_text']
//     id.innerHTML =  currentPokemon.id
//     image.src =  currentPokemon['sprites']['other']['official-artwork']['front_default']
//     name.innerHTML =  currentPokemon2['names']['5']['name']

    

// }
 