function ShowUser(jsonValues) {
    const user = JSON.parse(jsonValues);
    console.log(user);

    document.getElementById("user-page-title").innerHTML = "<button onclick='OpenDashboard(0)'>&#129044;</button>" + user.prenom + " " + user.nom;
    for (let i = 0; i < Object.keys(user).length; i++) {
        document.getElementById("user-page-" + Object.keys(user)[i]).innerHTML = Object.values(user)[i];
    }

    OpenDashboard(3);
}