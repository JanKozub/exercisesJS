export class InputHandler {

    use() {

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
        }, 1500);
    }
}