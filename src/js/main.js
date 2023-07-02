let currentPokemon;
let currentPokemon2;
let statData;
let pokemoncounter = 20
let pokemons1 = ['MissingNo']
let pokemons2 = ['MissingNo']
let resetCounter = 0

// Initalise all functions onload 
function init() {
    render(1)
    toggleLoading('flex', 'add')

}
// renders the HTML cards


async function render(start) {

    pokedex.innerHTML = '';

    for (let i = start; i <= pokemoncounter; i++) {

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
        loadingProgress(i)
    }
    toggleLoading('none', 'remove')

}


function loadingProgress(i) {
    let load = document.getElementById('load')
    let loaded = document.getElementById('loaded')

    load.innerHTML = i
    loaded.innerHTML = pokemoncounter
}

// Fills the HTML Cards with all basic Data
function renderMainData(i, j) {
    renderPokemonInfo(i, j)
    setElement(i, j)
    changeBackgroundColor(i, j)
    translateToGerman()

}
// loads the data from the API, convert it to a jason and save it in currentpokemon
async function loadPokemon(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`
    let url2 = `https://pokeapi.co/api/v2/pokemon-species/${i} `
    let response = await fetch(url);
    let response2 = await fetch(url2);

    currentPokemon = await response.json();
    currentPokemon2 = await response2.json();
    pokemons1.push(currentPokemon)
    pokemons2.push(currentPokemon2)
    console.log('Das Pokemon ist', currentPokemon)
    console.log('Siehe da:', currentPokemon2)
    console.log(pokemons1, pokemons2)

}


// Gives the Pokemoncard the Name, ID and the Image
async function renderPokemonInfo(i, j) {

    let id = document.getElementsByClassName(`pokemon-number${i}`)[j]
    let image = document.getElementsByClassName(`pokemon-img${i}`)[j]
    let name = document.getElementsByClassName(`pokemon-name${i}`)[j]

    id.innerHTML = pokemons1[i]['id']
    image.src = pokemons1[i]['sprites']['other']['official-artwork']['front_default']
    name.innerHTML = pokemons2[i]['names']['5']['name']
}

// Gives the Pokemon there Elements 
function setElement(i, j) {

    let element1 = document.getElementsByClassName(`element1${i}`)
    let element2 = document.getElementsByClassName(`element2${i}`)
    let type1 = pokemons1[i]['types'][0]['type']['name']
    let type2

    element1[j].innerHTML = type1

    if (pokemons1[i]['types'][1]) {
        type2 = pokemons1[i]['types'][1]['type']['name']
        element2[j].innerHTML = type2
    } else {
        element2[j].style.display = 'none'
    }


}


