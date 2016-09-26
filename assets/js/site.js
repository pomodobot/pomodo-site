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
/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

    'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

    function classReg( className ) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ( 'classList' in document.documentElement ) {
        hasClass = function( elem, c ) {
            return elem.classList.contains( c );
        };
        addClass = function( elem, c ) {
            elem.classList.add( c );
        };
        removeClass = function( elem, c ) {
            elem.classList.remove( c );
        };
    }
    else {
        hasClass = function( elem, c ) {
            return classReg( c ).test( elem.className );
        };
        addClass = function( elem, c ) {
            if ( !hasClass( elem, c ) ) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function( elem, c ) {
            elem.className = elem.className.replace( classReg( c ), ' ' );
        };
    }

    function toggleClass( elem, c ) {
        var fn = hasClass( elem, c ) ? removeClass : addClass;
        fn( elem, c );
    }

    var classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

// transport
    if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( classie );
    } else {
        // browser global
        window.classie = classie;
    }

})( window );

(function () {
    var plugin = {};

    plugin.form = document.querySelector('.contact-form');
    plugin.formBtn = document.querySelector('.button--form');
    plugin.modal = document.querySelector('.form--modal');
    plugin.modalOverflow = document.querySelector('.form--overflow');
    plugin.modalCloseBtn = document.querySelector('.close--modal');

    plugin.closeModal = function () {
        plugin.modal.classList.remove('opened');
        plugin.modalOverflow.classList.remove('visible');

        window.setTimeout(function(){
            plugin.modal.classList.remove('success');
        }, 1000);
    };

    plugin.changeFormButtonStatus = function (enable) {
        if(enable){
            plugin.formBtn.innerHTML = 'Enviar';
            plugin.formBtn.disabled = false;
        }else{
            plugin.formBtn.innerHTML = 'Enviado...';
            plugin.formBtn.disabled = true;
        }
    };

    plugin.submitForm = function () {
        var data = {
            name: document.querySelector('#name').value,
            email: document.querySelector('#email').value,
            phone: document.querySelector('#phone').value
        };

        plugin.changeFormButtonStatus(false);

        var req = new XMLHttpRequest();
        req.open('POST', 'https://pomodo-contact-form.herokuapp.com/send_email', true);
        req.setRequestHeader('Accept', 'application/json');

        req.onreadystatechange = function () {
            var DONE = 4,
                OK = 200;

            if (req.readyState === DONE) {
                if (req.status === OK){
                    plugin.changeFormButtonStatus(true);
                    plugin.modal.classList.add('success');
                    plugin.modalOverflow.classList.add('visible');
                    plugin.modal.classList.add('opened');
                }
            } else {
                if(req.status !== OK){
                    plugin.changeFormButtonStatus(true);
                    plugin.modalOverflow.classList.add('visible');
                    plugin.modal.classList.add('opened');
                }
            }
        };

        req.send(JSON.stringify(data));
        return false;
    };

    plugin.modalCloseBtn.addEventListener('click', plugin.closeModal, false);
    plugin.form.onsubmit = plugin.submitForm;
})();
(function() {
    if (!String.prototype.trim) {
        (function() {
            // Make sure we trim BOM and NBSP
            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            String.prototype.trim = function() {
                return this.replace(rtrim, '');
            };
        })();
    }

    [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
        // in case the input is already filled..
        if( inputEl.value.trim() !== '' ) {
            classie.add( inputEl.parentNode, 'input--filled' );
        }

        // events:
        inputEl.addEventListener( 'focus', onInputFocus );
        inputEl.addEventListener( 'blur', onInputBlur );
    } );

    function onInputFocus( ev ) {
        classie.add( ev.target.parentNode, 'input--filled' );
    }

    function onInputBlur( ev ) {
        if( ev.target.value.trim() === '' ) {
            classie.remove( ev.target.parentNode, 'input--filled' );
        }
    }
})();
!function(){entrance={},entrance.duration="1000",entrance.distance="200",entrance.heightOffset=200,entrance.isElemInView=function(e){var t=e.getBoundingClientRect();return t.top+entrance.heightOffset>=0&&t.top+entrance.heightOffset<=window.innerHeight||t.bottom+entrance.heightOffset>=0&&t.bottom+entrance.heightOffset<=window.innerHeight||t.top+entrance.heightOffset<0&&t.bottom+entrance.heightOffset>window.innerHeight},entrance.setInitialStyles=function(e){document.body.style.overflowX="hidden";var t=e.getAttribute("data-entrance"),n=e.getAttribute("data-entrance-delay");e.style.transition="all "+entrance.duration/1e3+"s ease",n&&(e.style.transitionDelay=n/1e3+"s"),"fade"==t&&(e.style.opacity="0"),"from-left"==t&&(e.style.opacity="0",e.style.transform="translate(-"+entrance.distance+"px, 0)"),"from-right"==t&&(e.style.opacity="0",e.style.transform="translate("+entrance.distance+"px, 0)"),"from-top"==t&&(e.style.opacity="0",e.style.transform="translate(0, -"+entrance.distance+"px)"),"from-bottom"==t&&(e.style.opacity="0",e.style.transform="translate(0, "+entrance.distance+"px)")},entrance.enter=function(e){e.style.visibility="visible",e.style.opacity="1",e.style.transform="translate(0, 0)",e.className+=" has-entered"},entrance.viewportChange=function(){Array.prototype.map.call(entrance.elements,function(e){if(entrance.isElemInView(e)){var t=e.classList.contains("has-entered");t||entrance.enter(e)}})},entrance.init=function(){entrance.elements=document.querySelectorAll("[data-entrance]"),Array.prototype.map.call(entrance.elements,function(e){entrance.setInitialStyles(e),entrance.isElemInView(e)&&addEventListener("load",function(){entrance.enter(e)},!1)})},addEventListener("DOMContentLoaded",entrance.init,!1),addEventListener("scroll",entrance.viewportChange,!1),addEventListener("resize",entrance.viewportChange,!1)}();