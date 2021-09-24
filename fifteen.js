"use strict;"

class Tiles {
    constructor() {
        this.board = new Array();
        for (let d of document.getElementById("puzzlearea").children)
            this.board.push(d);
        this.Instantiate();
        this.board.push(1);
        console.log(this.board);
    }
    async Shuffle() {
        for (let i = 0; i < 100; i++) {
            //await new Promise(resolve => setTimeout(resolve, 10)); //Bring this back if you want animations
            this.AutoShift();
            this.Display();
        }
    }
    Instantiate() {
        let tCounter = 0;
        for (let t of this.board) {
            t.style = "background-position-y: " + (-100*(tCounter%4))+ "px; background-position-x: " + (-100*(Math.floor(tCounter/4)))+ "px;"
            tCounter++;
        }
    }
    Display() {
        let counter = 0;
        for(let b of this.board) {
            if (b != 1) { //Ignore the null, as I'm using it for the space
                let rString = "row" + counter%4;
                let cString = "col" + Math.floor(counter/4);
                b.className = rString + " " + cString;
                let ctmp = counter;
                b.onclick = function () {eval(ShiftTile(ctmp))};
            }
            counter++;
        }
        this.CheckHoverables()
    }
    CheckShift(num) { //Checks to see if the tile has an empty space nearby
        console.log("Checking " + num)
        let emptySpot = this.board.indexOf(1);
        if (this.CheckNextToEmpty(num)) {
                console.log("valid")
                this.board[emptySpot] = this.board[num];
                this.board[num] = 1;
        }
        this.Display();
    }
    CheckHoverables() { //Add and remove hoverable class, should only be run from Display()  
        for (let num = 0; num < this.board.length; num++) {
            if (this.CheckNextToEmpty(num)) {
                    this.board[num].className += " hoverable"
            }
        }
    }
    CheckNextToEmpty(num) {
        let emptySpot = this.board.indexOf(1);
        if (num % 4 > 0 && num-1 == emptySpot
                || num % 4 < 3 && num+1 == emptySpot 
                || Math.floor(num/4) > 0 && num-4 == emptySpot
                || Math.floor(num/4) < 3 && num+4 == emptySpot)
                return true;
        return false;
    }
    AutoShift() { //Find spots the empty spot can swap with - used for shuffling
        let availableTiles = new Array();
        let emptySpot = this.board.indexOf(1);
        if (emptySpot < 12)
            availableTiles.push (emptySpot + 4)
        if (emptySpot > 3)
            availableTiles.push (emptySpot - 4)
        if (emptySpot%4 > 0)
            availableTiles.push (emptySpot - 1)
        if (emptySpot%4 < 3)
            availableTiles.push (emptySpot + 1)
        let nextP = Math.round(Math.random() * (availableTiles.length-1))
        let nextPlace = availableTiles[nextP]
        this.board[emptySpot] = this.board[nextPlace];
        this.board[nextPlace] = 1;
    }
}

let game;
let tiles;

function ShiftTile(num) {
    tiles.CheckShift(num);
}

//Wait so that the html loads, and we can access it
window.onload = function () {
    tiles = new Tiles();
    tiles.Display();
    document.getElementById("shufflebutton").onclick = function() {tiles.Shuffle()}
    //tiles.Shuffle();
}

StartGame();