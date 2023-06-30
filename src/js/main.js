let currentPokemon;
let currentPokemon2;
let statData;
let pokemoncounter = 25
let searchCounter = 25
let pokemons = []
let resetCounter

// Initalise all functions onload 
function init() {
    render()
}
// renders the HTML cards


async function render(i) {

    pokedex.innerHTML = '';

    for (let i = 1; i < pokemoncounter; i++) {

        await loadPokemon(i)

        let pokedex = document.getElementById('pokedex')
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
    pokemons.push(currentPokemon2['names']['5']['name'])
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
          <a onclick="activateReiter('unset','none','none')" href="#${i}" class="reiter">Info</a>
          <a onclick="activateReiter('none','flex','none'),loadDetails()" href="#${i}" class="reiter">Details</a>
          <a onclick="activateReiter('none','none','unset'),generateChart()" href="#${i}" class="reiter">Attribute</a>
            </div>
          <div class="content">
            <div style="display: unset;" class="description content-box" >Beschreibung</div>
            <div  style="display: none;" class="details content-box">
                <div><p><b>Kategorie:</b></p> <p class="category"></p></div>
                <div><p><b>Größe:</b></p> <p class="size"></p></div>
                <div><p><b>Gewicht:</b></p> <p class="weight"></p></div>
          
            </div>
            <div style="display: none;" class="attribute content-box">
            <canvas id="myChart" width="400" height="400"></canvas>
            </div>
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
function loadDescriptions() {
    let description = currentPokemon2['flavor_text_entries']['25']['flavor_text']
    let content = document.getElementsByClassName('description')[0]

    content.innerHTML = ""
    content.innerHTML = description
}

function activateReiter(action1, action2, action3) {
    let description = document.getElementsByClassName('description')[0]
    let details = document.getElementsByClassName('details')[0]
    let attribute = document.getElementsByClassName('attribute')[0]

    description.style.display = `${action1}`
    description.style.display = `${action1}`
    details.style.display = `${action2}`
    attribute.style.display = `${action3}`
}

function loadDetails() {

    let pokemonType = currentPokemon2['genera']['4']['genus']
    let pokemonHeight = currentPokemon['height'] / 10 + "m"
    let pokemonWeight = currentPokemon['weight'] / 10 + "KG"

    let category = document.getElementsByClassName('category')[0]
    let size = document.getElementsByClassName('size')[0]
    let weight = document.getElementsByClassName('weight')[0]

    category.innerHTML = pokemonType
    size.innerHTML = pokemonHeight
    weight.innerHTML = pokemonWeight

}
function generateChart() {
    loadStats()

    let ctx = document.getElementById('myChart')
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Angriff', 'Verteidigung', 'Spezialangriff', 'KP', 'Spezialverteidigung', 'Geschwindigkeit'],
            datasets: [{
                label: 'Basiswerte',
                data: statData,
                borderWidth: 1,
                backgroundColor: [
                    'rgba(255, 0, 0, 0.3)',
                    'rgba(17, 0, 255, 0.3)',
                    'rgba(0, 238, 255, 0.3)',
                    'rgba(0, 255, 13, 0.25)',
                    'rgba(212, 0, 255, 0.3)',
                    'rgba(255, 174, 0, 0.3)',
                ],
                borderColor: [
                    'rgba(255, 0, 0, 0.8)',
                    'rgba(17, 0, 255, 0.8)',
                    'rgba(0, 238, 255, 0.8)',
                    'rgba(0, 255, 13, 1)',
                    'rgba(212, 0, 255, 0.8)',
                    'rgba(255, 174, 0, 0.8)',
                ]
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function loadStats() {

    let hp = currentPokemon['stats']['0']['base_stat']
    let atk = currentPokemon['stats']['1']['base_stat']
    let def = currentPokemon['stats']['2']['base_stat']
    let spezialAtk = currentPokemon['stats']['3']['base_stat']
    let spezialDef = currentPokemon['stats']['4']['base_stat']
    let speed = currentPokemon['stats']['5']['base_stat']

    statData = [hp, atk, def, spezialAtk, spezialDef, speed]

}

function search() {

    let input = document.getElementById('search-input').value
    input = input;
    console.log(input)


    for (let i = 0; i < pokemons.length; i++) {
        let pokemon = pokemons[i];

        if (pokemon.includes(input)) {
            let number = pokemons.indexOf(input)
            number++
            pokemoncounter = 2
            render()
            loadPokemon(number)

            console.log('match')
            break

        } else {
            console.log('nomatch')
        }

    }
    resetCounter = 1

}
document.getElementById('search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        search()
    }
});
document.getElementById('search-input').addEventListener('keyup', function (e) {
    console.log('Here we go', e)
    let input = document.getElementById('search-input').value
    if (input.length == 0 && resetCounter == 1) {
        reset()
        resetCounter = 0
    }
});

async function reset() {
    pokemoncounter = searchCounter

    render()
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