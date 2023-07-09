// ======= In this file are all main-functions to render the Pokemoncards==========

let currentPokemon;
let currentPokemon2;
let currentPokemon3
let statData;
let pokemoncounter = 151
let pokemons1 = ['MissingNo']
let pokemons2 = ['MissingNo']
let urls = ['MissingNo']

let resetCounter = 0

// Initalise all functions onload 
async function init() {
    scrollToTop()
    toggleLoading('flex', 'add', 'none')
    await render(1)
    setTimeout(() => {
        toggleLoading('none', 'remove', 'flex')
    }, 5000);
    prepareSearching()
}

// renders the HTML cards
async function render(start) {
    clearArrays()

    setTimeout(() => {
        toggleLoading('none', 'remove', 'flex')
    }, 5000);

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

    }
    setTimeout(() => {
        toggleLoading('none', 'remove', 'none')
    }, 5100);

}
// counts how many pokemons are loaded in lodingscreen
function loadingProgress(i) {
    let load = document.getElementById('load')
    let loaded = document.getElementById('loaded')
    let load2 = document.getElementById('load2')
    let loaded2 = document.getElementById('loaded2')

    load.innerHTML = i
    loaded.innerHTML = pokemoncounter

    load2.innerHTML = i
    loaded2.innerHTML = pokemoncounter
}
// open/close loadingscreen and loadinginfo 
function toggleLoading(action, scroll, action2) {

    let animation = document.getElementById('loading-screen-container')
    let miniLoading = document.getElementById('loading-mini-screen')

    animation.style.display = `${action}`


    if (action2 == undefined) {
        console.log('nothing')
    } else {
        miniLoading.style.display = `${action2}`
    }

    toggleNoScroll(`${scroll}`)
}

// activates all necessary functions and render all needing datas
function renderMainData(i, j) {
    loadingProgress(i)
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

//=============== All functions for the Popup Information Card =====================

// Renders the HTML popup Informationcard
async function renderInformationCard(i) {

    let informationCard = document.getElementById('information-card')

    informationCard.innerHTML = "";
    informationCard.innerHTML = /*html*/`
        <img onclick="doNotClose(event),nextPokemon(${i},'up')" id="right-arrow" class="arrow" src="src/img/icons/icons8-arrow-80.png" alt="">
        <img onclick="doNotClose(event),nextPokemon(${i},'down')" id="left-arrow" class="arrow" src="src/img/icons/icons8-arrow-80.png" alt=""> 
       <div onclick="doNotClose(event)" id="information-container">
        
        <img onclick="togglePopup('none'), toggleNoScroll('remove')" id="close" src="src/img/icons/close.png">
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
                    <div style="display: unset;" class="description content-box" >Lädt</div>
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
    
     `

    await loadPokemon(i)
    renderMainData(i, 1)
    loadDescriptions(i)
    activeReiter('add', 'remove', 'remove')
}

// loads the Description text for the Pokemon and add the HTML
function loadDescriptions(i) {
    let description = '';
    let entries = pokemons2[i]['flavor_text_entries'];
    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        if (entry.language.name == 'de') {
            description = entry.flavor_text;
        }
    }

    let content = document.getElementsByClassName('description')[0]

    content.innerHTML = ""
    content.innerHTML = description
}


// shows the content depens on the link you click
function activateReiter(action1, action2, action3) {
    let description = document.getElementsByClassName('description')[0]
    let details = document.getElementsByClassName('details')[0]
    let attribute = document.getElementsByClassName('attribute')[0]

    description.style.display = `${action1}`
    description.style.display = `${action1}`
    details.style.display = `${action2}`
    attribute.style.display = `${action3}`
}

// loads an calculates some deatails for each pokemon
function loadDetails(i) {

    let pokemonType = pokemons2[i]['genera']['4']['genus']
    let pokemonHeight = pokemons1[i]['height'] / 10 + "m"
    let pokemonWeight = pokemons1[i]['weight'] / 10 + "Kg"

    let category = document.getElementsByClassName('category')[0]
    let size = document.getElementsByClassName('size')[0]
    let weight = document.getElementsByClassName('weight')[0]

    category.innerHTML = pokemonType
    size.innerHTML = pokemonHeight
    weight.innerHTML = pokemonWeight

}

// generates a chart for all five stats 
let myChart = null
function generateChart(i) {
    loadStats(i)

    if (myChart != null) {

        myChart.destroy()
        myChart = null
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
                maintainAspectRatio: false,
                responsive: true,
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
// load the stats for the current pokemon and saves it in a array
function loadStats(i) {

    let hp = pokemons1[i]['stats']['0']['base_stat']
    let atk = pokemons1[i]['stats']['1']['base_stat']
    let def = pokemons1[i]['stats']['2']['base_stat']
    let spezialAtk = pokemons1[i]['stats']['3']['base_stat']
    let spezialDef = pokemons1[i]['stats']['4']['base_stat']
    let speed = pokemons1[i]['stats']['5']['base_stat']

    statData = [hp, atk, def, spezialAtk, spezialDef, speed]
}
// shwos next pokemon on click
function nextPokemon(i, action) {

    switch (action) {
        case 'up':
            i++
            break;
        case 'down':
            i--
            break
    }

    if (i == 0) {
        i = 151
    } else if (i == 152) {
        i = 1
    }

    renderInformationCard(i)

}

