// Source: https://ozzyczech.cz/js/add-button-to-clipboard-button-to-all-preformat-code-in-pure-javascript/
// Modified to fit this website's needs.

document.onreadystatechange = function () {
  if (document.readyState == 'complete') {

    // For all pre > code, add the following
    document.querySelectorAll('div .highlight > .highlight').forEach(function (codeBlock) {

      // Create a button
      let button = document.createElement('button');
      button.type = 'button'
      button.className = 'btn btn-sm btn-primary';
      button.innerText = 'Copy';
      button.title = 'Copy to clipboard';

      // Button Style
      button.style.padding = '2px';
      button.style.position = 'absolute';
      button.style.right = '0';
      button.style.top = '0';
      button.style.opacity = '0.6';
      button.style.zIndex = '2';

      // Add a click event
      button.addEventListener('click', function (e) {
        // Chrome doesn't seem to blur automatically
        button.blur();
        button.innerText = 'Copied ✔️';

        // Set default text on successful and failed copy
        navigator.clipboard.writeText(codeBlock.innerText).then(function () {
          setTimeout(function () {
            button.innerText = 'Copy';
          }, 2000);
        }, function (error) {
            button.innerText = 'ERROR';
            console.error(error);
        });

        // Stop all the things
        e.preventDefault();
        e.stopPropagation();

      }, false);

      // Insert before codeBlock (<code></code>)
      codeBlock.parentNode.insertBefore(button, codeBlock);
    });
  }
};