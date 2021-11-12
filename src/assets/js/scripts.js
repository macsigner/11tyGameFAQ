'use strict';

document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

class UnderlineVars {
    constructor(el) {
        this.el = el;
        this.el.style.setProperty('--underlines', this.getLengthAsSymbol());
        this.el.style.setProperty('--lines', this.getLengthAsSymbol('-'));
        this.el.style.setProperty('--hashes', this.getLengthAsSymbol('#'));
    }

    getLengthAsSymbol(strSymbol = '_') {
        let str = '';
        let length = this.el.innerHTML.length;

        for (let i = 0; i < length; i++) {
            str += strSymbol;
        }

        return str;
    }
}

const nlUnderlines = document.querySelectorAll('h1,h2,h3,h4,h5,h6');

nlUnderlines.forEach((el) => new UnderlineVars(el));
