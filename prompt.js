console.log('Works fine.');

function ask(options) {
    return new Promise(function(resolve){
        // Create a pop-up with all the fields needed:
        const popup = document.createElement('form');
        popup.classList.add('popup');
        popup.insertAdjacentHTML('afterbegin', `
            <fieldset>
                <label>${options.title}</label>
            </fieldset>
        `);

        // Check if they want a cancel button
        if(options.cancel) {
            const skipButton = document.createElement('button');
            skipButton.type = 'button';
            skipButton.textContent = 'Cancel';
            // TODO: listen for a click on that cancel button
        }
        // listen for the submit event  on the inputs

        // when someone does submit it, resolve the data that was in the input box.

        // insert that popup into the DOM
        document.body.appendChild(popup);
    });
}