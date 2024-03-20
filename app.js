let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".resetBtn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");
let newGameBtn = document.querySelector(".newBtn");
let playerO = document.querySelector(".playerOHide");
let playerX = document.querySelector(".playerXHide");

let clickCount = 0;
let gameCount = 0;

let turn0 = true;
resetBtn.classList.remove("resetBtnHide");
playerO.classList.remove("playerOHide");

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hidden");
    newGameBtn.classList.add("newBtnHide");
    resetBtn.classList.remove("resetBtnHide");
    playerX.classList.add("playerXHide");
    playerO.classList.remove("playerOHide");

    clickCount = 0;
}

const newGame = () => {
    gameCount++;
    if(gameCount % 2 == 0) {
        turn0 = true;
        playerO.classList.remove("playerOHide");
    } else{
        playerX.classList.remove("playerXHide");
    }
    enableBoxes();
    msgContainer.classList.add("hidden");
    newGameBtn.classList.add("newBtnHide");
    resetBtn.classList.remove("resetBtnHide");

    clickCount = 0;
}

resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', newGame);


boxes.forEach( box => {
    box.addEventListener("click", () =>{
        // console.log("box was clicked")
        clickCount++;
        if(clickCount == 9){
            gameDraw();
        }  

        if(turn0 === true){
            box.innerText = "O";
            box.style.color = "blue";
            turn0 = false;
            playerX.classList.remove("playerXHide");
            playerO.classList.add("playerOHide");
        }
        else{
            box.innerText = "X";
            box.style.color = "red";
            turn0 = true;
            playerO.classList.remove("playerOHide");
            playerX.classList.add("playerXHide");
        }
        box.disabled = true;
        checkWin();

        if(clickCount == 9){
            playerO.classList.add("playerOHide");
            playerX.classList.add("playerXHide");
        }         
    })
})

const checkWin = () => {
        for(let pattern of winPatterns){
            // console.log(pattern[0], pattern[1], pattern[2]);
            // console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;

            if(pos1Val != "" &&  pos2Val != "" && pos3Val != ""){
                if(pos1Val == pos2Val && pos2Val == pos3Val){
                    console.log("Winner");
                    showWinner(pos1Val);
                    
                }
            }
        }
};

function gameDraw(){
    msg.innerText = "It's a DRAW!";
    msgContainer.classList.remove("hidden");
    resetBtn.classList.add("resetBtnHide");
    newGameBtn.classList.remove("newBtnHide");
    playerO.classList.add("playerOHide");
    playerX.classList.add("playerXHide");
}
   

const showWinner = (winner) => {
    
    const winningSymbolColor = winner === 'X' ? 'red' : 'blue';
    const winnerMessage = `Player <span style="color: ${winningSymbolColor};">${winner}</span> won the match!`;

    msg.innerHTML = winnerMessage;
    msgContainer.classList.remove("hidden");
    resetBtn.classList.add("resetBtnHide");
    newGameBtn.classList.remove("newBtnHide");
    playerO.classList.add("playerOHide");
    playerX.classList.add("playerXHide");
    disableBoxes();
};

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};


