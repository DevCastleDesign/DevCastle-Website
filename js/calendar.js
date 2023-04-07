var calandar = document.getElementById("calendar");
var time = document.getElementById("time");
var dname = document.getElementById("datetime-name");
var days = calandar.children[2];
var today = new Date();
var selectedMonth = today.getMonth();
var selectedYear = today.getFullYear();
var selectedDay = today.getDay() + 1;
var selectedDayMonth = selectedMonth;
var selectedDayYear = selectedYear;
var selectedHour = -1;

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
    dname.innerHTML = (selectedDay + 1) + " " + monthToString(selectedMonth) + " " + selectedYear + (selectedHour != -1 ? ", " + selectedHour : "");
}

function createCalendar() {
    // write month and year in header
    calandar.children[0].children[2].innerHTML = monthToString(selectedMonth) + " " + selectedYear;
    // calculate start day and montha lenght
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

createCalendar();
setName();