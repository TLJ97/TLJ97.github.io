// Append 200 squares, 10 base, 20 first line
let grid = document.getElementsByClassName("grid")[0]

for (let i=0; i<200; i++){
    grid.appendChild(document.createElement("div"));
}

for (let i = 0; i < 10; i++){
    let baseSquare = document.createElement("div");
    baseSquare.classList.add('base');
    grid.appendChild(baseSquare);
}

for (let i = 0; i < 20; i++){
    let firstLine = document.createElement("div");
    firstLine.classList.add('hide');
    grid.insertBefore(firstLine, grid.children[0]);
}


//declare variables needed
let squares = Array.from(document.querySelectorAll(".grid div"));
let colorClassMini = ['redMini', 'orangeMini', 'yellowMini', 'greenMini', 'blueMini', 'violetMini', 'purpleMini']
let colorClassTet = ['redTet', 'orangeTet', 'yellowTet', 'greenTet', 'blueTet', 'violetTet', 'purpleTet']
let colorClassFixed = ['redFixed', 'orangeFixed', 'yellowFixed', 'greenFixed', 'blueFixed', 'violetFixed', 'purpleFixed']
let colorClassShadow = ['redShadow', 'orangeShadow', 'yellowShadow', 'greenShadow', 'blueShadow', 'violetShadow', 'purpleShadow']
let timerId
let score = document.getElementById('player_score')
let level = document.getElementById('player_level')
let totalScore = 0
let currentSpeed = 1000
let gameOverMode = false

let gridArr = []
for(let i= 0; i < 230; i++){
    gridArr.push(i)
}

let miniGridArr = []
for (i=0;i<25;i++){
    miniGridArr.push(i)
}



gridArr.forEach(index => squares[index].style.backgroundColor = 'var(--dark-grid)')
write('TETRIS')

let startMode = true    //means idle mode
function start(){
    if(startMode && !instructionMode){
        write('')
        start_btn.style.visibility = "hidden"
        restart_btn.style.visibility = "hidden"
        howToPlay_btn.style.visibility = "hidden"
        container.style.backgroundColor = 'var(--normal-container)'
        body.style.color = 'var(--normal-font)'
        mini_grid.style.backgroundColor = 'var(--normal-grid)'
        miniGridArr.forEach(index => mini_squares[index].style.backgroundColor = '')
        gridArr.forEach(index => squares[index].style.backgroundColor = '')
        draw()
        setSpeed(currentSpeed)
    }
    startMode = false
}

function setSpeed(speed){
    clearInterval(timerId)
    timerId = setInterval(moveDown,(speed))
}

let playMode = true
//let pauseMode = false
function pauseAndPlay(){
    if(!gameOverMode && !startMode){
        if(playMode){
            clearInterval(timerId)
            pauseScreen()
            playMode = false
            //pauseMode = true
        } else if (!playMode){
            resumeScreen()
            setSpeed(currentSpeed)
            playMode = true
            //pauseMode = false
        }
    }
}



// declare variables to change screen & color
let container = document.getElementsByClassName('container')[0]
let body = document.getElementsByTagName('body')[0]
let mini_grid = document.getElementById("mini-grid")
let resume_btn = document.getElementById('resume')
let start_btn = document.getElementById('start')
let restart_btn = document.getElementById('restart')
let howToPlay_btn = document.getElementById('howToPlay')

function pauseScreen(){
    gridArr.forEach(index => squares[index].classList.add('pauseColor'))
    let pauseFixed = gridArr.filter(index => squares[index].classList.contains('fixed'))
    pauseFixed.forEach(index => squares[index].classList.add('pauseColorFixed'))
    container.style.backgroundColor = 'var(--dark-container)'
    body.style.color = 'var(--dark-font)'
    mini_grid.style.backgroundColor = 'var(--dark-grid)'
    function changeColorMini(color){
        let containMini = miniGridArr.filter(index => mini_squares[index].classList.contains(color))
        containMini.forEach(index => mini_squares[index].classList.add('pauseColorMini'))
    }
    colorClassMini.forEach(changeColorMini)

    write('PAUSE')
    resume_btn.style.visibility = "visible"
    restart_btn.style.visibility = "visible"
    howToPlay_btn.style.visibility = "visible"
    restart_btn.style.top = "63%"
    howToPlay_btn.style.top = "73%"
}


