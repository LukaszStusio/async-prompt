console.log('Works fine.');

const wait = (ms = 0) =>  new Promise(resolve => setTimeout(resolve, ms));

async function destroyPopup(popup) {
    let popupToRemove = popup;
    popup.classList.remove('open');
    await wait(1000);

    // remove the popup entirely!
    popup.remove();
    popupToRemove = null;
}

function ask(options) {
    return new Promise(async function(resolve){
        // Create a pop-up with all the fields needed:
        const popup = document.createElement('form');

        popup.classList.add('popup');
        popup.insertAdjacentHTML(
            'afterbegin',
            `<fieldset>
                <label>${options.title}</label>
                <input type="text" name="input" />
                <button type="submit">Submit</button>
            </fieldset>`
        );

        // Check if they want a cancel button
        if(options.cancel) {
            const skipButton = document.createElement('button');
            skipButton.type = 'button';
            skipButton.textContent = 'Cancel';
            popup.firstElementChild.appendChild(skipButton);
            // listen for a click on that cancel button
            skipButton.addEventListener(
                'click',
                function() {
                    resolve(null);
                    destroyPopup(popup);
                },
                {once: true}
            );
        }

        // listen for the submit event  on the inputs
        popup.addEventListener(
            'submit',
            function(e) {
                e.preventDefault();
                console.log('Submitted');
                resolve(e.target.input.value);

                // remove from the DOM
                destroyPopup(popup);
            },
            {once: true}
        );

        // when someone does submit it, resolve the data that was in the input box.

        // insert that popup into the DOM
        document.body.appendChild(popup);

        //  put a very small timeout before we add  the open class
        await wait(50);
        popup.classList.add('open');

    });
}

// grab every button that have a question
async function askQuestion(e) {
    const button = e.currentTarget;
    const shouldCancel = 'cancel' in button.dataset;
    const answer = await ask({
        title: button.dataset.question,
        cancel: shouldCancel,
    });
    console.log(answer);
}

const buttons = document.querySelectorAll('[data-question]');
buttons.forEach(button => button.addEventListener('click', askQuestion));

const questions = [
    {title: 'What is your name?'},
    {title: 'What is your age?', cancel: true},
    {title: 'What is your cats name?'},
];

// utility function for mapping:
async function asyncMap(array, callback) {
    // make an array to store our results:
    const results = [];
    // loop over our array:
    for (const item of array) {
        const result = await callback(item);
        results.push(result);
    }
    // when we're done with the loop, return it:
    return results;
}

async function go() {
    const answers = await asyncMap(questions, ask);
    console.log(answers);
}

go();

// async function askMany() {
//     for(const question of questions) {
//         const answer = await ask(question);
//         console.log(answer);
//     }
// }

// askMany();