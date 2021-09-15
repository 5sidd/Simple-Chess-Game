let squares = Array.from(document.querySelectorAll(".square"));
revert();

// colors all the squares in
function revert() {
    let isBrown = false;
    let ends = [7, 15, 23, 31, 39, 47, 55, 63];
    
    for (let i = 0; i < squares.length; i++) {
        if (isBrown) {
            squares[i].style.backgroundColor = "#996240";
        }
        else {
            squares[i].style.backgroundColor = "white";
        }
        if (ends.includes(i) && i !== 0) {
            if (squares[i].backgroundColor === "#996240") {
                isBrown = isBrown;
            }
            else {
                isBrown = isBrown;
            }
        }
        else {
            isBrown = !isBrown;
        }
    }    
}

//sets ids
let letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
let numbers = ["8", "7", "6", "5", "4", "3", "2", "1"];
let counter = 0;

for (let i = 0; i < 8; i++) {
    for (let b = 0; b < 8; b++) {
        squares[counter].id = letters[b] + numbers[i];
        counter = counter + 1;
    }
}

//adds unicode symbols of all pieces into two arrays
let whitePieces = [];
let blackPieces = [];

for (let i = 0; i < 9; i++) {
    blackPieces.push(squares[i].textContent);
}

for (let i = 55; i < 64; i++) {
    whitePieces.push(squares[i].textContent);
}

console.log(whitePieces);
console.log(blackPieces);

let allTheKeys = document.querySelector(".keys");
let inputHeader = document.querySelector(".input");
let givenInputs = document.querySelector(".inputs");
let whereTo = document.querySelector(".where-to");
// Make A Move Manipulator

let inputs = Array.from(document.querySelectorAll(".key"));

let selectPiece = document.querySelector(".entered");
let movePiece = document.querySelector(".entered2");

let clear1 = document.querySelector('.clear');
let ok1 = document.querySelector('.ok');
let clear2 = document.querySelector('.clear2');
let ok2 = document.querySelector('.ok2');
let ret = document.querySelector(".return");
let isInvalid = document.querySelector(".is-invalid");
let deadPieces = document.querySelector(".dead-pieces");
let whenPromoting = document.querySelector('.when-promoting');
let promotionOptions = Array.from(document.querySelectorAll('.promote-option'));
let check = document.querySelector('.check');
let gameOver = false;
let removedPieces = document.querySelector('.dead-pieces');
let restart = document.querySelector('.restart')

//to know whether to write in the first or second input box
let input1 = true;
let input2 = false;

//to know what color's turn it is
let whiteTurn = true;
let blackTurn = false;

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('click', () => {
        isInvalid.textContent = "";
        if (selectPiece.textContent.length <= 3 && input1) {
            selectPiece.textContent = selectPiece.textContent + inputs[i].textContent;
        }
        else if (movePiece.textContent.length <= 3 && input2){
            movePiece.textContent = movePiece.textContent + inputs[i].textContent;
        }
    });
}

ok1.addEventListener('click', () => {
    if (selectPiece.textContent === "") {
        isInvalid.textContent = "Invalid Input, Try Again";
        selectPiece.textContent = "";
        input1 = true;
        input2 = false;
    }
    else {
        input1 = false;
        input2 = true;
        checkpoint1();
        checkPoint2();
        highlight(checkPoint3(selectPiece.textContent.replace(/\s/g, '')));
    }
});



ok2.addEventListener('click', () => {
    checkMate();
    if (input1) {
        isInvalid.textContent = "Invalid Input, Try Again";
        selectPiece.textContent = "";
        input1 = true;
        input2 = false;
    }
    input1 = true;
    input2 = false;
    checkpoint1();
    if (!checkPoint4(checkPoint3(selectPiece.textContent.replace(/\s/g, '')))) {
        isInvalid.textContent = "Invalid Input, Try Again";
        movePiece.textContent = "";
        input1 = false;
        input2 = true;
    }
    else {
        revert();
        transportPiece();
        if (!pawnPromotion()) {
            clear3();
            //kingChecker();
        }
    }
});

//clears everything so that user can rewrite their inputs
ret.addEventListener('click', () => {
    input1 = true;
    input2 = false;
    selectPiece.textContent = "";
    movePiece.textContent = "";
    isInvalid.textContent = "";
    revert();
});

