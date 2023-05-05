emailjs.init('W6r4iYSkdNq0KUo4_');

function sendMail() {
    if (mode === 0) {
        var templateParams = {
            datetime: dname.innerHTML,
            adress: adressFields.children[4].value,
            npa: adressFields.children[1].value,
            loc: adressFields.children[2].value,
            name: document.getElementById("infos-name").value,
            email: document.getElementById("infos-email").value,
            tel: document.getElementById("infos-tel").value,
            more: document.getElementById("infos-more").value,
        };

        emailjs.send('service_gtw1i4t', 'template_vo11f77', templateParams).then(function(response) {
            window.location.href = "remerciRendezvous.html";
        });

    }
    if (mode === 1) {
        var templateParams = {
            datetime: dname.innerHTML,
            plateform: videoModeString,
            username: videoFields.children[2].value,
            name: document.getElementById("infos-name").value,
            email: document.getElementById("infos-email").value,
            tel: document.getElementById("infos-tel").value,
            more: document.getElementById("infos-more").value,
        };
        emailjs.send('service_gtw1i4t', 'template_ht3k4w7', templateParams).then(function(response) {
            window.location.href = "remerciRendezvous.html";
        });
    }
}