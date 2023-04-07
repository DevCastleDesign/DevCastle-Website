var calandar = document.getElementById("calendar");
var time = document.getElementById("time");
var dname = document.getElementById("datetime-name");
var methods = document.getElementById("methods");
var adressFields = document.getElementById("adress");
var videoFields = document.getElementById("video");
var errorMsg = document.getElementById("error-message");
var mode = 0;
var videomode = 0;
var days = calandar.children[2];
var today = new Date();
var selectedMonth = today.getMonth();
var selectedYear = today.getFullYear();
var selectedDay = today.getDay() + 1;
var selectedDayMonth = selectedMonth;
var selectedDayYear = selectedYear;
var selectedHour = -1;
var videoModeString = "skype";

var baseDisHours = [
    ["17:30"],
    ["16:00", "16:30", "17:00", "17:30"],
    ["16:30", "17:00", "17:30"],
    ["17:30"],
    ["16:00", "16:30", "17:00", "17:30"],
    ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"],
    []
];

function monthToString(month) {
    switch (month) {
        case 0: return "Janvier";
        case 1: return "Février";
        case 2: return "Mars";
        case 3: return "Avril";
        case 4: return "Mai";
        case 5: return "Juin";
        case 6: return "Juillet";
        case 7: return "Août";
        case 8: return "Septembre";
        case 9: return "Octobre";
        case 10: return "Novembre";
        case 11: return "Décembre";
    }
}

function setName() {
    dname.innerHTML = (selectedDay + 1) + " " + monthToString(selectedMonth) + " " + selectedYear + (selectedHour != -1 ? ", " + time.children[1].children[selectedHour].innerHTML : "");
}

function createCalendar() {
    // write month and year in header
    calandar.children[0].children[2].innerHTML = monthToString(selectedMonth) + " " + selectedYear;
    // calculate start day and month lenght
    var startDay = new Date(`${selectedYear}-${selectedMonth + 1}-01`).getDay();
    if (startDay === 0) { startDay = 7; }
    var monthLenght = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    // delete old child
    days.innerHTML = "";
    // create the new childs
    for (var i = 0; i < monthLenght; i++) {
        var newDay = document.createElement("button");
        newDay.innerHTML = (i + 1);
        // met le jour en couleur si il est selectionné
        if (i === selectedDay && selectedDayMonth === selectedMonth && selectedDayYear === selectedYear) {
            newDay.classList.add("selected");
        }
        newDay.setAttribute("onclick", "selectDay(" + i + ")");
        days.append(newDay);
    }
    // offset the child to match the start day of the month
    days.children[0].style.gridColumn = startDay;
}

function createHours(weekday) {
    time.children[1].innerHTML = "";
    for (var i = 0; i < baseDisHours[weekday].length; i++) {
        var newHour = document.createElement("button");
        newHour.innerHTML = baseDisHours[weekday][i];
        newHour.setAttribute("onclick", "selectHour(" + i + ")");
        time.children[1].append(newHour);
    }
}

function calendarForward() {
    selectedMonth ++;
    if (selectedMonth >= 12) {
        selectedMonth = 0;
        selectedYear ++;
    }
    createCalendar();
}

function calendarBackward() {
    selectedMonth --;
    if (selectedMonth < 0) {
        selectedMonth = 11;
        selectedYear --;
    }
    createCalendar();
}

function selectDay(day) {
    selectedDay = day;
    selectedDayMonth = selectedMonth;
    selectedDayYear = selectedYear;
    if (selectedHour >= 0 && selectedHour < time.children[1].childElementCount) {
        time.children[1].children[selectedHour].classList.remove("selected");
    }
    selectedHour = -1;
    createCalendar();
    var startDay = new Date(`${selectedYear}-${selectedMonth + 1}-01`).getDay();
    createHours((day + startDay - 1) % 7);
    setName();
}

function selectHour(hour) {
    if (selectedHour >= 0 && selectedHour < time.children[1].childElementCount) {
        time.children[1].children[selectedHour].classList.remove("selected");
    }
    selectedHour = hour;
    time.children[1].children[hour].classList.add("selected");
    setName();
}

function setMode(newmode) {
    mode = newmode;
    methods.children[0].classList.remove("selected");
    methods.children[1].classList.remove("selected");
    methods.children[newmode].classList.add("selected");
    if (newmode === 0) {
        document.getElementById("method-title").innerHTML = "Ou pouvons-nous se rencontrer ?";
        adressFields.style.display = "block";
        videoFields.style.display = "none";
    }
    if (newmode === 1) {
        document.getElementById("method-title").innerHTML = "Quelle plateforme prefereriez-vous ?";
        adressFields.style.display = "none";
        videoFields.style.display = "block";
    }
}

function setVideo(newvideomode) {
    videomode = newvideomode;
    videoFields.children[0].children[0].classList.remove("selected");
    videoFields.children[0].children[1].classList.remove("selected");
    videoFields.children[0].children[2].classList.remove("selected");
    videoFields.children[0].children[newvideomode].classList.add("selected");
    var modename = "skype";
    if (newvideomode === 1) {
        modename = "discord";
    }
    if (newvideomode === 2) {
        modename = "zoom";
    }
    videoModeString = modename;
    videoFields.children[2].placeholder = "Votre nom d'utilisateur " + modename;
}

function submit() {
    errorMsg.innerHTML = "";
    if ((adressFields.children[2].value === "" || adressFields.children[4].value === "") && mode === 0) {
        errorMsg.innerHTML = "Veuillez saisir une adresse complète";
    } else if (videoFields.children[2].value === "" && mode === 1) {
        errorMsg.innerHTML = "Veuillez votre nom d'utilisateur " + videoModeString;
    } else if (selectedHour === -1) {
        errorMsg.innerHTML = "Veuillez selectionner une heure";
    } else if (document.getElementById("infos-name").value === "") {
        errorMsg.innerHTML = "Veuillez saisir votre nom";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("infos-email").value)) {
        errorMsg.innerHTML = "Veuillez saisir un email correct";
    } else if (document.getElementById("infos-tel").value === "") {
        errorMsg.innerHTML = "Veuillez saisir votre numero de télephone";
    } else {
        if (mode === 0) {
            console.log(
                "===[Rendez-vous]===\n" + 
                dname.innerHTML + "\n" +
                "===[presentiel]===\n" + 
                adressFields.children[1].value + " " + adressFields.children[2].value + "\n" + 
                adressFields.children[4].value + "\n" + 
                "===[informations]===\n" + 
                "nom: " + document.getElementById("infos-name").value + "\n" +
                "email: " + document.getElementById("infos-email").value + "\n" +
                "tel: " + document.getElementById("infos-tel").value + "\n" +
                "notes:\n" + document.getElementById("infos-more").value + "\n" + 
                "===================="
            );
        }
        if (mode === 1) {
            console.log(
                "===[Rendez-vous]===\n" + 
                dname.innerHTML + "\n" +
                "===[" + videoModeString + "]===\n" + 
                videoFields.children[2].value + "\n" + 
                "===[informations]===\n" + 
                "nom: " + document.getElementById("infos-name").value + "\n" +
                "email: " + document.getElementById("infos-email").value + "\n" +
                "tel: " + document.getElementById("infos-tel").value + "\n" +
                "notes:\n" + document.getElementById("infos-more").value + "\n" + 
                "===================="
            );
        }
    }
}

setMode(0);
setVideo(0);
selectDay(selectedDay);
createCalendar();
setName();