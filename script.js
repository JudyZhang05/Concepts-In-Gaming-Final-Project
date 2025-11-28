// declaring variables
const memorize = document.querySelector('.memorize')
const memTimer = document.querySelector('#memTimer')
const playTimer = document.querySelector('#playTimer')
const gameOver = document.querySelector('.gameOver')
const organizeList = document.querySelector('#organizeList')
const readyButton = document.querySelector('.readyButton')
let totalPlayTime = 0
let remSec = 30
let playMin = 2
let playSec = 0
// difficulty level: easy = 2 items , intermediate = 4 items, hard = 6 items
let difficulty = 2

// Sam's pages
const startScreen = document.querySelector('.startScreen')

// declaring dictionary objects
const allMessyObjects = {'pen':'test','brush':'test','trash':'test','stickers':'test','photo':'test', 'clip':''}
const allMessyKeys = Object.keys(allMessyObjects)
const allPlaces = {'drawer':'test','trash can':'test','bag':'test','book':'test','binder':'test', 'cup':''}
const allPlacesKeys = Object.keys(allPlaces)
// console.log(allMessyKeys[Math.floor(Math.random() * 6)])

// generate new list
let newGame = () => {
    playTimer.style.display = 'block'
    organizeList.textContent = ''
    let newList = {}
    for (let match = 0; match < difficulty; match++){
        let thisPlace = allPlacesKeys[Math.floor(Math.random() * 6)]
        let thisObject = allMessyKeys[Math.floor(Math.random() * 6)]
        newList[`${thisPlace}`] = thisObject
        organizeList.innerHTML += `${thisObject} in ${thisPlace}<br>`
    }
}

// skip 30sec memorization
readyButton.addEventListener('click', () => {
    memorize.style.display = 'none'
})

// play time responds to user's actions accordingly
let changePlayTime = (gameResponse) => {
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


// const add = document.querySelector('.add')
// const remove = document.querySelector('.remove')
// add.addEventListener('click', () => {
//     changePlayTime(0)
// })
// remove.addEventListener('click', () => {
//     changePlayTime(1)
// })


// start game timer(s) when user press play
if(startScreen.style.display = 'none'){
    newGame()
    setInterval(() => {
        if(memorize.style.display == 'none'){
            totalPlayTime++
            if(totalPlayTime%160 == 0){
                newGame()
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