function gameOverScreen(){
    container.style.backgroundColor = 'var(--gameover-container)';
    body.style.color = 'var(--gameover-font)';
    mini_grid.style.backgroundColor = 'var(--gameover-grid)'
    gridArr.forEach(index => squares[index].style.backgroundColor = 'var(--gameover-grid)')
    let gameoverFixed = gridArr.filter(index => squares[index].classList.contains('fixed'))
    gameoverFixed.forEach(index => squares[index].style.backgroundColor = 'var(--gameover-fixed-color)')
    function changeColorMini(color){
        let containMini = miniGridArr.filter(index => mini_squares[index].classList.contains(color))
        containMini.forEach(index => mini_squares[index].style.backgroundColor = 'var(--gameover-fixed-color)')
    }
    colorClassMini.forEach(changeColorMini)

    write('GAME OVER')
    restart_btn.style.visibility = "visible"
    restart_btn.style.top = "55%"
}

function write(word){
    document.getElementsByClassName('word')[0].innerHTML = word
}

function resumeScreen(){
    gridArr.forEach(index => squares[index].classList.remove('pauseColor','pauseColorFixed'))
    container.style.backgroundColor = 'var(--normal-container)'
    body.style.color = 'var(--normal-font)'
    mini_grid.style.backgroundColor = 'var(--normal-grid)'
    miniGridArr.forEach(index => mini_squares[index].classList.remove('pauseColorMini'))
    write('')
    resume_btn.style.visibility = "hidden"
    restart_btn.style.visibility = "hidden"
    howToPlay_btn.style.visibility = "hidden"
}


//assign functions to keyCodes
function control(e) {
    if(e.keyCode === 37) {
        moveLeft()
    } else if (e.keyCode === 38) {
        rotate()
    } else if (e.keyCode === 39) {
        moveRight()
    } else if (e.keyCode === 40) {
        moveDown()
    } else if (e.keyCode === 27) {
        pauseAndPlay()
    } else if (e.keyCode === 32) {
        hardDrop()
    } else if (e.keyCode === 13){
        if(startMode){
            start()
        } else restart()
    } 
    }
    document.addEventListener('keydown', control)


// Create the seven tetrominoes (I, O, T, S, Z, J, and L)
let iTet = [
    [0, 1, 2, 3],
    [-18, -8, 2, 12],
    [0, 1, 2, 3],
    [-18, -8, 2, 12]
]

let oTet = [
    [0, 1, 10, 11],
    [0, 1, 10, 11],
    [0, 1, 10, 11],
    [0, 1, 10, 11]
]

let tTet = [
    [0, 1, 2, 11],
    [-9, 0, 1, 11],
    [-9, 0, 1, 2],
    [-9, 1, 2, 11]
]

let sTet = [
    [1, 2, 10, 11],
    [-10, 0, 1, 11],
    [1, 2, 10, 11],
    [-10, 0, 1, 11]
]

let zTet = [
    [0, 1, 11, 12],
    [-8, 1, 2, 11],
    [0, 1, 11, 12],
    [-8, 1, 2, 11]
]

let jTet = [
    [0, 1, 2, 12],
    [-9, 1, 10, 11],
    [0, 10, 11, 12],
    [-9, -8, 1, 11]
]

let lTet = [
    [0, 1, 2, 10],
    [-10, -9, 1, 11],
    [2, 10, 11, 12],
    [-9, 1, 11, 12]
]

let theTetrominoes = [iTet, oTet, tTet, sTet, zTet, jTet, lTet];

// for mini grid display
let nextTetromino = [
    [11, 12, 13, 14],
    [6, 7, 11, 12],
    [6, 7, 8, 12],
    [7, 8, 11, 12],
    [6, 7, 12, 13],
    [6, 7, 8, 13],
    [6, 7, 8, 11]
]



