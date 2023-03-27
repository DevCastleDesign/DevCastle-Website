var lightmode = false;
var root = document.querySelector('*');

function switchTheme() {
    lightmode = !lightmode;
    root.style.setProperty("--blue1", "#294876");
    root.style.setProperty("--blue2", "#A0CFFF");
    root.style.setProperty("--blue3", "#81B9FF");
    root.style.setProperty("--bluelink", "#006DF0");
    root.style.setProperty("--black", "#ffffff");
    root.style.setProperty("--white", "#000000");
    root.style.setProperty("--dashboarddark", "#fefefe");
    root.style.setProperty("--dashboardseparator", "#dfdfdf");
    console.log("test");
}