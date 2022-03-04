import {Field} from "./Field.js";
import {InputHandler} from "./InputHandler.js";
import {BoardRenderer} from "./BoardRenderer.js";

export class Game {
    map = Array.from(Array(6), _ => Array(7).fill(undefined));
    allDirs = ['WEST', 'SOUTH', 'EAST', 'NORTH']
    dirs;
    position = {w: 6, h: 3}
    itemInBackpack = 0;
    inputHandler = new InputHandler();
    boardRenderer = new BoardRenderer(this.allDirs);
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

        let input = document.getElementById('main-input');
        input.onkeydown = (e) => {
            if (e.key === 'Enter') {
                this.checkInput(input.value);
            }
        }

        this.genBoard();

        this.dirs = this.boardRenderer.renderBoard(
            this.map,
            this.position,
            this.inputHandler.findItemByName(this.itemInBackpack)
        );
    }

    genBoard() {
        for (const e of entries) {
            this.map[e.h][e.w] = new Field(e.w, e.h, e.msg, e.color, e.dir, e.itemId);
        }
    }

    checkInput(str) {
        console.log('input entered')
        let cmd = str.split(' ')[0];
        cmd = this.replaceDir(cmd);

        if (cmd === 'TAKE' || cmd === 'T') {
            if (this.itemInBackpack === 0) {
                let id = this.inputHandler.take(this.map, this.position, str.split(' ')[1]);
                if (id !== undefined && id !== -1)
                    this.itemInBackpack = id
            } else
                this.inputHandler.showQuickMsg('You are carrying something')
        } else if (cmd === 'DROP' || cmd === 'D') {
            this.drop();
        } else if (cmd === 'USE' || cmd === 'U') {
            this.inputHandler.use();
        } else if (cmd === 'VOCABULARY' || cmd === 'V') {
            this.vocabShown = true;
            this.inputHandler.printMsg(true, 'vocab-layout');
        } else if (cmd === 'GOSSIPS' || cmd === 'G') {
            this.gossipsShown = true;
            this.inputHandler.printMsg(true, 'gossips-layout');
        } else if (this.allDirs.includes(cmd)) {
            this.position = this.inputHandler.checkDirection(this.position, cmd, this.dirs);
            this.dirs = this.boardRenderer.renderBoard(this.map, this.position);
        }
    }

    drop() {
        console.log('drop')
    }

    replaceDir(cmd) {
        switch (cmd) {
            case 'W':
                return 'WEST';
            case 'E':
                return 'EAST';
            case 'S':
                return 'SOUTH';
            case 'N':
                return 'NORTH';
        }
        return cmd;
    }
}

