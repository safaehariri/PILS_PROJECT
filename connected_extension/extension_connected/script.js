document.addEventListener('DOMContentLoaded', function () {
    
    // Add an event listener for the search button
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', function () {
        handleSearch();
    });

    document.getElementById('aboutUsLink').addEventListener('click', function() {
        var whoContent = document.getElementById('whoContent');
        whoContent.style.display = (whoContent.style.display === 'none' || whoContent.style.display === '') ? 'block' : 'none'; });
    
        document.getElementById('helpLink').addEventListener('click', function() {
            var whoContent = document.getElementById('helpContent');
            whoContent.style.display = (whoContent.style.display === 'none' || whoContent.style.display === '') ? 'block' : 'none'; });
            
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

        var categoryDropdown = document.getElementById('categoryDropdown');

        // Videz la liste déroulante existante
        categoryDropdown.innerHTML = '';

        // Ajoutez les options à la liste déroulante avec les noms des catégories
        for (let i = 1; i <= 4; i++) {
            const categoryName = data[`Categorie${i}`]['nom'];

            // Créez un élément d'option
            var option = document.createElement('option');
            option.value = categoryName;
            option.textContent = categoryName;

            // Ajoutez l'option à la liste déroulante
            categoryDropdown.appendChild(option);
        }
        // Accédez aux pourcentages des variables indépendantes
        const negatif = data['general_sentiments']['negative']
        document.getElementById('negatifValue').textContent = `${negatif}%`;

        const positif = data['general_sentiments']['positive']
        document.getElementById('PositifValue').textContent = `${positif}%`;

        // const neutre = data['general']['PourcentageAvisNeutreGlobal']
        // document.getElementById('neutreValue').textContent = `${neutre}%`;

            // Sélectionnez l'élément path par sa classe
        var cercleDeProgression1 = document.querySelector('.circle-red');
        var cercleDeProgression2 = document.querySelector('.circle-green');
        // var cercleDeProgression3 = document.querySelector('.circle-blue');
        

        // Mettez à jour la valeur de stroke-dasharray en fonction de la valeur dynamique
        cercleDeProgression1.setAttribute('stroke-dasharray', negatif + ', 100');
        cercleDeProgression2.setAttribute('stroke-dasharray', positif + ', 100');
        // cercleDeProgression3.setAttribute('stroke-dasharray', neutre + ', 100');

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

        extractAndDisplayCommentsFromCategory(data['Categorie1'], 'comments_container_1', 'negCom');
        extractAndDisplayCommentsFromCategory(data['Categorie1'], 'comments_container_1_pos', 'posCom');
        extractAndDisplayCommentsFromCategory(data['Categorie2'], 'comments_container_2_pos', 'posCom');
        extractAndDisplayCommentsFromCategory(data['Categorie2'], 'comments-container-2','negCom');
        extractAndDisplayCommentsFromCategory(data['Categorie3'], 'comments_container_3_pos', 'posCom');
        extractAndDisplayCommentsFromCategory(data['Categorie3'], 'comments-container-3','negCom');
        extractAndDisplayCommentsFromCategory(data['Categorie4'], 'comments_container_4_pos','posCom');
        extractAndDisplayCommentsFromCategory(data['Categorie4'], 'comments-container-4','negCom');
        
    }

     // Function to handle the search
    function handleSearch() {
        const searchTerm = document.getElementById('categoryDropdown').value.toLowerCase();

        // Check if the search term matches any category name
        for (let i = 1; i <= 4; i++) {
            const categoryName = document.getElementById(`Categorie${i}`).textContent.toLowerCase();
            const commentsContainerPos = document.getElementById(`comments_container_${i}_pos`);
            const commentsContainerNeg = document.getElementById(`comments-container-${i}`);

            if (categoryName.includes(searchTerm)) {
                
                scrollToElement(`Categorie${i}`);
                return;
            } 
        }
    }

    function scrollToElement(elementId) {
        document.getElementById(elementId).scrollIntoView({ behavior: 'smooth' });
    }

    function extractAndDisplayCommentsFromCategory(categoryData, containerId, com) {
        const comments = categoryData[com];
        const commentsContainer = document.getElementById(containerId);

        const maxComments = 3; // Limite le nombre de commentaires à afficher initialement
        const displayedComments = comments.slice(0, maxComments);


        displayedComments.forEach(comment => {
            const commentElement = document.createElement('p');
            commentElement.textContent = `- ${comment}`;
            commentElement.classList.add('comment-line');
            commentsContainer.appendChild(commentElement);
        });
    
        // Si le nombre total de commentaires est supérieur à la limite, ajoute le bouton "Read more reviews"
        if (comments.length > maxComments) {
            const readMoreButton = document.createElement('button');
            readMoreButton.textContent = 'Read more reviews';
            // readMoreButton.style.textAlign = 'center';
    
            // Ajoutez ces styles pour centrer le bouton
            readMoreButton.style.display = 'block'; // Affiche le bouton comme un bloc
            readMoreButton.style.margin = 'auto'; // Marge automatique pour centrer horizontalement
            readMoreButton.style.marginTop = '10px'; // Exemple de marge en haut
            readMoreButton.style.fontFamily = "Helvetica, sans-serif";
            readMoreButton.style.fontSize = "14px";
            readMoreButton.style.background = '#EBAB2B'; // Couleur de fond jaune-orange
            readMoreButton.style.border = 'none'; // Supprimer la bordure
            readMoreButton.style.borderRadius = '13.62px'; // Bouts arrondis
            readMoreButton.style.color = '#000';
            readMoreButton.style.height = '30px';

            readMoreButton.addEventListener('click', function () {
                // Efface le contenu actuel du conteneur
                if (com === "posCom") {
                    commentsContainer.innerHTML = '<h4>Positive comments :</h4>';
                } else {
                    commentsContainer.innerHTML = '<h4>Negative comments :</h4>';
                }
                
                // Affiche tous les commentaires lorsque le bouton est cliqué
                comments.forEach(comment => {
                    const commentElement = document.createElement('p');
                    commentElement.textContent = `- ${comment}`;
                    commentsContainer.appendChild(commentElement);
                });
    
                // Cache le bouton "Read more reviews" après l'affichage complet
                // readMoreButton.style.display = 'none';
            });
            commentsContainer.appendChild(readMoreButton);
        }
    }
    
    // Appeler fetchDataFromServer et stocker le résultat dans storedData
    fetchDataFromServer().then(data => {
        
        updatePopupHTML(data);

        
    });

    
});