clear1.addEventListener('click', () => {
    selectPiece.textContent = "";
    input1 = true;
    input2 = false;
    revert();
});

clear2.addEventListener('click', () => {
    movePiece.textContent = "";
});

function clear3() {
    selectPiece.textContent = "";
    movePiece.textContent = "";
    isInvalid.textContent = "";
    whiteTurn = !whiteTurn;
    blackTurn = !blackTurn;
}

//checks if the input is a valid chess coordinate
function checkpoint1() {
    if (input1 === false) {
        let parts = selectPiece.textContent.split("");
        if (numbers.includes(parts[1])) {
            isInvalid.textContent = "Invalid Input, Try Again";
            selectPiece.textContent = "";
            input1 = true;
            input2 = false;
        }
        else if (letters.includes(parts[4])) {
            isInvalid.textContent = "Invalid Input, Try Again";
            selectPiece.textContent = "";
            input1 = true;
            input2 = false;
        }
    }
    else {
        let parts = movePiece.textContent.split("");
        if (numbers.includes(parts[1])) {
            isInvalid.textContent = "Invalid Input, Try Again";
            movePiece.textContent = "";
            input1 = false;
            input2 = true;
        }
        else if (letters.includes(parts[4])) {
            isInvalid.textContent = "Invalid Input, Try Again";
            movePiece.textContent = "";
            input1 = false;
            input2 = true;
        }
    }
}

//checks white or black turn, and if the selected coordinate is empty or not
function checkPoint2() {
    let chosen = selectPiece.textContent.replace(/\s/g, '');
    let selectedCoordinate = document.querySelector("#" + chosen);
    if (whitePieces.includes(selectedCoordinate.textContent) || blackPieces.includes(selectedCoordinate.textContent)) {
        if (blackPieces.includes(selectedCoordinate.textContent) && whiteTurn) {
            isInvalid.textContent = "Invalid Input, Try Again";
            selectPiece.textContent = "";
            input1 = true;
            input2 = false;
        }
        else if (whitePieces.includes(selectedCoordinate.textContent) && blackTurn) {
            isInvalid.textContent = "Invalid Input, Try Again";
            selectPiece.textContent = "";
            input1 = true;
            input2 = false;
        }
    }
    else {
        isInvalid.textContent = "Invalid Input, Try Again";
        selectPiece.textContent = "";
        input1 = true;
        input2 = false;
    }
}

// identifies piece and returns array of available moves
function checkPoint3(chosen) {
    let identifiedPiece = document.querySelector("#" + chosen).textContent;

    if (identifiedPiece === whitePieces[0]) {
        return whitePawn(chosen);
    }
    else if (identifiedPiece === blackPieces[8]) {
        return blackPawn(chosen);
    }
    else if (identifiedPiece === whitePieces[1] || identifiedPiece === blackPieces[0]) {
        return allStraights(chosen);
    }
    else if (identifiedPiece === whitePieces[2] || identifiedPiece === blackPieces[1]) {
        return knight(chosen);
    }
    else if (identifiedPiece === whitePieces[3] || identifiedPiece === blackPieces[2]) {
        return allDiagonals(chosen);
    }
    else if (identifiedPiece === whitePieces[4] || identifiedPiece === blackPieces[3]) {
        return queen(chosen);
    }
    else if (identifiedPiece === whitePieces[5] || identifiedPiece === blackPieces[4]) {
        return king(chosen);
    }
}

// checks whether the place the piece is being moved to is an eligible move or not
function checkPoint4(eligibleMoves) {
    let chosen = movePiece.textContent.replace(/\s/g, '');
    if (eligibleMoves.includes(chosen)) {
        return true;
    }
    return false;
}
//white pawn available moves (raw)
function whitePawn(chosen) {
    //let chosen = selectPiece.textContent.replace(/\s/g, '');
    let availableMoves = [];
    let vertical = +chosen[1];

    availableMoves.push(chosen[0] + (vertical + 1).toString());
    if (chosen[1] === "2") {
        availableMoves.push(chosen[0] + (vertical + 2).toString());
    }

    let situation1 = letters[letters.indexOf(chosen[0]) + 1];
    let situation2 = letters[letters.indexOf(chosen[0]) - 1];

    let squares = []
    squares.push(situation1 + (vertical + 1).toString());
    squares.push(situation2 + (vertical + 1).toString());

    let result1 = filterPawn1(availableMoves);
    let result2 = filterPawn2(squares);

    return result1.concat(result2);
}

