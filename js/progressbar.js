var progressBar = document.getElementById("progress-bar");
var step = 1;
var progress = 0.25;

var green = "#68FF5B";
var grey = "#A3A3A3";

function getRuleWithSelector(selector) {
    var numSheets = document.styleSheets.length,
        numRules,
        sheetIndex,
        ruleIndex;
    // Search through the style sheets.
    for (sheetIndex = 0; sheetIndex < numSheets; sheetIndex += 1) {
        numRules = document.styleSheets[sheetIndex].cssRules.length;
        for (ruleIndex = 0; ruleIndex < numRules; ruleIndex += 1) {
            if (document.styleSheets[sheetIndex].cssRules[ruleIndex].selectorText === selector) {
                return document.styleSheets[sheetIndex].cssRules[ruleIndex];
            }
        }
    }
}


for (var i = 0; i < progressBar.childElementCount; i++) {
    progressBar.children[i].style.backgroundColor = i <= step ? green : grey;
    if (i < progressBar.childElementCount - 1) {
        var bar = getRuleWithSelector("#progress-bar div:nth-child(" + (i + 1) + ")::after");
        bar.style.width = i < step ? ((progressBar.clientWidth / (progressBar.childElementCount - 1)) + "px") : "0px";
    }
}

var actualBar = getRuleWithSelector("#progress-bar div:nth-child(" + (step + 1) + ")::after");
actualBar.style.width = (progressBar.clientWidth / (progressBar.childElementCount - 1) * progress) + "px";