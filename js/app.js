const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors  = ['#ee9ca7','#43C6AC','#F8FFAE','#db36a4','#c31432','#240b36','#dd3e54','#6be585','#8360c3','#ffd452']
const decor = document.querySelector('.decor');
const restart = document.querySelector(".restart");

let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
    decor.classList.add('bye')
})

timeList.addEventListener('click', event => {
    if(event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up')

        startGame()
    }
})

board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
})


restart.addEventListener('click',() => {
    document.location.reload();
})




function startGame() {
    setInterval(decreaseTime,1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if(time === 0){ 
        finishGame()
    }else {
        let current = --time
        if(current < 10){
            current = `0${current}`
        }
        setTime(current)
    }
}


function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}


function finishGame(){
    timeEl.parentNode.remove('hide')
    board.innerHTML = `<h1 class="score">SCORE<span class="primary">${score}</span></h1>`
    
}




function createRandomCircle(){
    const circle = document.createElement('div')

    const color = getRandomColor()

    circle.style.background = color

    const size = getRandomNumber(25, 70)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

function getRandomNumber(min, max){
    return Math.round(Math.random() * (max - min) + min)
}


function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}



// screen mousemove animation


document.addEventListener('mousemove',parallax);
    function parallax(e){   
        this.querySelectorAll('.cross').forEach(layer => {
            const speed = layer.getAttribute('data-speed')

            const x = (window.innerWidth - e.pageX*speed)/100
            const y = (window.innerHeight - e.pageY*speed)/100

            layer.style.transform = `translateX(${x}px) translateY(${y}px)`
        })
    }