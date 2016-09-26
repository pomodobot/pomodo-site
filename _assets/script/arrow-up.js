(function () {
    var plugin = {};

    plugin.arrowUp = document.querySelector('.arrow-up');
    plugin.buttonToForm = document.querySelector('.button--to-form');

    plugin.viewportChange = function () {
        var el = document.querySelector('.contact-header'),
            elemTop = el.getBoundingClientRect().top,
            elemBottom = el.getBoundingClientRect().bottom,
            isVisible = (elemBottom <= window.innerHeight);

        if(isVisible){
            plugin.arrowUp.classList.add('visible');
        }else{
            plugin.arrowUp.classList.remove('visible');
        }
    };

    plugin.arrowUpClick = function () {
        plugin.scrollTo(document.body, 600);
    };

    plugin.goToForm = function () {
        var formSection = document.querySelector('.contact');
        plugin.scrollTo(formSection, 600);
    };

    // Element to move, time in ms to animate
    plugin.scrollTo = function(element, duration) {
        var e = document.documentElement;
        if(e.scrollTop===0){
            var t = e.scrollTop;
            ++e.scrollTop;
            e = t+1===e.scrollTop--?e:document.body;
        }
        plugin.scrollToC(e, e.scrollTop, element, duration);
    };

    // Element to move, element or px from, element or px to, time in ms to animate
    plugin.scrollToC = function(element, from, to, duration) {
        if (duration <= 0) return;
        if(typeof from === "object")from=from.offsetTop;
        if(typeof to === "object")to=to.offsetTop;

        plugin.scrollToX(element, from, to, 0, 1/duration, 20, plugin.easeOutCuaic);
    };

    plugin.scrollToX = function(element, xFrom, xTo, t01, speed, step, motion) {
        if (t01 < 0 || t01 > 1 || speed<= 0) {
            element.scrollTop = xTo;
            return;
        }
        element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
        t01 += speed * step;

        setTimeout(function() {
            plugin.scrollToX(element, xFrom, xTo, t01, speed, step, motion);
        }, step);
    };

    plugin.easeOutCuaic = function(t){
        t--;
        return t*t*t+1;
    };

    addEventListener('scroll', plugin.viewportChange, false);
    plugin.arrowUp.addEventListener('click', plugin.arrowUpClick, false);
    plugin.buttonToForm.addEventListener('click', plugin.goToForm, false);
})();