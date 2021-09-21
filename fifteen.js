"use strict;"


class Game {
    constructor() {

    }
}

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
            await new Promise(resolve => setTimeout(resolve, 10));
            this.AutoShift();
            this.Display();
        }
    }
    Instantiate() {
        let tCounter = 0;
        for (let t of this.board) {
            t.style = "background-position-y: " + (-5*(tCounter%4))+ "em; background-position-x: " + (-5*(Math.floor(tCounter/4)))+ "em;"
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
    }
    CheckShift(num) { //Checks to see if the tile has an empty space nearby
        console.log("Checking " + num)
        let emptySpot = this.board.indexOf(1);
        if (num % 4 > 0 && num-1 == emptySpot
            || num % 4 < 3 && num+1 == emptySpot 
            || Math.floor(num/4) > 0 && num-4 == emptySpot
            || Math.floor(num/4) < 3 && num+4 == emptySpot) {
                console.log("valid")
                this.board[emptySpot] = this.board[num];
                this.board[num] = 1;
        }
        this.Display();
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
        console.log(availableTiles)
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

async function StartGame() {
    //Wait so that the html loads, and we can access it
    await new Promise(resolve => setTimeout(resolve, 100));
    game = new Game();
    tiles = new Tiles();
    tiles.Display();
    tiles.Shuffle();
}

StartGame();