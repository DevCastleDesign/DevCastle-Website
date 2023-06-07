const express = require('express');
const app = express();

// Définissez les routes de votre application Express
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon site !');
});

// Définissez les autres routes si nécessaire

// Lancement du serveur Express
app.listen(3000, () => {
    console.log('Le serveur est en cours d\'exécution sur le port 3000');
});