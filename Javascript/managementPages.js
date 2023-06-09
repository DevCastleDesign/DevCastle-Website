let showedUserUID;
let hasToStartMaquette = false;
let hasToStartDev = false;
let hasToEndProject = false;
let urlOfImageToBeDeleted = "";

function ShowUser(jsonValues, userUID) {
    const user = JSON.parse(jsonValues);
    showedUserUID = userUID;

    document.getElementById("user-pageModifsContent").innerHTML = "";

    document.getElementById("user-pageModifs").style.display = (user.maquette_modifs === undefined ? "none" : "block");

    document.getElementById("user-pageTitle").innerHTML = "<button class='backArrow' onclick='OpenDashboard(0)'>&#129044;</button>" + user.prenom + " " + user.nom;
    for (let i = 0; i < Object.keys(user).length; i++) {
        if (document.getElementById("user-page-" + Object.keys(user)[i]) != null) {
            document.getElementById("user-page-" + Object.keys(user)[i]).innerHTML = Object.values(user)[i];
        }
    }

    if (user.status === "maquette") {
        document.getElementById("user-page-status").innerHTML += " - " + user.maquette_status;
        if (user.maquette_status === "attente") {
            document.getElementById("user-page-status").innerHTML += "<button onclick='hasToStartMaquette = true;' style='margin-left: 50px'>Commencer la maquette</button>"
        }
        else if (user.maquette_status === "dev") {
            document.getElementById("user-page-status").innerHTML += "<button onclick='OpenDashboard(8);' style='margin-left: 50px'>Finir la maquette</button>"
        }
        document.getElementById("user-pageModifsContent").innerHTML = user.maquette_modifs;
    }
    if (user.status === "dev") {
        document.getElementById("user-page-status").innerHTML += " - " + user.dev_status;
        if (user.dev_status === "attente") {
            document.getElementById("user-page-status").innerHTML += "<button onclick='hasToStartDev = true;' style='margin-left: 50px'>Commencer le developpement</button>"
        }
        else {
            document.getElementById("user-page-status").innerHTML += "<button onclick='hasToEndProject = true;' style='margin-left: 50px'>Finir le projet</button>"
        }
    }

    OpenDashboard(4);
}

let openedTicketId = null;
function ShowTicket(jsonValues) {
    const ticket = JSON.parse(jsonValues);
    openedTicketId = ticket.id;
    
    document.getElementById("ticket-pageTitle").innerHTML = "<button class='backArrow' onclick='OpenDashboard(1)'>&#129044;</button>" + ticket.title;
    for (let i = 0; i < Object.keys(ticket).length; i++) {
        if (document.getElementById("ticket-page-" + Object.keys(ticket)[i]) != null) {
            document.getElementById("ticket-page-" + Object.keys(ticket)[i]).innerHTML = Object.values(ticket)[i];
        }
        if (ticket.answer != "") {
            document.getElementById("ticket-pageSend").innerHTML = "Modifier";
        }
        document.getElementById("ticket-pageAnswer").value = ticket.answer.replaceAll('<br>', '\n');
    }

    OpenDashboard(5);
}