//default position & rotation
let currentPosition = 24;
let currentRotation = 0;
let randomTet = Math.floor(Math.random() * 7);
let current = theTetrominoes[randomTet][currentRotation];
let randomDisplay = Math.floor(Math.random() * 7);
let nextTetDisplay = nextTetromino[randomDisplay]


//draw tet & its shadow
function draw(){
    display()
    current.forEach(index => squares[currentPosition + index].classList.add(colorClassTet[randomTet]))
    shadow(colorClassShadow[randomTet])

    function shadow(shadowColor){
        let i = 0;
        let shadowLandBase = false
        let shadowLandFixed = false
        while(!shadowLandBase && !shadowLandFixed){
            let shadow = current.map(index => currentPosition + index + i)
            shadowLandBase = shadow.some(index => squares[index + 10].classList.contains('base'))
            shadowLandFixed = shadow.some(index => squares[index + 10].classList.contains('fixed'))
            if(shadowLandBase||shadowLandFixed){
                shadow.forEach(index => squares[index].classList.add(shadowColor))
            }
            i+=10
        } 
    }
}


function display(){
    miniGridArr.forEach(index => mini_squares[index].classList.remove(...colorClassMini))
    function miniDisplayColor(color){
        nextTetromino[randomDisplay].forEach(index => mini_squares[index].classList.add(color))
    }
    miniDisplayColor(colorClassMini[randomDisplay])
}

function undraw(){
    current.forEach(index => {squares[currentPosition + index].classList.remove(...colorClassTet)})
    gridArr.forEach(index => squares[index].classList.remove(...colorClassShadow))
}

function moveDown() {
    if(playMode && !startMode){
        freeze()
        undraw()
        currentPosition += 10
        draw()
    }
}

//check if tet is touching base/fixed
let drop = false
function freeze(){
    let touchBase = current.some(index => squares[currentPosition + index + 10].classList.contains('base'))
    let touchFixed = current.some(index => squares[currentPosition + index + 10].classList.contains('fixed'))
    if ((touchBase || touchFixed) && !drop) {
        //remove moving tet, make it a fixed one, add color class
        current.forEach(index => squares[currentPosition + index].classList.remove(...colorClassTet))
        current.forEach(index => squares[currentPosition + index].classList.add('fixed'))
        current.forEach(index => squares[currentPosition + index].classList.add(colorClassFixed[randomTet]))
    }
    
    if (touchBase || touchFixed || drop){
        deductLine()
        callNextRandom()
        currentRotation = 0
        draw()
    }
    let thirdLine = [20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39] //unsolved bug
    let gameOver = thirdLine.some(index => squares[index].classList.contains('fixed'))
    if (gameOver){
        gameOverMode = true
        clearInterval(timerId)
        playMode = false
        gameOverScreen()
    }
}



//keep changing falling tet
function callNextRandom(){
    randomTet = randomDisplay
    current = theTetrominoes[randomTet][0];
    currentPosition = 24
    randomDisplay = Math.floor(Math.random() * 7)
}


function moveLeft(){
    if(playMode && !startMode){
        undraw()
        currentPosition--
        let touchLeftEdge = current.some(index => (currentPosition + index + 1) % 10 == 0)
        if (touchLeftEdge){currentPosition++}
        let touchLeftFixed = current.some(index => squares[currentPosition + index].classList.contains('fixed'))
        if (touchLeftFixed){currentPosition++}
        draw()
    }
}

function moveRight(){
    if(playMode && !startMode){
        undraw()
        currentPosition++
        let touchRightEdge = current.some(index => (currentPosition + index - 1) % 10 == 9)
        if (touchRightEdge){currentPosition--}
        let touchRightFixed = current.some(index => squares[currentPosition + index].classList.contains('fixed'))
        if (touchRightFixed){currentPosition--}
        draw()
    }
}


