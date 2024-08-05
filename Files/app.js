let boxes = document.getElementsByClassName('box');
let turnOfX = true;
let audio = new Audio('../Music/Ting Sound Effect.mp3');
let scoreOfX = document.getElementById('scoreOfX');
let scoreOfO = document.getElementById('scoreOfO');
let turnX = document.getElementById('turnX');
let scoreOfDraw = document.getElementById('scoreOfDraw')
let btn = document.getElementById('btn')
let xScore = 0;
let oScore = 0;
let drawScore = 0
let winArr = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
];
let gameOver = false;

for (const x of boxes) {
    x.addEventListener('click', () => {
        if (gameOver) return;
        if (x.innerText === '') {
            if (turnOfX) {
                x.innerText = 'X';
                turnX.innerText = 'O';
                turnX.style.color = '#dc3545';
                turnOfX = false;
            } else {
                x.innerText = 'O';
                turnX.innerText = 'X';
                turnX.style.color = '#007bff';
                turnOfX = true;
            }
            audio.play();
            checkWinner();
        }
    });
}

function checkWinner() {
    for (const y of winArr) {
        let postion0 = boxes[y[0]].innerText;
        let postion1 = boxes[y[1]].innerText;
        let postion2 = boxes[y[2]].innerText;
        if (postion0 !== '' && postion1 !== '' && postion2 !== '') {
            if (postion0 === postion1 && postion1 === postion2) {
                Swal.fire({
                    title: "Good job!",
                    text: `The Winner Is ${postion0}`,
                    icon: "success"
                });
                gameOver = true;
                if (postion0 === 'X') {
                    xScore++;
                    scoreOfX.innerText = xScore;
                } else {
                    oScore++;
                    scoreOfO.innerText = oScore;
                }
                setTimeout(resetBoard, 1000); 
                return;
            }
        }
    }
    let isMatchTie = true;
    for (const x of boxes) {
        if (x.innerText === '') {
            isMatchTie = false;
            break;
        }
    }
    if (isMatchTie) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The Match Has Tied"
        });
        drawScore++
        scoreOfDraw.innerText = drawScore
        gameOver = true;
        setTimeout(resetBoard, 1000);
    }
}

function resetBoard() {
    for (const x of boxes) {
        x.innerHTML = '';
    }
    gameOver = false;
    turnOfX = true;
    turnX.innerText = 'X';
    turnX.style.color = '#007bff';
}
btn.addEventListener('click',()=>{
    location.reload()
})