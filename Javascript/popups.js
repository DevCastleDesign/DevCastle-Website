function OpenPopup(name) {
    document.getElementById('popup-blur').style.display = 'block';
    document.querySelector(".popup."+name).style.display = 'block';
}

function ClosePopups() {
    for (var i = 0; i < document.getElementById('popup-blur').childElementCount; i++) {
        document.getElementById('popup-blur').children[i].style.display = 'none';
    }
    document.getElementById('popup-blur').style.display = 'none';
}

function ShowTicket(title, content, answer) {
    document.getElementById("ticket-title").innerHTML = title;
    document.getElementById("ticket-content").innerHTML = content;
    document.getElementById("ticket-answer").innerHTML = answer;
    document.getElementById("ticket-answer").style.color = "white";
    document.getElementById("ticket-close-button").innerHTML = "Fermer cette question";
    if (answer === "") {
        document.getElementById("ticket-close-button").innerHTML = "Supprimer cette question";
        document.getElementById("ticket-answer").innerHTML = "Notre equipe n'a pas encore eu le temps de répondre.";
        document.getElementById("ticket-answer").style.color = "grey";
    }
    OpenPopup("ticket");
}