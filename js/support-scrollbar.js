var scrollPercent = 0;
var mouseX;
var mouseY;
var clicked = false;
var mousePercent = 0;
function scrollBarLoop() {
    if (document.querySelector(".scrollbar .handler").clientHeight >= document.querySelector(".scrollbar").clientHeight) {
        document.querySelector(".scrollbar").style.display = "none";
        return;
    } else {
        document.querySelector(".scrollbar").style.display = "block";
    }

    var scrollBarZoneHeight = document.querySelector(".scrollbar").clientHeight - document.querySelector(".scrollbar .handler").clientHeight;
    document.querySelector(".scrollbar .handler").style.marginTop = (scrollBarZoneHeight * scrollPercent / 100) + "px";

    var buttonHeight = document.querySelector(".tickets .list").children[0].clientHeight + 10;
    var buttonCount =  document.querySelector(".tickets .list").childElementCount;
    var maxContentHeight = buttonHeight * buttonCount - document.querySelector(".tickets .list").clientHeight;
    for (var i = 0; i < buttonCount; i++) {
        document.querySelector(".tickets .list").children[i].style.transform = "translateY(" + (-maxContentHeight * scrollPercent / 100) + "px)";
    }

    var rect = document.querySelector(".scrollbar").getBoundingClientRect();
    mousePercent = (mouseY - rect.top) / (rect.bottom - rect.top) * 100;
    if (mouseY >= rect.top && mouseY <= rect.bottom && mouseX >= rect.left && mouseX <= rect.right && clicked) {
        scrollPercent = mousePercent;
    }
    scrollPercent = Math.min(Math.max(scrollPercent, 0), 100);
    document.querySelector(".scrollbar .handler").style.height = (document.querySelector(".scrollbar").clientHeight * (document.querySelector(".scrollbar").clientHeight / (buttonHeight * buttonCount))) + "px";
    requestAnimationFrame(scrollBarLoop);
}
requestAnimationFrame(scrollBarLoop);

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
document.addEventListener("mousedown", (e) => {
    clicked = true;
});
document.addEventListener("mouseup", (e) => {
    clicked = false;
});
document.addEventListener("wheel", (e) => {
    scrollPercent += e.deltaY / 50;
    scrollPercent = Math.min(Math.max(scrollPercent, 0), 100);
});