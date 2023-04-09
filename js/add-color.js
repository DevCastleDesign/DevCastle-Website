var palette = document.getElementById("palette")

function addColor() {
    var newColor = document.createElement("input");
    newColor.type = "color";
    newColor.value = "#ffffff";
    palette.insertBefore(newColor, palette.children[palette.childElementCount - 1]);
    if (palette.childElementCount >= 6) {
        palette.children[palette.childElementCount - 1].style.display = "none";
    }
}