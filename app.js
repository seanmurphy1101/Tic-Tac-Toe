let items = document.getElementsByClassName("grid-item");
function playGame(first){
    let board = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
    function checkWin(){
        // check rows
        for (let i=0; i<board.length; i+=3){
            if (board[i]===board[i+1] && board[i+1]===board[i+2] && board[i]!==undefined){
                return {res: board[i] === "X" ? "Player" : "Computer", end: true};
            }
        }
        // check columns
        for (let i=0; i<3; ++i){
            if (board[i]===board[i+3] && board[i+3]===board[i+6] && board[i]!==undefined){
                return {res: board[i] === "X" ? "Player" : "Computer", end: true};
            }
        }
        // check both diagonals
        if (board[0]===board[4] && board[4]===board[8] && board[0]!==undefined){
            return {res: board[0] === "X" ? "Player" : "Computer", end: true};
        }
        if (board[2]===board[4] && board[4]===board[6] && board[2]!==undefined){
            return {res: board[2] === "X" ? "Player" : "Computer", end: true};
        }
        // check for a draw
        if (!board.includes(undefined)){
            return {res: "draw", end: true};
        }
        else {
            return {res: "ongoing", end: false};
        }
    };
    function computerMove(){
        if (!board.includes(undefined)){
            return -1;
        }
        let move = Math.floor(Math.random()*9);
        while (board[move]!==undefined){
            move = Math.floor(Math.random()*9);
        }
        return move;
    }
    return function playRound(move){
        if (board[move]===undefined){
            board[move]='X'
            if (!checkWin().end){
                let c = computerMove();
                board[c]='O';
                return {c: c, res: checkWin().res, end: checkWin().end};
            }
            else {
                return {c: null, res: checkWin().res, end: checkWin().end};
            }
        }
        else {
            alert("invalid move");
            return {c: null, res: "invalid move", end: false}
        }  
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function clearBoard(){
    for (let i=0; i<items.length; ++i){
        items[i].innerHTML = "";
    }
}

for (let i=0; i<items.length; ++i){
    items[i].addEventListener('click', async function update(){
        let res = game(i);
        console.log(res);
        if (res.res !== "invalid move"){
            items[i].innerHTML = 'X';
            if (res.c !== null && res.c !== undefined ){
                await sleep(1000);
                items[res.c].innerHTML= 'O'
            }
            if (res.end){
             console.log(res.res);
                let show = document.getElementById("results");
                show.innerHTML = res.res === "draw" ? "draw" : res.res+" wins";
                await sleep(3000);
                show.innerHTML = "";
                clearBoard();
                game = playGame();
            }
        }
    });
}
let game = playGame(true);
