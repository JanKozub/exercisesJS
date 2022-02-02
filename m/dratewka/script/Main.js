import {Field} from "./Field.js";

export class Game {
    map = Array.from(Array(6), _ => Array(7).fill(undefined));

    start() {
        console.log("game started!")

        this.genBoard();
        console.log(this.map)
    }

    genBoard() {
        for (const e of data.entries) {
            this.map[e.h][e.w] = new Field(e.w, e.h, e.msg, e.color, e.dir);
        }
    }
}