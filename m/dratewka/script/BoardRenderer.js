export class BoardRenderer {
    allDirs = ''

    constructor(allDirs) {
        this.allDirs = allDirs;
    }

    renderBoard(map, position, backpackItem) {
        let currentField = map[position.h][position.w];
        document.getElementById('msg-text').innerText = currentField.msg;
        document.getElementById('dir-text').innerText = currentField.dir;

        this.setImg(position, currentField);
        let dirs = this.setAvailableDirections(currentField);
        this.setSeeText(currentField);
        this.setBackpackText(backpackItem);

        return dirs;
    }

    setImg(position, currentField) {
        let mainImg = document.getElementById('main-image');
        mainImg.style.backgroundColor = currentField.color;
        let src = "" + (position.h + 1) + (position.w + 1);
        mainImg.src = 'assets/img/' + (position.h + 1) + '/' + src + '.gif'
    }

    setAvailableDirections(currentField) {
        let dirs = currentField.dir.split(', ');
        for (let i = 0; i < this.allDirs.length; i++) {
            let el = document.getElementById('hide-' + this.allDirs[i].charAt(0).toLowerCase());
            el.style.visibility = !dirs.includes(this.allDirs[i]) ? 'visible' : 'hidden';
        }
        return dirs;
    }

    setSeeText(currentField) {
        let seeText = document.getElementById('see-text');
        let list = []
        if (currentField.itemId.length !== 0) {
            for (const i of items) {
                if (currentField.itemId.includes(i.id)) {
                    list.push(i.title);
                } else {
                    seeText.innerText = "You see nothing";
                }
            }
            if (list.length > 0){
                seeText.innerText = "You see " + list;
            }
        } else {
            seeText.innerText = "You see nothing";
        }
    }

    setBackpackText(item) {
        if (item.id === undefined) {
            document.getElementById('backpack-text')
                .innerText = 'You are carrying nothing';
        } else {
            document.getElementById('backpack-text').innerText = "You are carrying " +item.title;
        }
    }
}