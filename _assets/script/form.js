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