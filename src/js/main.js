let currentPokemon;
let currentPokemon2;


// Initalise all functions onload 
function init() {
    render()
}
// renders the HTML cards
let pokemoncounter = 50
async function render() {

    pokedex.innerHTML = '';

    for (let i = 1; i < pokemoncounter; i++) {

        await loadPokemon(i)

        let pokedex = document.getElementById('pokedex')
        pokedex.innerHTML += /*html*/` 

        <div onclick="togglePopup('flex'), renderInformationCard(${i}),toggleNoScroll('add')" class="pokemon-card bg${i}">
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
    }
}
// Fills the HTML Cards with all basic Data
function renderMainData(i, j) {
    renderPokemonInfo(i, j)
    setElement(i, j)

}
// loads the data from the API, convert it to a jason and save it in currentpokemon
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

// Gives the Pokemoncard the Name, ID and the Image
async function renderPokemonInfo(i, j) {
    let id = document.getElementsByClassName(`pokemon-number${i}`)[j]
    let image = document.getElementsByClassName(`pokemon-img${i}`)[j]
    let name = document.getElementsByClassName(`pokemon-name${i}`)[j]

    id.innerHTML = currentPokemon.id
    image.src = currentPokemon['sprites']['other']['official-artwork']['front_default']
    name.innerHTML = currentPokemon2['names']['5']['name']
}

// Gives the Pokemon there Elements 
function setElement(i, j) {

    let element1 = document.getElementsByClassName(`element1${i}`)
    let element2 = document.getElementsByClassName(`element2${i}`)
    let type1 = currentPokemon['types'][0]['type']['name']
    let type2

    element1[j].innerHTML = type1

    if (currentPokemon['types'][1]) {
        type2 = currentPokemon['types'][1]['type']['name']
        element2[j].innerHTML = type2
    } else {
        element2[j].style.display = 'none'
    }
    changeBackgroundColor(i, j)
}

// Gives the Pokemon the right backgroundcolor based on there Element
function changeBackgroundColor(i, j) {
    let pokemonCard = document.getElementsByClassName(`bg${i}`)
    let mainElement = document.getElementsByClassName(`element1${i}`)[j].innerHTML
    let secondElement = document.getElementsByClassName(`element2${i}`)[j].innerHTML

    let element1 = document.getElementsByClassName(`element1${i}`)[j]
    let element2 = document.getElementsByClassName(`element2${i}`)[j]

    pokemonCard[j].classList.add(`${mainElement}`)
    element1.classList.add(`${mainElement}`)
    element2.classList.add(`${secondElement}`)
}

// All functions for the Popup Information Card

// Renders the HTML popup Informationcard
async function renderInformationCard(i) {

    let informationContainer = document.getElementById('information-container')
    informationContainer.innerHTML = "";
    informationContainer.innerHTML = /*html*/`

      
    <img onclick="togglePopup('none'), toggleNoScroll('remove')" id="close" src="src/img/close.png">
    <div id="info-container-header"></div>
    <div class="pokemon-info">
        <img id="background-img" src="src/img/Poké_Ball_icon.svg.png" alt="">
        <div class="left-side">
            
            <div class="basic-information">
                <div class="basic-infocard">
                    <p>#<span class="pokemon-number${i} numbers numbers-info">000</span></p>
                    <p class="pokemon-name${i} pokemon-names pokemon-names-info">Name</p>
                </div>  

                <div class="elements-infocard">
                    <div class="elements type-infocard element1${i}">Element1</div>
                    <div class="elements type-infocard element2${i}">Element2</div>
                </div>
      
            </div>
            
            <div class="image-frame-info bg${i}">
                    <img class="pokemon-img-style-info pokemon-img${i}" src="">
                </div>
        </div>
        <div class="right-side">
            <div class="reiter-container">
          <a href="#" class="reiter">Info</a>
          <a href="#" class="reiter">Details</a>
          <a href="#" class="reiter">Attribute</a>
            </div>
          <div class="content">
            <div style="display: unset;" class="description content-box" ></div>
            <div style="display: none;" class="details content-box"></div>
            <div style="display: none;" class="attribute content-box"></div>
          </div>
          
                </div>
        </div>
    </div>
    
`
    await loadPokemon(i)
    renderMainData(i, 1)
    loadDescriptions()
}

// loads the Description text for the Pokemon and add the HTML
async function loadDescriptions() {
    let description = currentPokemon2['flavor_text_entries']['25']['flavor_text']
    let content = document.getElementsByClassName('description')[0]

    content.innerHTML = ""
    content.innerHTML = description
}

// Handels the function to close and open the Information Card
function togglePopup(display) {
    let informationCard = document.getElementById('information-card')
    informationCard.style.display = `${display}`

}
//   Avoid that the Popup close when you click on it
function doNotClose(event) {
    event.stopPropagation()
}
// avoid scrolling while popup is open
function toggleNoScroll(action) {
    let body = document.getElementsByTagName('body')[0]
    body.classList[action]('noscroll')

}

