document.addEventListener('DOMContentLoaded', function() {
  var startButton = document.getElementById('startButton');
  startButton.addEventListener('click', function() {
    // Ouvrir un nouvel onglet avec le contenu de index.html
    chrome.tabs.create({ url: 'extensionStarted.html' });
    // Fetch les avis
    // Lancer le modèle
    // Fermer la fenêtre pop-up (si vous le souhaitez)
    window.close();
  });
});


const progressCircle1 = document.getElementById('progressCircle1');
const progressText1 = document.getElementById('progressText1');
const progressCircle2 = document.getElementById('progressCircle2');
const progressText2 = document.getElementById('progressText2');
const progressCircle3 = document.getElementById('progressCircle3');
const progressText3 = document.getElementById('progressText3');

// Définir les pourcentages de progression (par exemple, 25%, 50%, 75%)
const percentage1 = 25;
const percentage2 = 50;
const percentage3 = 75;

// Calculer les angles en degrés
const angle1 = (percentage1 / 100) * 360;
const angle2 = (percentage2 / 100) * 360;
const angle3 = (percentage3 / 100) * 360;

// Appliquer les rotations aux barres de progression
progressText1.innerText = `${percentage1}%`;
progressText2.innerText = `${percentage2}%`;
progressText3.innerText = `${percentage3}%`; 

