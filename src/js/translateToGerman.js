// ============In this file are many different functions

// translates the elements to german

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
