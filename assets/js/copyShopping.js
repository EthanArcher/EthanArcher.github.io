function copyShopping() {
    var textToCopy = document.getElementById('shopping-list-output').innerText;
    
    // Use the Clipboard API for copying text
    navigator.clipboard.writeText(textToCopy)
      .then(function() {
        alert('Shopping list successfully copied to clipboard!');
      })
      .catch(function(error) {
        console.error('Error copying text: ', error);
      });
}