//black pawn available moves
function blackPawn(chosen) {
    //let chosen = selectPiece.textContent.replace(/\s/g, '');
    let availableMoves = [];
    let vertical = +chosen[1];

    availableMoves.push(chosen[0] + (vertical - 1).toString());
    if (chosen[1] === "7") {
        availableMoves.push(chosen[0] + (vertical - 2).toString());
    }

    let situation1 = letters[letters.indexOf(chosen[0]) + 1];
    let situation2 = letters[letters.indexOf(chosen[0]) - 1];

    let squares = []
    squares.push(situation1 + (vertical - 1).toString());
    squares.push(situation2 + (vertical - 1).toString());

    let result1 = filterPawn1(availableMoves);
    let result2 = filterPawn2(squares);

    return result1.concat(result2);
}
//helper function1 to filter pawns
function filterPawn1(moves) {
    for (let i = 0; i < moves.length; i++) {
        let current = document.querySelector("#" + moves[i]);
        if (whitePieces.includes(current.textContent) || blackPieces.includes(current.textContent)) {
            moves.splice(i, 1);
            i = i - 1;
        }
    }
    return moves;
}

//helper function2 to filter pawns
function filterPawn2(moves) {
    let isWhite = whiteTurn;
    let isBlack = blackTurn;

    for (let i = 0; i < moves.length; i++) {
        let current = document.querySelector("#" + moves[i]);
        if (current == null) {
            moves.splice(i, 1);
            i = i - 1;
        }
        else {
            if ((isWhite && blackPieces.includes(current.textContent)) || (isBlack && whitePieces.includes(current.textContent))) {

            }
            else {
                moves.splice(i, 1);
                i = i - 1;
            }
        }
    }
    return moves;
}

//helper function which filters knight and king moves
function filterKnightKing(moves) {
    let isWhite = whiteTurn;
    let isBlack = blackTurn;

    for (let i = 0; i < moves.length; i++) {
        let current = document.querySelector("#" + moves[i]);
        if ((whitePieces.includes(current.textContent) && isWhite) || (blackPieces.includes(current.textContent) && isBlack)) {
            moves.splice(i, 1);
            i = i - 1;
        }
    }
    return moves;
}

// helper function which highlights all squares vertical and horizonal to the selected square, also filters
function allStraights(chosen) {
    //let chosen = selectPiece.textContent.replace(/\s/g, '');
    let availableMoves = []

    let isWhite = whiteTurn;
    let isBlack = blackTurn;

    let continueAdding1 = true;
    let continueAdding2 = true;
    let continueAdding3 = true;
    let continueAdding4 = true;

    let startVertical = +chosen[1];
    let startHorizontal = letters.indexOf(chosen[0]);

    for (let i = startVertical - 1; i >= 1; i--) {
        let current = document.querySelector("#" + chosen[0] + i.toString());
        if ((isWhite && whitePieces.includes(current.textContent)) || (isBlack && blackPieces.includes(current.textContent))) {
            continueAdding1 = false;
        }
        if (continueAdding1) {
            availableMoves.push(chosen[0] + i.toString());
        }
        if ((isWhite && blackPieces.includes(current.textContent)) || (isBlack && whitePieces.includes(current.textContent))) {
            continueAdding1 = false;
        }
    }
    for (let i = startVertical + 1; i <= 8; i++) {
        let current = document.querySelector("#" + chosen[0] + i.toString());
        if ((isWhite && whitePieces.includes(current.textContent)) || (isBlack && blackPieces.includes(current.textContent))) {
            continueAdding2 = false;
        }
        if (continueAdding2) {
            availableMoves.push(chosen[0] + i.toString());
        }
        if ((isWhite && blackPieces.includes(current.textContent)) || (isBlack && whitePieces.includes(current.textContent))) {
            continueAdding2 = false;
        }
    }

    for (let i = startHorizontal - 1; i >= 0; i--) {
        let current = document.querySelector("#" + letters[i] + chosen[1]);
        if ((isWhite && whitePieces.includes(current.textContent)) || (isBlack && blackPieces.includes(current.textContent))) {
            continueAdding3 = false;
        }
        if (continueAdding3) {
            availableMoves.push(letters[i] + chosen[1]);
        }
        if ((isWhite && blackPieces.includes(current.textContent)) || (isBlack && whitePieces.includes(current.textContent))) {
            continueAdding3 = false;
        }
    }

    for (let i = startHorizontal + 1; i < letters.length; i++) {
        let current = document.querySelector("#" + letters[i] + chosen[1]);
        if ((isWhite && whitePieces.includes(current.textContent)) || (isBlack && blackPieces.includes(current.textContent))) {
            continueAdding4 = false;
        }
        if (continueAdding4) {
            availableMoves.push(letters[i] + chosen[1]);
        }
        if ((isWhite && blackPieces.includes(current.textContent)) || (isBlack && whitePieces.includes(current.textContent))) {
            continueAdding4 = false;
        }
    }
    return availableMoves;
}

