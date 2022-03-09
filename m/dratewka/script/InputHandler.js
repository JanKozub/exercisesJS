export class InputHandler {
    take(map, pos, name) {
        let item = this.findItemByName(name);
        let field = map[pos.h][pos.w]
        if (field.itemId.includes(item.id)) {
            if (item.flag === 1) {
                this.showQuickMsg('You are taking ' + item.title);
                document.getElementById('backpack-text').innerText = 'You are carrying ' + item.title;
                field.itemId = this.arrayRemove(field.itemId, item.id);
                return item.id;
            } else {
                this.showQuickMsg('You can\'t carry it')
            }
        } else {
            this.showQuickMsg('There isn\'t anything like that here')
        }
    }

    arrayRemove(arr, value) {
        return arr.filter(function (el) {
            return el !== value;
        });
    }

    findItemByName(name) {
        for (const i of items) {
            if (i.name === name) {
                return i;
            }
        }
        return 0;
    }

    findItemById(id) {
        for (const i of items) {
            if (i.id === id) {
                return i;
            }
        }
        return 0;
    }

    drop(map, pos, backpackItemId, targetItem) {
        let item = this.findItemByName(targetItem);
        const field = map[pos.h][pos.w];
        if (backpackItemId === 0) {
            this.showQuickMsg('You are not carrying anything');
        } else if (field.itemId.length > 3) {
            this.showQuickMsg('You can\'t store any more here');
        } else if (backpackItemId !== item.id) {
            this.showQuickMsg('You are not carrying it');
        } else {
            this.showQuickMsg('You are about to drop ' + item.title);
            return true;
        }
        return false;
    }

    use(pos, currentItem, input) {
        if (this.findItemByName(input.split(' ')[1]).id !== currentItem) {
            this.showQuickMsg("You aren't carrying anything like that");
            return {id: -1, m: 0};
        }

        for (const e of events) {
            if (e.h === pos.h && e.w === pos.w && e.used === currentItem) {
                this.showQuickMsg(e.message);
                return {id: e.result, m: e.milestone};
            }
        }
        this.showQuickMsg("Nothing happened");
        return -1;
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
        const messages = message.split("(t)");
        console.log(messages)
        let input = document.getElementById('main-input');
        let msg = document.getElementById('msg');
        input.style.visibility = 'hidden';
        msg.innerText = messages[0];
        msg.style.visibility = 'visible';

        setTimeout(() => {
            input.style.visibility = 'visible';
            msg.style.visibility = 'hidden';
            input.value = '';
            input.focus();
            if (messages.length > 1) {
                messages.shift();
                this.showQuickMsg(messages.join())
            }
        }, 1000);
    }
}