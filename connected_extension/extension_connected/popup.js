// Écoutez les messages du contenu de la page
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

    // const positif = data['VariablesIndependantes']['PourcentageAvisPositifGlobal']
    // document.getElementById('PositifValue').textContent = `${positif}%`;

    // const neutre = data['VariablesIndependantes']['PourcentageAvisNeutreGlobal']
    // document.getElementById('neutreValue').textContent = `${neutre}%`;


}


