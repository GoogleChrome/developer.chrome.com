const {html} = require('common-tags');

// The button will be added to all 'pre' blocks as a new child element.
function CopyCodeButton() {
  return html`
    <script type="module">
      // Pulls all 'pre' blocks from the current web page.
      let blocks = document.querySelectorAll('pre');
      // A button is created to each block.
      blocks.forEach(block => {
        // Adjusting styles for the 'pre' block.
        block.style = \`
                display: inline-flex;
                width: 100%;
                position: relative;
            \`;
        // The button is created.
        let button = document.createElement('button');
        // Adjusting styles to the button.
        button.style = \`
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 1.5rem;
                height: auto;
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                margin: 0;
                padding: 0.15rem;
                background: #f8f9fa;
                border: 0.1rem solid #959D9C;
                border-radius: 0.25rem;
                color: #fff;
                font-weight: 600;
                cursor: pointer;
            \`;
        // Creating an image element ('copy code' icon).
        let img = document.createElement('img');
        img.src =
          'https://img.icons8.com/fluency-systems-regular/512/clone-figure--v3.png';
        // Adjusting styles for the icon.
        img.style = \`
                filter: none;
                width: 100%;
                height: auto;
                margin: 0;
                padding: 0;
            \`;
        // The image is added as a child to the button.
        button.appendChild(img);
        // Button behavior when clicked.
        button.onclick = () => {
          console.log('Copy code to clipboard.');
          // The content of the 'code' block (also a child fo the 'pre' block)
          // is added to the selection.
          let code = block.querySelector('code');
          const range = document.createRange();
          range.selectNode(code);
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(range);
          // We save that selection.
          let selection = window.getSelection();
          // We temporarily change the icon to a checkmark ('code copied' icon).
          img.src = 'https://img.icons8.com/color/512/checkmark.png';
          // If the browser does not support clipboard API...
          if (!navigator.clipboard) {
            // ...use the old commandExec() way.
            document.execCommand('copy');
            // If it is supported...
          } else {
            // ...the selection is converted to string and saved on the clipboard.
            try {
              navigator.clipboard.writeText(selection.toString());
            } catch (error) {
              console.error(error);
            }
          }
          // Finally, everything is de-selected.
          window.getSelection().removeAllRanges();
          // After 2 seconds, the icon is returned to the 'copy code' icon.
          setTimeout(() => {
            img.src =
              'https://img.icons8.com/fluency-systems-regular/512/clone-figure--v3.png';
          }, 2000);
        };
        // The button is added as a child to the 'pre' block.
        block.appendChild(button);
      });
    </script>
  `;
}

module.exports = {CopyCodeButton};
