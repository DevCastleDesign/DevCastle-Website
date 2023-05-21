function ShowUser(jsonValues) {
    const user = JSON.parse(jsonValues);

    document.getElementById("user-pageTitle").innerHTML = "<button class='backArrow' onclick='OpenDashboard(0)'>&#129044;</button>" + user.prenom + " " + user.nom;
    for (let i = 0; i < Object.keys(user).length; i++) {
        if (document.getElementById("user-page-" + Object.keys(user)[i]) != null) {
            document.getElementById("user-page-" + Object.keys(user)[i]).innerHTML = Object.values(user)[i];
        }
    }

    document.getElementById("user-page-status").innerHTML += "<button style='margin-left: 50px'>Passer à la suite</button>"

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