//helper function which highlights all squares diagonal to a selected square
function allDiagonals(chosen) {
    //let chosen = selectPiece.textContent.replace(/\s/g, '');
    let tempNums = ["1", "2", "3", "4", "5", "6", "7", "8"];
    let availableMoves1 = [];
    let availableMoves2 = [];
    let availableMoves3 = [];
    let availableMoves4 = [];

    let chosenHorizontal = letters.indexOf(chosen[0]);
    let chosenVertical = tempNums.indexOf(chosen[1]);

    temp1 = chosenHorizontal;
    temp2 = chosenVertical;
    while (true) {
        if (temp1 === tempNums.length - 1 || temp2 === tempNums.length - 1 ) {
            break;
        }
        temp1 = temp1 + 1;
        temp2 = temp2 + 1;
        availableMoves1.push(letters[temp1] + tempNums[temp2])
    }

    temp3 = chosenHorizontal;
    temp4 = chosenVertical;
    while (true) {
        if (temp3 === 0 || temp4 === 0) {
            break;
        }
        temp3 = temp3 - 1;
        temp4 = temp4 - 1;
        availableMoves2.push(letters[temp3] + tempNums[temp4])
    }

    temp5 = chosenHorizontal;
    temp6 = chosenVertical;
    while (true) {
        if (temp5 === tempNums.length - 1 || temp6 === 0) {
            break;
        }
        temp5 = temp5 + 1;
        temp6 = temp6 - 1;
        availableMoves3.push(letters[temp5] + tempNums[temp6])
    }

    temp7 = chosenHorizontal;
    temp8 = chosenVertical;
    while (true) {
        if (temp7 === 0 || temp8 === tempNums.length - 1 ) {
            break;
        }
        temp7 = temp7 - 1;
        temp8 = temp8 + 1;
        availableMoves4.push(letters[temp7] + tempNums[temp8])
    }

    let results1 = filterDiagonals(availableMoves1);
    let results2 = filterDiagonals(availableMoves2);
    let results3 = filterDiagonals(availableMoves3);
    let results4 = filterDiagonals(availableMoves4);

    return results1.concat(results2, results3, results4);
}

function filterDiagonals(moves) {
    let isWhite = whiteTurn;
    let isBlack = blackTurn;
    let availableMoves = [];

    let continueAdding = true;

    for (let i = 0; i < moves.length; i++) {
        let current = document.querySelector("#" + moves[i]);
        if (continueAdding === false) {
            break;
        }
        if ((isWhite && whitePieces.includes(current.textContent)) || (isBlack && blackPieces.includes(current.textContent))) {
            continueAdding = false;
        }
        if (continueAdding) {
            availableMoves.push(moves[i]);
        }
        if ((isWhite && blackPieces.includes(current.textContent)) || (isBlack && whitePieces.includes(current.textContent))) {
            continueAdding = false;
        }
    }

    return availableMoves;
}
//knight available moves (raw)
function knight(chosen) {
    tempNums = ["1", "2", "3", "4", "5", "6", "7", "8"];
    //let chosen = selectPiece.textContent.replace(/\s/g, '');
    let availableMoves = [];

    let horizontal = letters.indexOf(chosen[0]);
    let vertical = tempNums.indexOf(chosen[1]);

    let vertical1 = vertical + 2;
    let horizontal1 = horizontal + 1;
    let vertical2 = vertical - 2;
    let horizontal2 = horizontal - 1;
    
    availableMoves.push(letters[horizontal1] + tempNums[vertical1]);
    availableMoves.push(letters[horizontal2] + tempNums[vertical1]);
    availableMoves.push(letters[horizontal1] + tempNums[vertical2]);
    availableMoves.push(letters[horizontal2] + tempNums[vertical2]);

    let vertical3 = vertical + 1;
    let vertical4 = vertical - 1;
    let horizontal3 = horizontal + 2;
    let horizontal4 = horizontal - 2;

    availableMoves.push(letters[horizontal3] + tempNums[vertical3]);
    availableMoves.push(letters[horizontal3] + tempNums[vertical4]);
    availableMoves.push(letters[horizontal4] + tempNums[vertical3]);
    availableMoves.push(letters[horizontal4] + tempNums[vertical4]);

    for (let i = 0; i < availableMoves.length; i++) {
        let temp = document.querySelector("#" + availableMoves[i]);
        if (temp == null) {
            availableMoves.splice(i, 1);
            i = i - 1;
        }
    }

    return filterKnightKing(availableMoves);
}

