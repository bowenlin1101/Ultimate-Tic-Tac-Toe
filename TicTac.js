var tempo = true;
var boardState;
var bigBoardState;
window.onload = function(){
    setBigBoard()
    setSmallBoard()
    setBoardState()
}

document.addEventListener('click', function(e) {
    var target = e.target
    console.log(target);
    
    if (tempo){
        setX(target);
    } else {
        setO(target);
    }
      
}, false);

function setBoardState(){ 
    boardState = [[["available", "available", "available"],["available", "available", "availabe"],["available", "available", "availabe"]],[["available", "available", "availabe"],["available", "available", "availabe"],["available", "available", "availabe"]],[["available", "available", "availabe"],["available", "available", "availabe"],["available", "available", "availabe"]],[["available", "available", "availabe"],["available", "available", "availabe"],["available", "available", "availabe"]],[["available", "available", "availabe"],["available", "available", "availabe"],["available", "available", "availabe"]],[["available", "available", "availabe"],["available", "available", "availabe"],["available", "available", "availabe"]],[["available", "available", "availabe"],["available", "available", "availabe"],["available", "available", "availabe"]],[["available", "available", "availabe"],["available", "available", "availabe"],["available", "available", "availabe"]],[["available", "available", "availabe"],["available", "available", "availabe"],["available", "available", "availabe"]]];
    bigBoardState = [["available", "available", "available"],["available", "available", "availabe"],["available", "available", "availabe"]];
    console.log(boardState);
}

function setBigBoard(){
    const gameBoxContainer = document.getElementById("game-box-container");
    const gameBox = document.getElementById("game-box");
    for (var i = 0; i < 3; i++){
        for (var j = 0; j < 3; j++){
            var element = document.createElement("div");
            element.classList.add("parent-square");
            element.setAttribute("id","brow-"+String(i)+"col-"+String(j));
            document.getElementById("brow"+i).appendChild(element);
        }
    }
}

function setSmallBoard(){
    squareid = 0
    for (i of document.getElementsByClassName("parent-square")){
        for (var j = 0; j < 3; j++){
            var element = document.createElement("div");
            element.classList.add("small-flex-box");
            element.setAttribute("id","s"+String(squareid)+"row"+String(j));
            i.appendChild(element);
        }
        squareid++
    }
    for (var k = 0; k< 9; k++){
        for (var i = 0; i < 3; i++){
            for (var j = 0; j < 3; j++){
                var element = document.createElement("img");
                element.classList.add("child-square");
                element.classList.add("available");
                element.setAttribute("src","images/Transparent.png");
                element.setAttribute("id","s"+String(k)+"row-"+String(i)+"col-"+String(j));
                document.getElementById("s"+String(k)+"row"+i).appendChild(element);
            }
        }
    }
}

function setX(e){
    if (e.classList.contains("child-square") && e.classList.contains("available")){
        var SquareKey = e.id;
        var BigSquareId = SquareKey[1];
        var BigSquareRow = SquareKey[6];
        var BigSquareCol = SquareKey[11];
        var turnIndicator = document.getElementById("turn")
        var turnIndicatorBox = document.getElementById("turn-box")
        e.setAttribute("src", "images/X.png");
        e.classList.remove("child-square");
        e.classList.add("small-sign");
        tempo = !tempo;
        if (tempo){
            turnIndicator.textContent = "X to move"
            turnIndicatorBox.classList.add("red")
            turnIndicatorBox.classList.remove("blue")
        } else {
            turnIndicator.textContent = "O to move"
            turnIndicatorBox.classList.add("blue")
            turnIndicatorBox.classList.remove("red")
        }
        boardState[BigSquareId][BigSquareRow][BigSquareCol] = "X";
        checkSmallWin(BigSquareId);
        addAvailability(BigSquareRow,BigSquareCol);
        checkBigWin();
    }
}

