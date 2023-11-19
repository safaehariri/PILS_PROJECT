document.addEventListener('DOMContentLoaded', function() {
    var startButton = document.getElementById('startButton');
    startButton.addEventListener('click', function() {
        chrome.tabs.create({ url: 'extensionStarted.html' });
    });
});
