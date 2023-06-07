window.addEventListener("load", (event) => {
    if (screen.width < 1000) {
        document.querySelector('html').innerHTML = `
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
            <body>
                <div>
                <span class="material-symbols-outlined">
                    error
                    </span>
                    <h1>DevCastle est uniquement disponible sur ordinateur</h1>
                    <p>Veuillez utiliser un ordinateur ou une grande tablette</p>
                    <img src="src/Images/Logo.png" alt="">
                </div>
            </body>
       
            <style>
                 .material-symbols-outlined {
                    scale: 200%;
                 }
                 
                 img {
                    position: absolute;
                    left: 50%;
                    transform: translate(-50%, 0);
                 }
                 
                body {
                    color: white;
                    font-family: 'Montserrat', sans-serif;
                    background-color: #4086C8;
                    text-align: center;
                }
            </style>
        `;
    }
});

