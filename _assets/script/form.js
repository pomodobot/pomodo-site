(function () {
    var plugin = {};

    plugin.form = document.querySelector('.contact-form');
    plugin.modal = document.querySelector('.form--modal');
    plugin.modalOverflow = document.querySelector('.form--overflow');
    plugin.modalCloseBtn = document.querySelector('.close--modal');

    plugin.closeModal = function () {
        plugin.modal.classList.remove('opened');
        plugin.modalOverflow.classList.remove('visible');
    };

    plugin.submitForm = function () {
        var data = {
            name: document.querySelector('#name').value,
            email: document.querySelector('#email').value,
            phone: document.querySelector('#phone').value
        };

        var req = new XMLHttpRequest();
        req.open('POST', 'https://pomodo-contact-form.herokuapp.com/send_email', true);
        req.setRequestHeader('Accept', 'application/json');

        req.onreadystatechange = function () {
            var DONE = 4;
            var OK = 200;
            if (req.readyState === DONE) {
                if (req.status === OK)
                    console.log(req.responseText);
            } else {
                plugin.modal.classList.add('opened');
                plugin.modalOverflow.classList.add('visible');
                console.log('Error: ' + req.status);
            }
        };

        req.send(JSON.stringify(data));
        return false;
    };

    plugin.modalCloseBtn.addEventListener('click', plugin.closeModal, false);
    plugin.form.onsubmit = plugin.submitForm;
})();