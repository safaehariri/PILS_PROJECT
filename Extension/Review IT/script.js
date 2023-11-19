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

  
