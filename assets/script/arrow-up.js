(function () {
    var plugin = {};

    plugin.viewportChange = function () {
        var el = document.querySelector('.contact-header'),
            arrowUp = document.querySelector('.arrow-up'),
            elemTop = el.getBoundingClientRect().top,
            elemBottom = el.getBoundingClientRect().bottom,
            isVisible = (elemBottom <= window.innerHeight);

        if(isVisible){
            arrowUp.classList.add('visible');
        }else{
            arrowUp.classList.remove('visible');
        }
    };

    addEventListener('scroll', plugin.viewportChange, false);
})();