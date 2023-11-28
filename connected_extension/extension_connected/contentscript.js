chrome.runtime.sendMessage(
{
	from: 'content',
	subject: 'getTabId'
});

function sendDataToServer(data) {
	fetch('http://127.0.0.1:5000/receive_data', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
	.then(response => response.json())
	.then(data => {
		console.log('Success:', data);
	})
	.catch((error) => {
		console.error('Error:', error);
	});
}

function fetchDataFromServer() {
    fetch('http://127.0.0.1:5000/get_data', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log('Data from server:', data);
            // Envoie les données récupérées depuis le serveur au popup
            chrome.runtime.sendMessage({
                from: 'content',
                subject: 'sendDataToPopup',
                data: data
            });
        })
		
        .catch((error) => {
            console.error('Error:', error);
        });
}
 
const currentUrl = window.location.href;
chrome.runtime.onMessage.addListener(function(message, sender, response) {
    if (message.from === 'popup' && message.subject === 'getData') {

		sendDataToServer(currentUrl);

		// Envoie la requête pour récupérer les données du serveur
        fetchDataFromServer();
        // Start the review scraping process
        
    }
});



