var calandar = document.getElementById("calendar");
var time = document.getElementById("time");
var dname = document.getElementById("datetime-name");
var days = calandar.children[2];
var today = new Date();
var selectedMonth = today.getMonth();
var selectedYear = today.getFullYear();
var selectedDay = -1;
var selectedDayMonth = -1;
var selectedDayYear = -1;
var selectedHour = -1;

function monthToString(month) {
    switch (month) {
        case 0: return "Janvier"; break;
        case 1: return "Février"; break;
        case 2: return "Mars"; break;
        case 3: return "Avril"; break;
        case 4: return "Mai"; break;
        case 5: return "Juin"; break;
        case 6: return "Juillet"; break;
        case 7: return "Août"; break;
        case 8: return "Septembre"; break;
        case 9: return "Octobre"; break;
        case 10: return "Novembre"; break;
        case 11: return "Décembre"; break;
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