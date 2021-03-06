import {Field} from "./Field.js";
import {InputHandler} from "./InputHandler.js";
import {BoardRenderer} from "./BoardRenderer.js";

export class Game {
    map = Array.from(Array(6), _ => Array(7).fill(undefined));
    allDirs = ['WEST', 'SOUTH', 'EAST', 'NORTH']
    dirs;
    position = {w: 1, h: 0} //6, 3
    itemInBackpack = 0; //0
    milestones = 0; //0
    inputHandler = new InputHandler();
    boardRenderer = new BoardRenderer(this.allDirs);

    start() {
        console.log("game started!")

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
            this.inputHandler.findItemById(this.itemInBackpack),
        );
    }

    genBoard() {
        for (const e of entries) {
            this.map[e.h][e.w] = new Field(e.w, e.h, e.msg, e.color, e.dir, []);
            this.map[e.h][e.w].itemId.push(e.itemId);
        }
    }

    checkInput(input) {
        input = input.toUpperCase();
        console.log('input entered')
        let cmd = input.split(' ')[0];
        cmd = this.replaceDir(cmd);

        if (cmd === 'TAKE' || cmd === 'T') this.take(input);
        else if (cmd === 'DROP' || cmd === 'D')
            this.drop(input);
        else if (cmd === 'USE' || cmd === 'U')
            this.use(input);
        else if (cmd === 'VOCABULARY' || cmd === 'V')
            this.inputHandler.printMsg('vocab-layout');
        else if (cmd === 'GOSSIPS' || cmd === 'G') {
            this.inputHandler.printMsg('gossips-layout');
        } else if (this.allDirs.includes(cmd)) {
            this.position = this.inputHandler.checkDirection(this.position, cmd, this.dirs, this.milestones);
            this.dirs = this.boardRenderer.renderBoard(this.map, this.position,
                this.inputHandler.findItemById(this.itemInBackpack));
        } else {
            this.inputHandler.showQuickMsg("Try another word or V for vocabulary");
        }
    }

    take(str) {
        if (this.itemInBackpack === 0) {
            let id = this.inputHandler.take(this.map, this.position, str.split(' ')[1]);
            this.boardRenderer.setSeeText(this.map[this.position.h][this.position.w])
            if (id !== undefined && id !== -1) {
                this.itemInBackpack = id
            }
        } else
            this.inputHandler.showQuickMsg('You are carrying something')
    }

    use(input) {
        let values = this.inputHandler.use(this.position, this.itemInBackpack, input);
        if (values.m === 0){
            this.itemInBackpack = values.id;
        } else {
            this.itemInBackpack = 0;
            this.milestones++;
            this.map[3][2].itemId.push(values.id);
            if (this.milestones === 6) {
                this.map[3][2].itemId = [];
                this.inputHandler.showQuickMsg(events[14].message);
                this.itemInBackpack = 37;
            }
        }
        this.boardRenderer.setBackpackText(this.inputHandler.findItemById(this.itemInBackpack));
        this.boardRenderer.setSeeText(this.map[this.position.h][this.position.w]);
    }

    drop(str) {
        const dropped = this.inputHandler.drop(this.map, this.position, this.itemInBackpack, str.split(' ')[1]);
        if (dropped) {
            const field = this.map[this.position.h][this.position.w]
            field.itemId.push(this.itemInBackpack);
            this.itemInBackpack = 0;
            this.boardRenderer.setSeeText(field);
            this.boardRenderer.setBackpackText(this.itemInBackpack);
        }
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

