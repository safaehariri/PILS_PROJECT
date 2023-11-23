

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



