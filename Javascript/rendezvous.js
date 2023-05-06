emailjs.init('W6r4iYSkdNq0KUo4_');
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
var selectedDay = today.getDay() + 2;
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
        case 0:
            return "Janvier";
        case 1:
            return "Février";
        case 2:
            return "Mars";
        case 3:
            return "Avril";
        case 4:
            return "Mai";
        case 5:
            return "Juin";
        case 6:
            return "Juillet";
        case 7:
            return "Août";
        case 8:
            return "Septembre";
        case 9:
            return "Octobre";
        case 10:
            return "Novembre";
        case 11:
            return "Décembre";
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
    if (startDay === 0) {
        startDay = 7;
    }
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
    selectedMonth++;
    if (selectedMonth >= 12) {
        selectedMonth = 0;
        selectedYear++;
    }
    createCalendar();
}

function calendarBackward() {
    if (selectedMonth === today.getMonth() && selectedYear === today.getFullYear()) {
        return;
    }
    selectedMonth--;
    if (selectedMonth < 0) {
        selectedMonth = 11;
        selectedYear--;
    }
    createCalendar();
}

function selectDay(day) {
    if (selectedMonth === today.getMonth() && selectedYear === today.getFullYear() && day < today.getDay() + 2) {
        return;
    }
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

        emailjs.send('service_gtw1i4t', 'template_vo11f77', templateParams).then(function (response) {
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
        emailjs.send('service_gtw1i4t', 'template_ht3k4w7', templateParams).then(function (response) {
            window.location.href = "remerciRendezvous.html";
        });
    }
}

setMode(0);
setVideo(0);
selectDay(selectedDay);
createCalendar();
setName();