function rotate(){
    if(playMode && !startMode){
        undraw()
        currentRotation++
        if(currentRotation == 4){
            currentRotation = 0;
        }
    
        // check rotated position for iTet only
        if(randomTet == 0){
            iTet_pushFromEdge()
            iTet_pushFromFixed()
            iTet_pushFromBaseAndFixedBottom()
            iTet_finalCheck()
        } else {
    
        // check rotated position for others
            horizontalStuck()
            pushFromEdge()
            pushFromFixed()
            pushFromBaseAndFixedBottom()
            finalCheck()
        }
        current = theTetrominoes[randomTet][currentRotation]; 
        draw()
    }
}

function horizontalStuck(){
    let toBeDrawn = theTetrominoes[randomTet][currentRotation].map(index => currentPosition + index)
    let nextContainFixed = toBeDrawn.some(index => squares[index].classList.contains('fixed'))
    let nextOutsideRightEdge = toBeDrawn.some(index => (index) % 10 == 0)
    let nextOutsideLeftEdge = toBeDrawn.some(index => (index) % 10 == 9)

    // two fixed blocks
    let stuckByRight = current.some(index => squares[currentPosition + index + 1].classList.contains('fixed'))
    let stuckByLeft = current.some(index => squares[currentPosition + index - 1].classList.contains('fixed'))
    if(stuckByRight && stuckByLeft && nextContainFixed){
        if(currentRotation == 0){   // avoid it from becoming -1
            currentRotation = 3
            return true     // true means the rotation has ald been revert
        } else {
            currentRotation--
            return true
        }
    }
    
    // edge & block left
    let touchLeftEdge = current.some(index => (currentPosition + index) % 10 == 0)
    let stuckByRightAndEdge = current.some(index => squares[currentPosition + index + 1].classList.contains('fixed'))
    if((touchLeftEdge && stuckByRightAndEdge && nextContainFixed) || (touchLeftEdge && stuckByRightAndEdge && nextOutsideLeftEdge)){
        if(currentRotation == 0){
            currentRotation = 3
            return true
        } else {
            currentRotation--
            return true
        }
    }

    //edge & block right
    let touchRightEdge = current.some(index => (currentPosition + index) % 10 == 9)
    let stuckByLeftAndEdge = current.some(index => squares[currentPosition + index - 1].classList.contains('fixed'))
    if((touchRightEdge && stuckByLeftAndEdge && nextContainFixed) || (touchRightEdge && stuckByLeftAndEdge && nextOutsideRightEdge)){
        if(currentRotation == 0){
            currentRotation = 3
            return true
        } else {
            currentRotation--
            return true
        }
    }
    else return false
}


function pushFromEdge(){
    let toBeDrawn = theTetrominoes[randomTet][currentRotation].map(index => currentPosition + index)
    // make sure there's space to push
    let noSpaceForLeftPush = toBeDrawn.some(index => squares[index + 1].classList.contains('fixed'))
    let noSpaceForRightPush = toBeDrawn.some(index => squares[index - 1].classList.contains('fixed'))
    let touchRightEdge = current.some(index => (currentPosition + index) % 10 == 9)
    let pushAwayFromRight = toBeDrawn.some(index => index % 10 == 0)
    if(pushAwayFromRight && touchRightEdge && !noSpaceForRightPush){
        currentPosition--
        return true
    }
    let touchLeftEdge = current.some(index => (currentPosition + index) % 10 == 0)
    let pushAwayFromLeft = toBeDrawn.some(index => index % 10 == 9)
    if(pushAwayFromLeft && touchLeftEdge && !noSpaceForLeftPush){
        currentPosition++
        return true
    }
    else return false
}

