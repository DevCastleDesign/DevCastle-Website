let showedUserUID;

function ShowUser(jsonValues, userUID) {
    const user = JSON.parse(jsonValues);
    showedUserUID = userUID;

    document.getElementById("user-pageTitle").innerHTML = "<button class='backArrow' onclick='OpenDashboard(0)'>&#129044;</button>" + user.prenom + " " + user.nom;
    for (let i = 0; i < Object.keys(user).length; i++) {
        if (document.getElementById("user-page-" + Object.keys(user)[i]) != null) {
            document.getElementById("user-page-" + Object.keys(user)[i]).innerHTML = Object.values(user)[i];
        }
    }

    if (user.status === "maquette") {
        document.getElementById("user-page-status").innerHTML += "<button onclick='OpenDashboard(6);' style='margin-left: 50px'>Passer à la suite</button>"
    }
    if (user.status === "dev") {
        document.getElementById("user-page-status").innerHTML += "<button style='margin-left: 50px'>Terminer le projet</button>"
    }
    
    OpenDashboard(3);
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

    OpenDashboard(4);
}