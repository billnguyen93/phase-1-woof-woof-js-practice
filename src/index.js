const dogUrl = "http://localhost:3000/pups"

// DOM Selectors

const dogBar = document.querySelector("#dog-bar")
const infoDiv = document.querySelector("#dog-info")
const filterBtn = document.querySelector('#good-dog-filter')
    
// fetch Requests

function getDogs() {
    fetch(dogUrl)
    .then(resp => resp.json())
    .then(data => renderAllInBar(data))
}
    
// Rendering

function renderAllInBar(dogsArr) {
    
    dogsArr.forEach(addOneDogToBar)
}

function addOneDogToBar(dogObj) {
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dogObj.name
    dogSpan.dataset.id = dogObj.id
    dogSpan.addEventListener("click", handleSpanClick)
    dogBar.append(dogSpan)
}

function getOneDog(id) {
   return fetch(dogUrl + `/${id}`)
    .then(resp => resp.json())
    
}

function showOneDog(dogObj) {
    
    infoDiv.innerHTML = ''
    const dogDiv = document.createElement('div')
    dogDiv.innerHTML =
    `<img src = ${dogObj.image}>
    <h2>${dogObj.name}</h2>`
    const pupBtn = document.createElement('button')
    pupBtn.textContent = (dogObj.isGoodDog) ? "Good Dog" : "Bad Dog"
    pupBtn.addEventListener('click', () => togglePupButton(pupBtn))
    infoDiv.append(dogDiv, pupBtn)
}

// Event Handlers

function handleSpanClick(event) {
    const id = event.target.dataset.id
    getOneDog(id).then(showOneDog)
}

function togglePupButton(pupButton) {
    pupButton.textContent = pupButton.textContent.includes("Good") ? "Bad Dog" : "Good Dog"
} 

//Initialize

getDogs()