function setO(e){
    if (e.classList.contains("child-square") && e.classList.contains("available") && e.classList.contains("available")){
        var SquareKey = e.id;
        var BigSquareId = SquareKey[1];
        var BigSquareRow = SquareKey[6];
        var BigSquareCol = SquareKey[11];
        var turnIndicator = document.getElementById("turn")
        var turnIndicatorBox = document.getElementById("turn-box")
        e.setAttribute("src", "images/O.png");
        e.classList.remove("child-square");
        e.classList.add("small-sign");
        tempo = !tempo;
        if (tempo){
            turnIndicator.textContent = "X to move"
            turnIndicatorBox.classList.add("red")
            turnIndicatorBox.classList.remove("blue")
        } else {
            turnIndicator.textContent = "O to move"
            turnIndicatorBox.classList.add("blue")
            turnIndicatorBox.classList.remove("red")
        }
        boardState[BigSquareId][BigSquareRow][BigSquareCol] = "O";
        checkSmallWin(BigSquareId);
        addAvailability(BigSquareRow,BigSquareCol);
        checkBigWin();
    }
}

function addAvailability(row,col){
    var parent = document.getElementById("brow-"+row+"col-"+col); 
    removeAvailability("*");
    if (parent.children[0].children[0].classList.contains("XWon")||parent.children[0].children[0].classList.contains("OWon")){
        console.log("bruh");
        var childSquares = document.getElementsByClassName("child-square");
        var signSquares = document.getElementsByClassName("small-sign");
        for (i of childSquares){
            i.classList.add("available");
        }
        for (i of signSquares){
            i.classList.add("available");
        }
        removeAvailability("XWon");
        removeAvailability("OWon");
    } else {
        for (i of parent.children){
            for (j of i.children){
                j.classList.add("available");
            }
        }
    } 
}

function removeAvailability(targetClass){  
    if (targetClass == "*"){
        console.log("bruh2")
        childSquares = document.getElementsByClassName("child-square");
        signSquares = document.getElementsByClassName("small-sign");
        for (i of childSquares){
            if (i.classList.contains("available")){
                i.classList.remove("available");
            }
        }

        for (i of signSquares){
            if (i.classList.contains("available")){
                i.classList.remove("available");
            }
        }
    } else {
        targetElements = document.getElementsByClassName(targetClass)
        for (i of targetElements){
            if (i.classList.contains("available")){
                i.classList.remove("available");
            }
        }
    }
}

function checkSmallWin(square){
    squares = boardState[square];
    console.log(squares);
    //Checks for horizontals
    if ((squares[0][0]=="X"&&squares[0][1]=="X"&&squares[0][2]=="X")||(squares[1][0]=="X"&&squares[1][1]=="X"&&squares[1][2]=="X")||(squares[2][0]=="X"&&squares[2][1]=="X"&&squares[2][2]=="X")
    //Checks for verticals
    ||(squares[0][0]=="X"&&squares[1][0]=="X"&&squares[2][0]=="X")||(squares[0][1]=="X"&&squares[1][1]=="X"&&squares[2][1]=="X")||(squares[0][2]=="X"&&squares[1][2]=="X"&&squares[2][2]=="X")
    //Checks for diagonals
    ||(squares[0][0]=="X"&&squares[1][1]=="X"&&squares[2][2]=="X")||(squares[0][2]=="X"&&squares[1][1]=="X"&&squares[2][0]=="X")
    ){
        closedRowCol = convertSquaretoRowCol(square)
        closedSquare = document.getElementById("brow-"+closedRowCol[0]+"col-"+closedRowCol[1]);
        for (i of closedSquare.children){
            for(j of i.children){
                j.classList.add("XWon");
            }
        }
        bigBoardState[closedRowCol[0]][closedRowCol[1]] = "X";
    } else if((squares[0][0]=="O"&&squares[0][1]=="O"&&squares[0][2]=="O")||(squares[1][0]=="O"&&squares[1][1]=="O"&&squares[1][2]=="O")||(squares[2][0]=="O"&&squares[2][1]=="O"&&squares[2][2]=="O")
    //Checks for verticals
    ||(squares[0][0]=="O"&&squares[1][0]=="O"&&squares[2][0]=="O")||(squares[0][1]=="O"&&squares[1][1]=="O"&&squares[2][1]=="O")||(squares[0][2]=="O"&&squares[1][2]=="O"&&squares[2][2]=="O")
    //Checks for diagonals
    ||(squares[0][0]=="O"&&squares[1][1]=="O"&&squares[2][2]=="O")||(squares[0][2]=="O"&&squares[1][1]=="O"&&squares[2][0]=="O")){
        closedRowCol = convertSquaretoRowCol(square)
        closedSquare = document.getElementById("brow-"+closedRowCol[0]+"col-"+closedRowCol[1]);
        for (i of closedSquare.children){
            for(j of i.children){
                j.classList.add("OWon");
            }
        }
        bigBoardState[closedRowCol[0]][closedRowCol[1]] = "O";
    }
}

