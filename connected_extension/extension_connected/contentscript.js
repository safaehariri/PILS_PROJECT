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
 

const currentUrl = window.location.href;
chrome.runtime.onMessage.addListener(function(message, sender, response) {
    if (message.from === 'popup' && message.subject === 'getData') {

		sendDataToServer(currentUrl);
        // Start the review scraping process
        
    }
});



