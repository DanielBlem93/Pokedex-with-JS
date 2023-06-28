let currentPokemon;
let currentPokemon2;

function init(){
    render()
}

async function render() {
    pokedex.innerHTML = '';

     for (let i = 1; i < 50; i++) {

        await loadPokemon(i)

        let pokedex = document.getElementById('pokedex')

        pokedex.innerHTML += /*html*/` 

        <div onclick="openPopup()" class="pokemon-card bg${i}">
            <div class="image-frame">
                <img class="pokemon-img-style" id="pokemon-img${i}" src="">
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
            <div class="backside"></div>
        </div>`
        renderMainData(i)
    }
    addInformationCard()
}

function addInformationCard(){
    let body = document.getElementsByTagName('body')[0]
    body += /*html*/`
        <div onclick="closePopup()" id="information-card" style="display: none;">
            <div id="information-container">
            </div>
        </div>
    `
}

function renderMainData(i){
    renderPokemonInfo(i)
    setElement(i)
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

function setElement(i){

    let element1 = document.getElementsByClassName(`element1${i}`)
    let element2 = document.getElementsByClassName(`element2${i}`)
    let type1 =  currentPokemon['types'][0]['type']['name']
    let type2

    element1[0].innerHTML = type1

    if(currentPokemon['types'][1]){
        type2 = currentPokemon['types'][1]['type']['name']
        element2[0].innerHTML = type2
    }else{
        element2[0].style.display = 'none'
    }
  changeBackgroundColor(i)
}

function changeBackgroundColor(i){
    let pokemonCard = document.getElementsByClassName(`bg${i}`)
    let mainElement = document.getElementsByClassName(`element1${i}`)[0].innerHTML
    let secondElement = document.getElementsByClassName(`element2${i}`)[0].innerHTML
    
    let element1= document.getElementsByClassName(`element1${i}`)[0]
    let element2= document.getElementsByClassName(`element2${i}`)[0]

    pokemonCard[0].classList.add(`${mainElement}`) 
    element1.classList.add(`${mainElement}`) 
    element2.classList.add(`${secondElement}`) 

}
    
function openPopup(){
    let informationCard = document.getElementById('information-card')
    informationCard.style.display = 'flex'
}
function closePopup(){
    let informationCard = document.getElementById('information-card')
    informationCard.style.display = 'none'
}

function doNotClose(event){
event.stopPropagation()
}






// 'normal' 'grass' 'poisen' 'fire' 
// 'flying' 'water' 'bug' 'electric' 'ground' 'fairy' 
// 'fighting' 'psychic' 'rock' 'steel' 'ice' 'ghost' 'dragon'

// function changeBgColor(i, color){
// let pokemonCard = document.getElementsByClassName(`bg${i}`)[0];
// pokemonCard.classList.add('')
// }


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
 

 // switch (element) {
    //     case 'normal':
    //         pokemonCard[0].classList.add('normal');
    //         break;
    //     case 'grass':
    //         pokemonCard[0].classList.add('grass');
    //         break;
    //     case 'poison':
    //         pokemonCard[0].classList.add('poison');
    //         break;
    //     case 'fire':
    //         pokemonCard[0].classList.add('fire');
    //         break;
    //     case 'flying':
    //         pokemonCard[0].classList.add('flight');
    //         break;
    //     case 'water':
    //         pokemonCard[0].classList.add('water');
    //         break;
    //     case 'bug':
    //         pokemonCard[0].classList.add('bug');
    //         break;
    //     case 'electric':
    //         pokemonCard[0].classList.add('electric');
    //         break;
    //     case 'ground':
    //         pokemonCard[0].classList.add('ground');
    //         break;
    //     case 'fairy':
    //         pokemonCard[0].classList.add('fairy');
    //         break;
    //     case 'fighting':
    //         pokemonCard[0].classList.add('fighting');
    //         break;
    //     case 'psychic':
    //         pokemonCard[0].classList.add('psychic');
    //         break;
    //     case 'rock':
    //         pokemonCard[0].classList.add('ground');
    //         break;
    //     case 'steel':
    //         pokemonCard[0].classList.add('steel');
    //         break;
    //     case 'ice':
    //         pokemonCard[0].classList.add('ice');
    //         break;
    //     case 'ghost':
    //         pokemonCard[0].classList.add('ghost');
    //         break;
    //     case 'dragon':
    //         pokemonCard[0].classList.add('dragon');
    //         break;
    // }