function checkBigWin(){
    //Checks for horizontals
    if ((bigBoardState[0][0]=="X"&&bigBoardState[0][1]=="X"&&bigBoardState[0][2]=="X")||(bigBoardState[1][0]=="X"&&bigBoardState[1][1]=="X"&&bigBoardState[1][2]=="X")||(bigBoardState[2][0]=="X"&&bigBoardState[2][1]=="X"&&bigBoardState[2][2]=="X")
    //Checks for verticals
    ||(bigBoardState[0][0]=="X"&&bigBoardState[1][0]=="X"&&bigBoardState[2][0]=="X")||(bigBoardState[0][1]=="X"&&bigBoardState[1][1]=="X"&&bigBoardState[2][1]=="X")||(bigBoardState[0][2]=="X"&&bigBoardState[1][2]=="X"&&bigBoardState[2][2]=="X")
    //Checks for diagonals
    ||(bigBoardState[0][0]=="X"&&bigBoardState[1][1]=="X"&&bigBoardState[2][2]=="X")||(bigBoardState[0][2]=="X"&&bigBoardState[1][1]=="X"&&bigBoardState[2][0]=="X")
    ){
        removeAvailability("*");
        window.alert("X Won!!!")
        document.getElementById("reset-button").style.display = "inline-block";
    } 
    //Checks for horizontals
    else if ((bigBoardState[0][0]=="O"&&bigBoardState[0][1]=="O"&&bigBoardState[0][2]=="O")||(bigBoardState[1][0]=="O"&&bigBoardState[1][1]=="O"&&bigBoardState[1][2]=="O")||(bigBoardState[2][0]=="O"&&bigBoardState[2][1]=="O"&&bigBoardState[2][2]=="O")
    //Checks for verticals
    ||(bigBoardState[0][0]=="O"&&bigBoardState[1][0]=="O"&&bigBoardState[2][0]=="O")||(bigBoardState[0][1]=="O"&&bigBoardState[1][1]=="O"&&bigBoardState[2][1]=="O")||(bigBoardState[0][2]=="O"&&bigBoardState[1][2]=="O"&&bigBoardState[2][2]=="O")
    //Checks for diagonals
    ||(bigBoardState[0][0]=="O"&&bigBoardState[1][1]=="O"&&bigBoardState[2][2]=="O")||(bigBoardState[0][2]=="O"&&bigBoardState[1][1]=="O"&&bigBoardState[2][0]=="O")
    ){
        removeAvailability("*");
        window.alert("O Won!!!")
        document.getElementById("reset-button").style.display = "inline-block";
    }
}

function convertSquaretoRowCol(square){
    var squareInt = parseInt(square);
    var row;
    var col = squareInt%3; 

    if (squareInt < 3){
        row=0
    } else if(squareInt <6 && squareInt >= 3) {
        row=1
    } else {
        row=2
    }
    return [row,col]
}

function resetBoard(){
    let images = document.getElementsByTagName("img");
    for (i of images){
        i.classList.remove("small-sign")
        i.classList.remove("XWon")
        i.classList.remove("OWon")
        i.classList.add("child-square")
        i.classList.add("available")
        i.setAttribute("src","images/Transparent.png")
    }
    document.getElementById("reset-button").style.display = "none";
    boardState = [[["available", "available", "available"],["available", "available", "availabe"],["available", "available", "availabe"]],[["available", "available", "availabe"],["available", "available", "availabe"],["available", "available", "availabe"]],[["available", "available", "availabe"],["available", "available", "availabe"],["available", "available", "availabe"]],[["available", "available", "availabe"],["available", "available", "availabe"],["available", "available", "availabe"]],[["available", "available", "availabe"],["available", "available", "availabe"],["available", "available", "availabe"]],[["available", "available", "availabe"],["available", "available", "availabe"],["available", "available", "availabe"]],[["available", "available", "availabe"],["available", "available", "availabe"],["available", "available", "availabe"]],[["available", "available", "availabe"],["available", "available", "availabe"],["available", "available", "availabe"]],[["available", "available", "availabe"],["available", "available", "availabe"],["available", "available", "availabe"]]];
    bigBoardState = [["available", "available", "available"],["available", "available", "availabe"],["available", "available", "availabe"]];
}