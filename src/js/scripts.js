// ============In this file are small different functions===========

// enable/disable the loadingscreen
function toggleLoading(action, scroll) {
    let animation = document.getElementById('loading-screen-container')
    animation.style.display = `${action}`
    toggleNoScroll(`${scroll}`)
}
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
    informationCard.style.display = `${display}`

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