function translateToGerman() {
    let elements = document.getElementsByClassName(`elements`)


    for (let i = 0; i < elements.length; i++) {

        switch (elements[i].innerHTML) {
            case "grass":
                elements[i].innerHTML = 'Pflanze'
                break;

            case "poison":
                elements[i].innerHTML = 'Gift'
                break;

            case "water":
                elements[i].innerHTML = 'Wasser'
                break;

            case "bug":
                elements[i].innerHTML = 'Käfer'
                break;

            case "flying":
                elements[i].innerHTML = 'Flug'
                break;

            case "fire":
                elements[i].innerHTML = 'Feuer'
                break;
            case "electric":
                elements[i].innerHTML = 'Elektro'
                break;
            case "ground":
                elements[i].innerHTML = 'Boden'
                break;
            case "fairy":
                elements[i].innerHTML = 'Fee'
                break;
            case "fighting":
                elements[i].innerHTML = 'Kampf'
                break;
            case "psychic":
                elements[i].innerHTML = 'Psycho'
                break;
            case "rock":
                elements[i].innerHTML = 'Gestein'
                break;
            case "steel":
                elements[i].innerHTML = 'Stahl'
                break;
            case "ice":
                elements[i].innerHTML = 'Eis'
                break;
            case "ghost":
                elements[i].innerHTML = 'Geist'
                break;
            case "dragon":
                elements[i].innerHTML = 'Drachen'
                break;
        }
    }
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
                <a onclick="activateReiter('unset','none','none'), activeReiter('add','remove','remove') " href="#${i}" class="reiter">Info</a>
                <a onclick="activateReiter('none','flex','none'),loadDetails(${i}),activeReiter('remove','add','remove')" href="#${i}" class="reiter">Details</a>
                <a onclick="activateReiter('none','none','unset'),generateChart(${i}),activeReiter('remove','remove','add')" href="#${i}" class="reiter">Attribute</a>
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
`
    await loadPokemon(i)
    renderMainData(i, 1)
    loadDescriptions(i)
    presetReiter()
}

// loads the Description text for the Pokemon and add the HTML
function loadDescriptions(i) {
    let description = pokemons2[i]['flavor_text_entries']['25']['flavor_text']
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

function loadDetails(i) {

    let pokemonType = pokemons2[i]['genera']['4']['genus']
    let pokemonHeight = pokemons1[i]['height'] / 10 + "m"
    let pokemonWeight = pokemons1[i]['weight'] / 10 + "KG"

    let category = document.getElementsByClassName('category')[0]
    let size = document.getElementsByClassName('size')[0]
    let weight = document.getElementsByClassName('weight')[0]

    category.innerHTML = pokemonType
    size.innerHTML = pokemonHeight
    weight.innerHTML = pokemonWeight

}

let myChart = null
function generateChart(i) {
    loadStats(i)


    if (myChart != null) {
        
        myChart.destroy()
        myChart=null
        generateChart(i)


    } else {
        let ctx = document.getElementById('myChart').getContext('2d')

        myChart = new Chart(ctx, {
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

        ctx = myChart
    }
}
async function clearCanvas() {
    let ctx = document.getElementById('myChart')

    const context = await ctx.getContext('2d');
    await context.clearRect(0, 0, ctx.width, ctx.height);
}

function loadStats(i) {

    let hp = pokemons1[i]['stats']['0']['base_stat']
    let atk = pokemons1[i]['stats']['1']['base_stat']
    let def = pokemons1[i]['stats']['2']['base_stat']
    let spezialAtk = pokemons1[i]['stats']['3']['base_stat']
    let spezialDef = pokemons1[i]['stats']['4']['base_stat']
    let speed = pokemons1[i]['stats']['5']['base_stat']

    statData = [hp, atk, def, spezialAtk, spezialDef, speed]

}

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
document.getElementById('search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        search()
    }
});
document.getElementById('search-input').addEventListener('keyup', function (e) {
    reset()
});

function reset() {
    let input = document.getElementById('search-input').value
    if (input.length == 0 && resetCounter === 1) {
        clear()
    }
}

function resetOnClick() {
    let input = document.getElementById('search-input').value
    if (input.length >= 1) {
        clear()
    }
}

function clear() {
    pokemoncounter = 151
    document.getElementById('search-input').value = ''
    render(1)
    resetCounter = 0
}

function counter(c) {
    resetCounter = c
    document.getElementById('search-input').value = ''
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

function toggleLoading(action, scroll) {
    let animation = document.getElementById('loading-screen-container')
    animation.style.display = `${action}`
    toggleNoScroll(`${scroll}`)
}

function activeReiter(action1, action2, action3) {
    reiter1 = document.getElementsByClassName('reiter')[0]
    reiter2 = document.getElementsByClassName('reiter')[1]
    reiter3 = document.getElementsByClassName('reiter')[2]

    reiter1.classList[action1]('active-reiter')
    reiter2.classList[action2]('active-reiter')
    reiter3.classList[action3]('active-reiter')
}

function presetReiter() {
    reiter1 = document.getElementsByClassName('reiter')[0]
    reiter1.classList.add('active-reiter')
}