document.addEventListener('DOMContentLoaded', function () {
    function fetchDataFromServer() {
        // Retourner la promesse générée par fetch
        return fetch('http://127.0.0.1:5000/get_data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Data from server:', data);
                return data; // Vous pouvez retourner les données si nécessaire
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function updatePopupHTML(data) {
        // Accédez aux pourcentages des variables indépendantes
        const negatif = data['VariablesIndependantes']['PourcentageAvisNegatifGlobal']
        document.getElementById('negatifValue').textContent = `${negatif}%`;

        const positif = data['VariablesIndependantes']['PourcentageAvisPositifGlobal']
        document.getElementById('PositifValue').textContent = `${positif}%`;

        const neutre = data['VariablesIndependantes']['PourcentageAvisNeutreGlobal']
        document.getElementById('neutreValue').textContent = `${neutre}%`;

            // Sélectionnez l'élément path par sa classe
        var cercleDeProgression1 = document.querySelector('.circle-red');
        var cercleDeProgression2 = document.querySelector('.circle-green');
        var cercleDeProgression3 = document.querySelector('.circle-blue');
        

        // Mettez à jour la valeur de stroke-dasharray en fonction de la valeur dynamique
        cercleDeProgression1.setAttribute('stroke-dasharray', negatif + ', 100');
        cercleDeProgression2.setAttribute('stroke-dasharray', positif + ', 100');
        cercleDeProgression3.setAttribute('stroke-dasharray', neutre + ', 100');

        //categories

        var nom1 = data['Categorie1']['nom']
        var nom2 = data['Categorie2']['nom']
        var nom3 = data['Categorie3']['nom']
        var nom4 = data['Categorie4']['nom']
        
        // Mettez à jour le contenu de la div
        document.getElementById("Categorie1").textContent = nom1;
        document.getElementById("Categorie2").textContent = nom2;
        document.getElementById("Categorie3").textContent = nom3;
        document.getElementById("Categorie4").textContent = nom4;

        const neg1 = data['Categorie1']['AvisNegatif']
        const pos1 = data['Categorie1']['AvisPositif']

        const neg2 = data['Categorie2']['AvisNegatif']
        const pos2 = data['Categorie2']['AvisPositif']
        
        const neg3 = data['Categorie3']['AvisNegatif']
        const pos3 = data['Categorie3']['AvisPositif']
        
        const neg4 = data['Categorie4']['AvisNegatif']
        const pos4 = data['Categorie4']['AvisPositif']

// Obtenez les éléments par leur ID
        var progressBar1 = document.getElementById("progress-bar1");
        var progressRemaining1 = document.getElementById("progress-remaining1");
        
        var progressBar2 = document.getElementById("progress-bar2");
        var progressRemaining2 = document.getElementById("progress-remaining2");
        
        var progressBar3 = document.getElementById("progress-bar3");
        var progressRemaining3 = document.getElementById("progress-remaining3");

        var progressBar4 = document.getElementById("progress-bar4");
        var progressRemaining4 = document.getElementById("progress-remaining4");

        // Mettez à jour les styles et le texte
        progressBar1.style.width = `${neg1}%`;
        progressBar1.textContent = `${neg1}%`;
        progressRemaining1.textContent = `${pos1}%`;

        progressBar2.style.width = `${neg2}%`;
        progressBar2.textContent = `${neg2}%`;
        progressRemaining2.textContent = `${pos2}%`;

        progressBar3.style.width = `${neg3}%`;
        progressBar3.textContent = `${neg3}%`;
        progressRemaining3.textContent = `${pos3}%`;

        progressBar4.style.width = `${neg4}%`;
        progressBar4.textContent = `${neg4}%`;
        progressRemaining4.textContent = `${pos4}%`;
    }

    // Appeler fetchDataFromServer et stocker le résultat dans storedData
    fetchDataFromServer().then(data => {
        
        updatePopupHTML(data);

        
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
    extractAndDisplayComments('comments1.csv', 'comments_container_1');
    extractAndDisplayComments('comments2.csv', 'comments-container-2');
    extractAndDisplayComments('comments2.csv', 'comments-container-3');
    extractAndDisplayComments('comments_neg.csv', 'comments_container_1_neg');
    // Ajoutez autant d'appels à extractAndDisplayComments que nécessaire
  });
  
  
  // script.js
  
  document.addEventListener('DOMContentLoaded', function() {
    const triggerElement = document.getElementById('triggerElement');
    const comments_container_1 = document.getElementById('comments_container_1');
    const comments_container_1_neg = document.getElementById('comments_container_1_neg');
  
    triggerElement.addEventListener('mouseover', function() {
        comments_container_1.classList.add('hidden');
        comments_container_1_neg.classList.remove('hidden');
    });
  
    triggerElement.addEventListener('mouseout', function() {
        comments_container_1.classList.remove('hidden');
        comments_container_1_neg.classList.add('hidden');
    });
  });
  
  
