    import {Field} from "./Field.js";
import {InputHandler} from "./inputHandler.js";

export class Game {
    map = Array.from(Array(6), _ => Array(7).fill(undefined));
    position = {w: 6, h: 3}
    inputHandler = new InputHandler();
    vocabShown = false;
    gossipsShown = false;

    start() {
        console.log("game started!")

        document.onkeydown = () => {
            if (this.vocabShown) {
                this.inputHandler.printMsg(false, 'vocab-layout');
                this.vocabShown = false;
            }
            if (this.gossipsShown) {
                this.inputHandler.printMsg(false, 'gossips-layout');
                this.gossipsShown = false;
            }
        };

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

    checkInput(str) {
        let cmd = str.split(' ')[0];

        if (cmd === 'TAKE' || cmd === 'T') {
            this.take();
        } else if (cmd === 'DROP' || cmd === 'D') {
            this.drop();
        } else if (cmd === 'USE' || cmd === 'U') {
            this.use();
        } else if (cmd === 'VOCABULARY' || cmd === 'V') {
            this.vocabShown = true;
            this.inputHandler.printMsg(true, 'vocab-layout');
        } else if (cmd === 'GOSSIPS' || cmd === 'G') {
            this.gossipsShown = true;
            this.inputHandler.printMsg(true, 'gossips-layout');
        }
    }

    take() {
        console.log('take')
    }

    drop() {
        console.log('drop')
    }

    use() {

    }

}

