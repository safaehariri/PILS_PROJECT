

chrome.runtime.onMessage.addListener(function (message, sender, response) {
    if (message.from === 'content' && message.subject === 'sendDataToPopup') {
        // Utilisez les données renvoyées du serveur pour mettre à jour le HTML
        updatePopupHTML(message.data);
        p=message.data
        console.log("oke")
    }
});


chrome.tabs.query(
	{active: true, 
	currentWindow: true},
	function (tabs){
	chrome.tabs.sendMessage(tabs[0].id, 
		{from: 'popup',
	     subject: 'getData'});
        }
	);

// Function to get the URL of the active tab and perform an action with it
function sendActiveTabUrl() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        var activeTabUrl = activeTab.url;
        // Perform an action with the activeTabUrl, like sending it somewhere
        console.log("Active tab URL: " + activeTabUrl); // Example action: logging it to the console
        // For instance, you could copy it to the clipboard or send it to a server
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var moreButton = document.getElementById('seeMoreButton');
    moreButton.addEventListener('click', function() {
      // Ouvrir un nouvel onglet avec le contenu de index.html
      chrome.tabs.create({ url: 'page.html' });
      
      
      window.close();
    });
});

// Set up the event listener for the button
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('buttonSelect').onclick = sendActiveTabUrl;
});

// Fonction pour mettre à jour le HTML du popup avec les données reçues
function updatePopupHTML(data) {
    // Utilisez les données renvoyées du serveur pour mettre à jour le HTML
    console.log('Data received in popup:', data);

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


