document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded event fired');

  var startButton = document.getElementById('startButton');
  if (startButton) {
    startButton.addEventListener('click', function () {
      console.log('Start button clicked');
      chrome.tabs.create({ url: 'extensionStarted.html' });
      window.close();
    });
  } else {
    console.error('Start button not found.');
  }

  fetch('comments.json')
    .then(response => response.json())
    .then(comments => {
      console.log('Comments fetched successfully:', comments);

      // Récupérez les éléments de catégorie après le chargement du JSON
      const category1Element = document.getElementById('category1');
      const category2Element = document.getElementById('category2');
      const category3Element = document.getElementById('category3');
      const category4Element = document.getElementById('category4');

      console.log('Category1 element:', category1Element);
      console.log('Category2 element:', category2Element);
      console.log('Category3 element:', category3Element);
      console.log('Category4 element:', category4Element);

      // Ajoutez ici le reste du code pour injecter les commentaires dans les catégories
      if (category1Element) {
        addCommentsToContainer(category1Element, comments.category1);
      }
      if (category2Element) {
        addCommentsToContainer(category2Element, comments.category2);
      }
      if (category3Element) {
        addCommentsToContainer(category3Element, comments.category3);
      }
      if (category4Element) {
        addCommentsToContainer(category4Element, comments.category4);
      }
    })
    .catch(error => console.error('Error fetching comments:', error));
});

function addCommentsToContainer(container, comments) {
  comments.forEach(comment => {
    const commentElement = document.createElement('p');
    commentElement.textContent = comment;
    container.appendChild(commentElement);
  });
}