function pushFromFixed(){
    let toBeDrawn = theTetrominoes[randomTet][currentRotation].map(index => currentPosition + index)
    let needPush = toBeDrawn.some(index => squares[index].classList.contains('fixed'))
    let noSpaceForLeftPush = toBeDrawn.some(index => squares[index + 1].classList.contains('fixed'))
    let noSpaceForRightPush = toBeDrawn.some(index => squares[index - 1].classList.contains('fixed'))
    let tetAndRotToBePushFromRight = (
        (randomTet == 2 && currentRotation == 2) ||
        (randomTet == 3 && currentRotation == 0) ||
        (randomTet == 3 && currentRotation == 2) ||
        (randomTet == 5 && currentRotation == 2) ||
        (randomTet == 6 && currentRotation == 2)
    )
    if(tetAndRotToBePushFromRight && needPush && !noSpaceForRightPush){
        currentPosition--
        return true
    }
    let tetAndRotToBePushFromLeft = (
        (randomTet == 2 && currentRotation == 0) ||
        (randomTet == 4 && currentRotation == 0) ||
        (randomTet == 4 && currentRotation == 2) ||
        (randomTet == 5 && currentRotation == 0) ||
        (randomTet == 6 && currentRotation == 0)
    )
    if(tetAndRotToBePushFromLeft && needPush && !noSpaceForLeftPush){
        currentPosition++
        return true
    }
    else return false
}

function pushFromBaseAndFixedBottom() {
    // only t-tet applies
    let toBeDrawn = theTetrominoes[randomTet][currentRotation].map(index => currentPosition + index)
    let pushFromBase = toBeDrawn.some(index => squares[index].classList.contains('base'))
    let pushFromFixed = toBeDrawn.some(index => squares[index].classList.contains('fixed'))
    let noSpaceToPushUp = toBeDrawn.some(index => squares[index-10].classList.contains('fixed'))
    if ((randomTet == 2 && currentRotation == 3) && (pushFromBase || pushFromFixed) && !noSpaceToPushUp) {
        currentPosition -= 10
        return true
    }
    else return false
}

function finalCheck(){
    let toBeDrawn = theTetrominoes[randomTet][currentRotation].map(index => currentPosition + index)
    let noSpaceCzFixed = toBeDrawn.some(index => squares[index].classList.contains('fixed'))

    let touchRightEdge = current.some(index => (currentPosition + index) % 10 == 9)
    let pushAwayFromRight = toBeDrawn.some(index => index % 10 == 0)
    let noSpaceCzEdgeRight = touchRightEdge && pushAwayFromRight

    let touchLeftEdge = current.some(index => (currentPosition + index) % 10 == 0)
    let pushAwayFromLeft = toBeDrawn.some(index => index % 10 == 9)
    let noSpaceCzEdgeLeft = touchLeftEdge && pushAwayFromLeft

    if ((noSpaceCzFixed || noSpaceCzEdgeLeft || noSpaceCzEdgeRight) && horizontalStuck()==false && pushFromEdge()==false && pushFromFixed()==false && pushFromBaseAndFixedBottom()==false){
        if(currentRotation == 0){
            currentRotation = 3
        } else currentRotation--
    } 
}


function iTet_pushFromEdge(){
    let toBeDrawn = theTetrominoes[randomTet][currentRotation].map(index => currentPosition + index)
    if (currentRotation == 0 || currentRotation == 2){

        // push from edge with edge touched (for left & right)
        let touchLeftEdge = current.every(index => (currentPosition + index) % 10 == 0)
        let noSpaceForLeftPush = toBeDrawn.some(index => squares[index + 2].classList.contains('fixed'))
        if(touchLeftEdge && !noSpaceForLeftPush){
            currentPosition += 2
            return true
        }
        let touchRightEdge = current.every(index => (currentPosition + index) % 10 == 9)
        let noSpaceForRightPush = toBeDrawn.some(index => squares[index - 1].classList.contains('fixed'))
        if(touchRightEdge && !noSpaceForRightPush){
            currentPosition --
            return true
        }

        // push from edge without edge touched (left only)
        let inSecondColumn = current.every(index => (currentPosition + index) % 10 == 1)
        let noSpaceForLeftPush_LeftOnly = toBeDrawn.some(index => squares[index + 1].classList.contains('fixed'))
        if (inSecondColumn && !noSpaceForLeftPush_LeftOnly){
            currentPosition++
            return true
        } else return false
    } else return false
}


