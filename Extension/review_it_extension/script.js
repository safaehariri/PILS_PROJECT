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



document.addEventListener('DOMContentLoaded', function() {
  // Fonction pour extraire et afficher les commentaires
  function extractAndDisplayComments(csvFilePath, containerId) {
      fetch(csvFilePath)
          .then(response => response.text())
          .then(data => {
              const lines = data.split('\n');
              const commentsContainer = document.getElementById(containerId);

              for (let i = 0; i < lines.length; i++) {
                  const comment = lines[i].trim();

                  // Ignorer les lignes vides
                  if (comment !== '') {
                      // Créer un paragraphe pour chaque commentaire et l'ajouter au conteneur
                      const commentElement = document.createElement('p');
                      commentElement.textContent = comment;
                      commentsContainer.appendChild(commentElement);
                  }
              }
          })
          .catch(error => console.error(`Erreur lors de la récupération du fichier CSV ${csvFilePath}`, error));
  }

  // Utiliser la fonction pour chaque fichier CSV et chaque conteneur
  extractAndDisplayComments('comments1.csv', 'comments-container-1');
  extractAndDisplayComments('comments2.csv', 'comments-container-2');
  extractAndDisplayComments('comments2.csv', 'comments-container-3');
  // Ajoutez autant d'appels à extractAndDisplayComments que nécessaire
});

/*
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

/*

function createJauge(elem) {
  if (elem) {
    // on commence par un clear
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
    // création des éléments
    var oMask  = document.createElement('DIV');
    var oBarre = document.createElement('DIV');
    var oSup50 = document.createElement('DIV');
    // affectation des classes
    oMask.className  = 'progress-masque';
    oBarre.className = 'progress-barre';
    oSup50.className = 'progress-sup50';
    // construction de l'arbre
    oMask.appendChild(oBarre);
    oMask.appendChild(oSup50);
    elem.appendChild(oMask);
  }
  return elem;
}

// Initialisation après chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
  var oJauges = document.querySelectorAll('.progress-circle');
  var i, nb = oJauges.length;
  for( i=0; i < nb; i +=1){
    createJauge(oJauges[i]);
  }
});

function initJauge(elem) {
  var oBarre;
  var angle;
  var valeur;
  //
  createJauge( elem);
  oBarre = elem.querySelector('.progress-barre');
  valeur = elem.getAttribute('data-value');
  valeur = valeur ? valeur * 1 : 0;
  elem.setAttribute('data-value', valeur.toFixed(1));
  angle = 360 * valeur / 100;
  if (oBarre) {
    oBarre.style.transform = 'rotate(' + angle + 'deg)';
  }
}

// Initialisation après chargement du DOM
document.addEventListener('DOMContentLoaded', function () {
  var oJauges = document.querySelectorAll('.progress-circle');
  var i, nb = oJauges.length;
  for (i = 0; i < nb; i += 1) {
    initJauge(oJauges[i]);
  }
});
*/