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

const DelayedScroll = function(options = {}) {
    const _ = this;
    /**
     * Init.
     */
    _.init = function() {
        _._defaultSettings = {
            delay: 100,
            scrollElement: window,
        };
        _.settings = _._defaultSettings;

        if (typeof (Event) === 'function') {
            _.delayedScrollEvent = new Event('delayedScroll');
        } else {
            _.delayedScrollEvent = document.createEvent('Event');
            _.delayedScrollEvent.initEvent('delayedScroll', true, true);
        }

        let timeout;

        window.addEventListener('scroll', function() {
            clearTimeout(timeout);

            timeout = setTimeout(function() {
                window.dispatchEvent(_.delayedScrollEvent);
            }, _.settings.delay);
        });
    };

    _.init();
};

new DelayedScroll();

class UpdateAnchor {
    constructor(el) {
        this.el = el;
        this.anchors = this.el.querySelectorAll('h1[id],h2[id],h3[id]');

        window.addEventListener('delayedScroll', () => {
            let offset = document.documentElement.scrollTop + 16;

            this.anchors.forEach((el, i) => {
                let next = this.anchors[i + 1];
                if (el.offsetTop < offset && next && next.offsetTop > offset) {
                    history.replaceState(null, el.innerHTML, '#' + el.id);
                }
            });
        })
    }
}

const nlUpdateAnchors = document.querySelectorAll('[data-update-anchor]');

nlUpdateAnchors.forEach(el => new UpdateAnchor(el));