//king available moves (raw)
function king(chosen) {
    tempNums = ["1", "2", "3", "4", "5", "6", "7", "8"];
    //let chosen = selectPiece.textContent.replace(/\s/g, '');
    let availableMoves = [];

    let horizontal = letters.indexOf(chosen[0]);
    let vertical = tempNums.indexOf(chosen[1]);

    let horizontal1 = horizontal + 1;
    let horizontal2 = horizontal - 1;
    let vertical1 = vertical + 1;
    let vertical2 = vertical - 1;

    availableMoves.push(letters[horizontal] + tempNums[vertical1]);
    availableMoves.push(letters[horizontal] + tempNums[vertical2]);
    availableMoves.push(letters[horizontal1] + tempNums[vertical]);
    availableMoves.push(letters[horizontal2] + tempNums[vertical]);
    availableMoves.push(letters[horizontal1] + tempNums[vertical1]);
    availableMoves.push(letters[horizontal1] + tempNums[vertical2]);
    availableMoves.push(letters[horizontal2] + tempNums[vertical1]);
    availableMoves.push(letters[horizontal2] + tempNums[vertical2]);

    for (let i = 0; i < availableMoves.length; i++) {
        let temp = document.querySelector("#" + availableMoves[i]);
        if (temp == null) {
            availableMoves.splice(i, 1);
            i = i - 1;
        }
    }

    return filterKnightKing(availableMoves);
}

//queen available moves (raw)
function queen(chosen) {
    //let chosen = selectPiece.textContent.replace(/\s/g, '');
    let availableMoves = [];
    let straights = allStraights(chosen);
    let diagonals = allDiagonals(chosen);
    
    for (let i = 0; i < straights.length; i++) {
        availableMoves.push(straights[i]);
    }

    for (let i = 0; i < diagonals.length; i++) {
        availableMoves.push(diagonals[i]);
    }

    return availableMoves;
}

//highlights all available moves for a selected piece
function highlight(moves) {
    for (let i = 0; i < moves.length; i++) {
        let coordinate = document.querySelector("#" + moves[i]);
        coordinate.style.backgroundColor = "yellow";
    }
}

// moves piece from the selected square to the intended destination
function transportPiece() {
    let pieceToBeMoved = document.querySelector("#" + selectPiece.textContent.replace(/\s/g, ''));
    let destination = document.querySelector("#" + movePiece.textContent.replace(/\s/g, ''));
    let temp = -1;

    if (destination.textContent.length > 0) {
        deadPieces.textContent = deadPieces.textContent + destination.textContent;
    }
    if (whiteTurn) {
        temp = whitePieces.indexOf(pieceToBeMoved.textContent);
        destination.textContent = whitePieces[temp];
    }
    else if (blackTurn) {
        temp = blackPieces.indexOf(pieceToBeMoved.textContent);
        destination.textContent = blackPieces[temp];
    }
    pieceToBeMoved.textContent = "";
}


// if pawn reaches the end of the board, it initiates the promotion process
function pawnPromotion() {
    checkMate();
    //kingChecker();
    if (!checkMate() /*&& !kingChecker*/) {
        let destination = document.querySelector("#" + movePiece.textContent.replace(/\s/g, ''));
        if ((destination.id[1] === '8'  && destination.textContent === whitePieces[0]) || (destination.id[1] === '1' && destination.textContent === blackPieces[8])) {
            allTheKeys.style.display = "none";
            inputHeader.style.display = "none";
            givenInputs.style.display = "none";
            whereTo.style.display = "none";
            whenPromoting.style.display = "flex";
            return true;
        }
        return false;
    }
}