function iTet_pushFromFixed(){
    if ((currentRotation == 0 || currentRotation == 2) && iTet_pushFromEdge()==false){
        let toBeDrawn = theTetrominoes[randomTet][currentRotation].map(index => currentPosition + index)
        let needPush = toBeDrawn.some(index => squares[index].classList.contains('fixed'))

        // push from fixed without fixed touched (left only)
        let fixedInLeftLeft = current.some(index => squares[currentPosition + index - 2].classList.contains('fixed'))
        let noSpaceForLeftPush_LeftOnly = toBeDrawn.some(index => squares[index + 1].classList.contains('fixed'))
        let crossRightEdge_LeftOnly = toBeDrawn.some(index => (index + 1) % 10 == 0)
        if(fixedInLeftLeft && needPush && !noSpaceForLeftPush_LeftOnly && !crossRightEdge_LeftOnly){
            currentPosition++
        }
        
        // push from fixed with fixed touched (for left & right)
        let touchLeftFixed = current.some(index => squares[currentPosition + index - 1].classList.contains('fixed'))
        let noSpaceForLeftPush = toBeDrawn.some(index => squares[index + 2].classList.contains('fixed'))
        let crossRightEdge = toBeDrawn.some(index => (index + 2) % 10 == 0)
        if(touchLeftFixed && needPush && !noSpaceForLeftPush && !crossRightEdge){
            currentPosition += 2
        }
        let touchRightFixed = current.some(index => squares[currentPosition + index + 1].classList.contains('fixed'))
        let noSpaceForRightPush = toBeDrawn.some(index => squares[index - 1].classList.contains('fixed'))
        let crossLeftEdge = toBeDrawn.some(index => (index - 1) % 10 == 9)
        if(touchRightFixed && needPush && !noSpaceForRightPush && !crossLeftEdge){
            currentPosition --
        } else return false
    } else return false
}

function iTet_pushFromBaseAndFixedBottom() {
    let toBeDrawn = theTetrominoes[randomTet][currentRotation].map(index => currentPosition + index)
    let pushFromBase = toBeDrawn.some(index => squares[index].classList.contains('base'))
    let pushFromFixed = current.some(index => squares[currentPosition + index + 10].classList.contains('fixed'))
    let needPush = toBeDrawn.some(index => squares[index].classList.contains('fixed'))
    if((currentRotation == 1 || currentRotation == 3) && (pushFromBase || pushFromFixed && needPush)){
        let noSpaceToPushUp = toBeDrawn.some(index => squares[index-10].classList.contains('fixed'))
        if (!noSpaceToPushUp) {
            currentPosition -= 10
            return true
        } 
    } else return false
}

function iTet_finalCheck(){
    let toBeDrawn = theTetrominoes[randomTet][currentRotation].map(index => currentPosition + index)
    let noSpaceCzFixed = toBeDrawn.some(index => squares[index].classList.contains('fixed'))
    let noSpaceCzEdge = toBeDrawn.some(index => index % 10 == 9) && toBeDrawn.some(index => index % 10 == 0)

    if ((noSpaceCzFixed || noSpaceCzEdge) && iTet_pushFromEdge()==false && iTet_pushFromFixed()==false && iTet_pushFromBaseAndFixedBottom()==false){
        if(currentRotation == 0){
            currentRotation = 3
        } else currentRotation--
    }
}


