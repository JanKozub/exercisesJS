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
}