// pawn promotion helper
for (let i = 0; i < promotionOptions.length; i++) {
    promotionOptions[i].addEventListener('click', () => {
        whenPromoting.style.display = "none";
        allTheKeys.style.display = "block";
        inputHeader.style.display = "block";
        givenInputs.style.display = "block";
        whereTo.style.display = "block";
        promotionTransformation(i);
    })
}

//pawn promotion helper
function promotionTransformation(num) {
    let destination = document.querySelector("#" + movePiece.textContent.replace(/\s/g, ''));
    if (whiteTurn) {
        if (num == 0) {
            destination.textContent = whitePieces[4];
        }
        else if (num == 1) {
            destination.textContent = whitePieces[2];
        }
        else if (num == 2) {
            destination.textContent = whitePieces[3];
        }
        else if (num == 3) {
            destination.textContent = whitePieces[1];
        }

    }
    if (blackTurn) {
        if (num == 0) {
            destination.textContent = blackPieces[3];
        }
        else if (num == 1) {
            destination.textContent = blackPieces[1];
        }
        else if (num == 2) {
            destination.textContent = blackPieces[2];
        }
        else if (num == 3) {
            destination.textContent = blackPieces[0];
        }
    }
    clear3();
}

function kingChecker() {
    let defaultWhiteTurn = whiteTurn;
    let defualtBlackTurn = blackTurn;

    whiteTurn = true;
    blackTurn = true;

    let whiteKing = squares.filter(s => s.textContent === whitePieces[5]);
    let blackKing = squares.filter(s => s.textContent === blackPieces[4]);

    let whiteSquares = squares.filter(s => whitePieces.includes(s.textContent));
    let blackSquares = squares.filter(s => blackPieces.includes(s.textContent));

    if (whiteSquares.some(s => checkPoint3(s.id).includes(blackKing[0].id))) {
        check.textContent = 'Black King Checked'
        blackKing[0].style.backgroundColor = 'red';
        whiteTurn = defaultWhiteTurn;
        blackTurn = defualtBlackTurn;
        return true;
    }
    if (blackSquares.some(s => checkPoint3(s.id).includes(whiteKing[0].textContent))) {
        check.textContent = "White King Checked";
        whiteKing[0].style.backgroundColor = 'red';
        whiteTurn = defaultWhiteTurn;
        blackTurn = defualtBlackTurn;
        return true;
    }
    if (!whiteSquares.some(s => checkPoint3(s.id).includes(blackKing[0].id)) &&
    !blackSquares.some(s => checkPoint3(s.id).includes(whiteKing[0].textContent))) {
        check.textContent = '';
        whiteTurn = defaultWhiteTurn;
        blackTurn = defualtBlackTurn;
        return false;
    }
}

//see if there is a checkmate
function checkMate() {
    if (removedPieces.textContent.includes(blackPieces[4]) || removedPieces.textContent.includes(whitePieces[5])) {
        if (removedPieces.textContent.includes(blackPieces[4])) {
            check.textContent = "Checkmate! White Wins";
        }
        if (removedPieces.textContent.includes(whitePieces[5])) {
            check.textContent = "Checkmate! Black Wins";
        }
        endGame();
        return true;
    }
    return false;
}

function endGame() {
    document.querySelector('.move').style.display = 'none';
}

function restartGame() {
    revert();
    clear3();
    check.textContent = '';
    removedPieces.textContent = '';
    squares.forEach(s => s.textContent = '');
    for (let i = 0; i < 8; i++) {
        squares[i].textContent = blackPieces[i];
    }
    for (let i = 8; i < 16; i++) {
        squares[i].textContent = blackPieces[8];
    }
    let c = 1;
    for (let i = 48; i < 56; i++) {
        squares[i].textContent = whitePieces[0];
    }
    for (let i = 56; i < 64; i++) {
        squares[i].textContent = whitePieces[c];
        c = c + 1;
    }
    document.querySelector('.move').style.display = 'block';
}

restart.addEventListener('click', () => {
    restartGame();
})