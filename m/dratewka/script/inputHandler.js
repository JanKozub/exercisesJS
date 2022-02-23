export class InputHandler {
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
            console.log('You are going ' + cmd.toLowerCase() + '...')
            return pos;
        } else {
            console.log('You can\'t go that way')
        }
    }
}