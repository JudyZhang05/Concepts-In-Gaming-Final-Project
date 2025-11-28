// declaring variables
const memorize = document.querySelector('.memorize')
const memTimer = document.querySelector('#memTimer')
const playTimer = document.querySelector('#playTimer')
const gameOver = document.querySelector('.gameOver')
const organizeList = document.querySelector('#organizeList')
const readyButton = document.querySelector('.readyButton')
let newList = {}
let placeKeys
let correctChoice
const gameObject = document.querySelector('.gameObject')
const gameOption = document.querySelector('.gameOption')
let totalPlayTime = 0
let remSec = 30
let playMin = 1
let playSec = 0
// difficulty level: easy = 2 items , intermediate = 4 items, hard = 6 items
let difficulty = 2

// Sam's pages
const startScreen = document.querySelector('.startScreen')

// declaring dictionary objects
const allMessyObjects = {'pen':'test','brush':'test','trash':'test','stickers':'test','photo':'test', 'clip':'test'}
const allMessyKeys = Object.keys(allMessyObjects)
const allPlaces = {'drawer':'test','trash-can':'test','bag':'test','book':'test','binder':'test', 'cup':'test'}
const allPlacesKeys = Object.keys(allPlaces)

// generate new list
let newGame = () => {
    newList = {}
    playTimer.style.display = 'block'
    organizeList.textContent = ''
    for (let match = 0; match < difficulty; match++){
        let thisPlace = allPlacesKeys[Math.floor(Math.random() * 6)]
        let thisObject = allMessyKeys[Math.floor(Math.random() * 6)]
        // ensure that there is no duplicated objects and places
        if(`${thisPlace}` in newList || Object.values(newList).includes(thisObject)){
            difficulty++
        }else{
            newList[`${thisPlace}`] = thisObject
            organizeList.innerHTML += `${thisObject} in ${thisPlace}<br>`
        }
    }
    if(totalPlayTime < 120){
        difficulty = 2
    }else if(totalPlayTime >= 120){
        difficulty = 4
    }else if(totalPlayTime >= 180){
        difficulty = 6
    }
    placeKeys = Object.keys(newList)
}

// skip 30sec memorization
readyButton.addEventListener('click', () => {
    memorize.style.display = 'none'
})

// play time responds to user's actions accordingly
const changePlayTime = (gameResponse) => {
    let currentSec = playSec
    if (gameResponse == 0){
        if(playSec + 5 >= 60){
            playMin++
            playSec = 60 - currentSec
        }else{
            playSec+=5
        }
    }else{
        if(playMin - 1 >= 0 && playSec - 5 <= 0){
            playMin--
            playSec = 60 - (5 - currentSec)
        }else if(playMin - 1 == 0 && playSec - 5 <= 0){
            playSec = 0
        }else{
            playSec-=5
        }
    }
    playTimer.textContent = `${playMin}:${String(playSec).padStart(2, '0')}`
}


const getItems = () => {
    gameObject.innerHTML = ''
    console.log(difficulty)
    let rando = Math.floor(Math.random() * difficulty)
    correctChoice = newList[`${placeKeys[rando]}`]

    // objects images    
    let placeDiv2 = document.createElement('div')
    let imgEl2 = document.createElement('img')
    let imgP2 = document.createElement('p')
    imgEl2.src = `./assets/${allPlaces[`${placeKeys[rando]}`]}.svg`
    imgEl2.style.width = '100px'
    imgP2.textContent = newList[`${placeKeys[rando]}`]

    placeDiv2.appendChild(imgEl2)
    placeDiv2.appendChild(imgP2)
    gameObject.appendChild(placeDiv2)
}


const getGameChoices = () => {
    gameOption.innerHTML = ''
    for(let item of placeKeys){

        // places images
        let placeDiv = document.createElement('div')
        let imgEl = document.createElement('img')
        let imgP = document.createElement('p')
        imgEl.src = `./assets/${allPlaces[`${item}`]}.svg`
        imgEl.style.width = '100px'
        imgEl.classList.add(item)
        imgP.textContent = item

        placeDiv.appendChild(imgEl)
        placeDiv.appendChild(imgP)
        gameOption.appendChild(placeDiv)
    }
}

// start game timer(s) when user press play
if(startScreen.style.display = 'none'){
    newGame()
    getItems()
    getGameChoices()
    setInterval(() => {
        if(memorize.style.display == 'none'){
            totalPlayTime++
            console.log(totalPlayTime)
            if(totalPlayTime%120 == 0){
                if(totalPlayTime >= 180){
                    difficulty = 6
                }else if(totalPlayTime == 120){
                    difficulty = 4
                }
                newGame()
                getItems()
                getGameChoices()
                remSec = 30
                memorize.style.display = 'block'
            }
            playTimer.textContent = `${playMin}:${String(playSec).padStart(2, '0')}`
            if(playSec <= 0){
                if(playMin > 0){
                    playSec = 59
                    playMin--
                }else{
                    playTimer.style.display = 'none'
                    gameOver.style.display = 'block'
                }
            }else{
                playSec--
            }
        }else{
            memTimer.textContent = `0:${String(remSec).padStart(2, '0')}`
            remSec--
            if(memTimer.textContent == '0:00'){
                memorize.style.display = 'none'
            }
        }
    }, 1000)
}

// game responds after user action
gameOption.addEventListener('click', (e) => {
    if(e.target.src != undefined){
        // if choice is correct
        if(newList[`${e.target.classList[0]}`] == correctChoice){
            changePlayTime(0)
        }else{ // if choice is wrong
            changePlayTime(1)
        }
        getItems()
        getGameChoices()
    }

})
