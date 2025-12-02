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
let playerScore = 0
const gamePlay = document.querySelector('.gamePlay')
const gameObject = document.querySelector('.gameObject')
const gameOption = document.querySelector('.gameOption')
let totalPlayTime = 0
let remSec = 30
let playMin = 1
let playSec = 0
// difficulty level: easy = 2 items , intermediate = 4 items, hard = 6 items
let difficulty = 2
const showAdd = document.querySelector('.showAdd')
const showMinus = document.querySelector('.showMinus')

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
            organizeList.innerHTML += `${thisObject} in ${thisPlace}<br><br>`
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
    // console.log(difficulty)
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

newGame()
getItems()
getGameChoices()
setInterval(() => {
    if(startScreen.style.display == 'none' && gameOver.style.display == 'none'){
        if(memorize.style.display == 'none'){
            gamePlay.style.display = 'flex'
            totalPlayTime++
            if(totalPlayTime%120 == 0){
                if(totalPlayTime >= 180){
                    difficulty = 6
                }else if(totalPlayTime == 120){
                    difficulty = 4
                }
                gamePlay.style.display = 'none'
                remSec = 30
                memorize.style.display = 'flex'
                newGame()
                getItems()
                getGameChoices()
            }
            playTimer.textContent = `${playMin}:${String(playSec).padStart(2, '0')}`
            if(playSec <= 0){
                if(playMin > 0){
                    playSec = 59
                    playMin--
                }else{
                    gamePlay.style.display = 'none'
                    getScore()
                    gameOver.style.display = 'flex'
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
            gamePlay.style.display = 'none'
        }
    }
}, 1000)

// game responds after user action
gameOption.addEventListener('click', (e) => {
    if(e.target.src != undefined){
        // if choice is correct
        if(newList[`${e.target.classList[0]}`] == correctChoice){
            changePlayTime(0)
            playerScore+=1
            showAdd.style.visibility = 'visible'
            setTimeout(() => {
                showAdd.style.visibility = 'hidden'
            }, 800)
        }else{ // if choice is wrong
            changePlayTime(1)
            showMinus.style.visibility = 'visible'
            setTimeout(() => {
                showMinus.style.visibility = 'hidden'
            }, 800)
        }
        getItems()
        getGameChoices()
    }

})

const startBtn = document.querySelector('#start')
const startTrick = document.querySelector('#startTrick')
startBtn.addEventListener('click', () => {
    startScreen.style.display = 'none'
    gameOver.style.display = 'none'
    memorize.style.display = 'flex'
})
startTrick.addEventListener('click', () => {
    startTrick.style.display = 'none'
    alert('yes, stop asking questions.')
})


// Sam's code
function getScore(){
    document.getElementById("score-value").textContent = playerScore;

    const message = document.getElementById("result-message");
    if (playerScore >= 80) {
        message.textContent = "PRESTIGE UNLOCKED: You are... The Cleaner!";
    } else if (playerScore >= 50) {
        message.textContent = "Not bad... but there's still grime.";
    } else {
        message.textContent = "WOW! Did you even try?";
    }
}


function runAgain() {
    window.location.href = "index.html"; // or restart game logic
}

    // Get a reference to your audio element
    const backgroundMusic = document.getElementById('background-music');

    // Function to unmute the music
    function unmuteMusic() {
        if (backgroundMusic.muted) {
            backgroundMusic.muted = false;
            // Optional: You can remove the listener so it only happens once
            document.body.removeEventListener('click', unmuteMusic);
            document.body.removeEventListener('touchstart', unmuteMusic);
        }
    }

    // Add event listeners for user interactions (click and tap)
    document.body.addEventListener('click', unmuteMusic);
    document.body.addEventListener('touchstart', unmuteMusic); // For mobile devices