function deductLine(){
    let oneUnit = []
    for(let i = 0; i < 10; i++){
        oneUnit.push(i)
        //console.log(oneUnit)        // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
    let lineCount = 0
    for(let i = 20; i < 220; i += 10){
        let tenArr = oneUnit.map(index => index + i)        // eg. i = 80, tenArr = [80,...,89]
        let fullLine = tenArr.every(index => squares[index].classList.contains('fixed'))
        
        if(fullLine){
            tenArr.forEach(index => squares[index].classList.remove('fixed'))
            tenArr.forEach(index => squares[index].classList.remove(...colorClassFixed))
            lineCount++
            let checkAbove = []
            for (let j = 20; j < i; j++){
                checkAbove.push(j)
            }

            dropDown('fixed')
            colorClassFixed.forEach(dropDown)
            function dropDown(fix){
                let containFix = checkAbove.filter(index => squares[index].classList.contains(fix))
                containFix.forEach(index => squares[index].classList.remove(fix))
                containFix.forEach(index => squares[index + 10].classList.add(fix))
            }
        }
    }
    if(lineCount==1){
        totalScore += 100
    }
    if(lineCount==2){
        totalScore+=400
    }
    if(lineCount==3){
        totalScore += 900
    }
    if(lineCount==4){
        totalScore+=2000
    }

    score.innerHTML = totalScore
    checkLevel()
}

let currentLevel = 1
function checkLevel(){
    if (totalScore > 1999){
        currentLevel = 2
        currentSpeed = 900
    }
    if (totalScore > 3999){
        currentLevel = 3
        currentSpeed = 800
    }
    if (totalScore > 5999){
        currentLevel = 4
        currentSpeed = 700
    }
    if (totalScore > 7999){
        currentLevel = 5
        currentSpeed = 600
    }
    if (totalScore > 9999){
        currentLevel = 6
        currentSpeed = 500
    }
    if (totalScore > 11999){
        currentLevel = 7
        currentSpeed = 400
    }
    if (totalScore > 13999){
        currentLevel = 8
        currentSpeed = 300
    }
    if (totalScore > 15999){
        currentLevel = 9
        currentSpeed = 250
    }
    if (totalScore > 17999){
        currentLevel = 10
        currentSpeed = 200
    }
    if (totalScore > 19999){
        currentLevel = 11
        currentSpeed = 150
    }
    if (totalScore > 21999){
        currentLevel = 12
        currentSpeed = 100

    }
    level.innerHTML = currentLevel
    setSpeed(currentSpeed)
}

function hardDrop(){
    if(playMode && !startMode){
        gridArr.forEach(index => squares[index].classList.remove(...colorClassTet))
        shadowToFixed(colorClassShadow[randomTet], colorClassFixed[randomTet])
        function shadowToFixed(shadowColor, fixedColor){
            let containShadow = gridArr.filter(index => squares[index].classList.contains(shadowColor))
            containShadow.forEach(index => squares[index].classList.remove(shadowColor))
            containShadow.forEach(index => squares[index].classList.add('fixed'))
            containShadow.forEach(index => squares[index].classList.add(fixedColor))
        }
        drop = true
        freeze()
        drop = false
    }    
}


for (let i=0; i<25; i++){
    mini_grid.appendChild(document.createElement("div"));
}
let mini_squares = Array.from(document.querySelectorAll("#mini-grid div"));

function restart(){
    if(!playMode && !instructionMode){
        startMode = true
        currentLevel = 1
        level.innerHTML = currentLevel
        totalScore = 0
        score.innerHTML = totalScore
        currentSpeed = 1000
        currentPosition = 24
        gridArr.forEach(index => squares[index].classList.remove('fixed', 'pauseColor', 'pauseColorFixed'))
        gridArr.forEach(index => squares[index].classList.remove(...colorClassFixed,...colorClassShadow,...colorClassTet))
        miniGridArr.forEach(index => mini_squares[index].classList.remove(...colorClassMini, 'pauseColorMini'))
        start()
        write('')
        playMode = true
        gameOverMode = false
        resume_btn.style.visibility = "hidden"
    }
}

let instructionMode = false
function howToPlayScreen(){
    document.getElementById('instructions').style.visibility = 'visible';
    instructionMode = true
    if(instructionMode){
        function subcontrol(e){
            if (e.keyCode == 27){
                closeInstruction()
            }
        }     
    }
    document.addEventListener('keydown', subcontrol)
}


function closeInstruction(){
    document.getElementById('instructions').style.visibility = 'hidden'
    instructionMode = false
}

/*
to do:
hold
effect when level up
effect when deduct line
add score when tet drops
problem: game over at second roll
*/

