export class BoardRenderer {
    allDirs = ''

    constructor(allDirs) {
        this.allDirs = allDirs;
    }

    renderBoard(map, position) {
        let currentField = map[position.h][position.w];
        document.getElementById('msg-text').innerText = currentField.msg;
        document.getElementById('dir-text').innerText = currentField.dir;

        let mainImg = document.getElementById('main-image');
        mainImg.style.backgroundColor = currentField.color;
        let src = "" + (position.h + 1) + (position.w + 1);
        mainImg.src = 'assets/img/' + (position.h + 1) + '/' + src + '.gif'

        let dirs = currentField.dir.split(', ');
        for (let i = 0; i < this.allDirs.length; i++) {
            let el = document.getElementById('hide-' + this.allDirs[i].charAt(0).toLowerCase());
            el.style.visibility = !dirs.includes(this.allDirs[i]) ? 'visible' : 'hidden';
        }

        let textField = document.getElementById('see-text');
        if (currentField.itemId !== 0) {
            for (const i of items) {
                if (currentField.itemId === i.id) {
                    textField.innerText = "You see " + i.title;
                    break;
                } else {
                    textField.innerText = "You see nothing";
                }
            }
        } else {
            textField.innerText = "You see nothing";
        }
        return dirs;
    }
}