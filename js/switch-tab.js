function OpenTab(id, tabId) {
    var pages = document.getElementById("pages");
    var tabs = document.getElementById("tabs")
    for (var i = 0; i < pages.childElementCount; i++) {
        pages.children[i].style.display = "none";
    }
    for (var i = 0; i < tabs.childElementCount; i++) {
        tabs.children[i].classList.remove("active");
    }
    document.getElementById(id).style.display = "block";
    tabs.children[tabId].classList.add("active");
}