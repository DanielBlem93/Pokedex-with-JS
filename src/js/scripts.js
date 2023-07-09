// ============In this file are small different functions===========

// enable/disable the loadingscreen

// fills the reiter in informationcard with color when active
function activeReiter(action1, action2, action3) {
    reiter1 = document.getElementsByClassName('reiter')[0]
    reiter2 = document.getElementsByClassName('reiter')[1]
    reiter3 = document.getElementsByClassName('reiter')[2]

    reiter1.classList[action1]('active-reiter')
    reiter2.classList[action2]('active-reiter')
    reiter3.classList[action3]('active-reiter')
}

// Handels the function to close and open the Information Card
function togglePopup(display) {
    let informationCard = document.getElementById('information-card')


    switch (display) {
        case 'none':
            informationCard.style.opacity = '0'
            setTimeout(() => {
                informationCard.style.display = `${display}`
                disableArrows()
            }, 300);
            break;

        case 'flex':

            informationCard.style.display = `${display}`
            setTimeout(() => {
                informationCard.style.opacity = '1'
                disableArrows()
            }, 100);
       
            break;
    }
   
}

function disableArrows() {
   
    let arrowRight = document.getElementById('right-arrow')
    let arrowLeft = document.getElementById('left-arrow')
    if (resetCounter == 1) {
        arrowLeft.style.display = 'none'
        arrowRight.style.display = 'none'
    } else if ( resetCounter == 0) {
        arrowLeft.style.display = 'unset'
        arrowRight.style.display = 'unset'
    }else{
        console.log('nothing')
    }
}

//   Avoid that the Popup closes when you click on it
function doNotClose(event) {
    event.stopPropagation()
}

// avoid scrolling while popup is open
function toggleNoScroll(action) {
    let body = document.getElementsByTagName('body')[0]
    body.classList[action]('noscroll')

}

function scrollToTop(){
    window.scrollTo({ top: 0 });
}
