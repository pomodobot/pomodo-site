$(document).ready(function () {
    var contactFormHost = 'https://pomodo-contact-form.herokuapp.com/',
        form = $('#contact-form'),
        notice = form.find('#notice');

    form.submit(function(ev){
        ev.preventDefault();

        $.ajax({
            type: 'POST',
            url: contactFormHost + 'send_email',
            data: form.serialize(),
            dataType: 'json',
            success: function(response) {
                switch (response.message) {
                    case 'success':
                        form.fadeOut(function() {
                            form.html('<h4>' + form.data('success') + '</h4>').fadeIn();
                        });
                        break;

                    case 'failure_email':
                        notice.text(notice.data('error')).fadeIn();
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                notice.text(notice.data('error')).fadeIn();
            }
        });
    });
});