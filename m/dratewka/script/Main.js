import {Field} from "./Field.js";

export class Game {
    map = Array.from(Array(6), _ => Array(7).fill(undefined));
    position = {w: 6, h: 3}

    start() {
        console.log("game started!")

        this.genBoard();

        this.renderBoard();
    }

    genBoard() {
        for (const e of data.entries) {
            this.map[e.h][e.w] = new Field(e.w, e.h, e.msg, e.color, e.dir);
        }
    }

    renderBoard() {
        console.log(this.map)
        let currentField = this.map[this.position.h][this.position.w];
        document.getElementById('msg-text').innerText = currentField.msg;
        document.getElementById('dir-text').innerText = currentField.dir;
        document.getElementById('main-image').style.backgroundColor = currentField.color;
    }
}