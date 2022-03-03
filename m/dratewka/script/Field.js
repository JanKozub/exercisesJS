export class Field {
    w = ''
    h = ''
    msg = ''
    color = ''
    dir = ''
    itemId = ''

    constructor(w, h, msg, color, dir, itemId) {
        this.w = w;
        this.h = h;
        this.msg = msg;
        this.color = color;
        this.dir = dir;
        this.itemId = itemId;
    }
}