export class InputHandler {

    take(map, pos, name) {
        let item = this.findItemByName(name);
        let field = map[pos.h][pos.w]
        if (field.itemId === item.id) {
            if (item.flag === 1) {
                this.showQuickMsg('You are taking ' + item.title);
                document.getElementById('backpack-text').innerText = 'You are carrying ' + item.title;
                return item.id;
            } else{
                this.showQuickMsg('You can\'t carry it')
            }
        } else {
            this.showQuickMsg('There isn\'t anything like that here')
        }
    }

    findItemByName(name) {
        for (const i of items) {
            if (i.name === name) {
                return i;
            }
        }
        return -1;
    }

    use(pos, currentItem) {
        for (const e of events) {
            if (e.h === pos.h && e.w === pos.w && e.used === currentItem) {

            }
        }
    }

    printMsg(swt, layout) {
        let v1;
        let v2;
        if (swt) {
            v1 = 'hidden';
            v2 = 'visible';
        } else {
            v1 = 'visible'
            v2 = 'hidden'
            document.getElementById('main-input').value = '';
        }

        document.getElementById('main-layout').style.visibility = v1;
        document.getElementById(layout).style.visibility = v2;
        document.getElementById('main-input').focus();
    }

    checkDirection(pos, cmd, dirs) {
        if (dirs.includes(cmd)) {
            switch (cmd) {
                case 'NORTH':
                    pos = {w: pos.w, h: pos.h - 1}
                    break;
                case 'EAST':
                    pos = {w: pos.w + 1, h: pos.h}
                    break;
                case 'SOUTH':
                    pos = {w: pos.w, h: pos.h + 1}
                    break;
                case 'WEST':
                    pos = {w: pos.w - 1, h: pos.h}
                    break;
            }
            this.showQuickMsg('You are going ' + cmd + '...');
        } else {
            this.showQuickMsg('You can\'t go that way');
        }
        return pos;
    }

    showQuickMsg(message) {
        let input = document.getElementById('main-input');
        let msg = document.getElementById('msg');
        input.style.visibility = 'hidden';
        msg.innerText = message;
        msg.style.visibility = 'visible';
        setTimeout(() => {
            input.style.visibility = 'visible';
            msg.style.visibility = 'hidden';
            input.value = '';
            input.focus();
        }, 500);
    }
}