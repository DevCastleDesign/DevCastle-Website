var palette = document.getElementById("palette")

function addColor() {
    var newColor = document.createElement("input");
    newColor.type = "color";
    newColor.value = "#ffffff"
    palette.insertBefore(newColor, palette.children[palette.childElementCount - 1]);
}