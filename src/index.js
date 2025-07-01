
function createDateInput(facade) {
    const input = document.createElement('input');
    input.type = 'date';
    Object.assign(input.style, {
        touchAction: 'none',    // avoid 300ms touch delay on Safari mobile
        appearance: 'none',     // suppress native look and feel
        background: 'none',
        border: 'none',
        padding: '0',
        margin: '0',
        outline: 'none',
        position: 'absolute',
        opacity: 0
    });
    input.min = facade.min;
    input.max = facade.max;
    return input;
}

function applyDateInputStyleHack() {

    document.querySelectorAll('input[data-date-facade').forEach((facadeInput) => {

        // Get or create the underlying date input  
        if (!facadeInput._obscuredDateInput) {
            facadeInput._obscuredDateInput = createDateInput(facadeInput);
        }
        const dateInput = facadeInput._obscuredDateInput;

        // (Re)position
        const container = facadeInput.form;
        container.style.position = "relative";
        const facadeRect = facadeInput.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        dateInput.style.backgroundColor = getComputedStyle(dateInput).backgroundColor;
        dateInput.style.left = `${facadeRect.left - containerRect.left}px`;
        dateInput.style.top = `${facadeRect.top - containerRect.top}px`;
        dateInput.style.width = `${facadeInput.offsetWidth}px`;
        dateInput.style.height = `${facadeInput.offsetHeight}px`;
        facadeInput.after(dateInput);
        console.log("inserted date input", dateInput)

        // Stack the facade above date input
        facadeInput.style.zIndex = dateInput.style.zIndex ? dateInput.style.zIndex + 1 : 1;

        // Clicks fall through to now obscured date input 
        facadeInput.style.pointerEvents = 'none';

        // Alter date input so clicking anywhere opens picker dialog
        dateInput.addEventListener('click', () => {
            try {
                dateInput.showPicker();
                // facadeInput.focus();
            } catch (e) {
                dateInput.focus();
            }
        });

        let focusStart;

        if ('dateFacadeEnableKeyboard' in facadeInput.dataset) {
            
            dateInput.addEventListener('focus', () => {
                log("dateInput focus")
                focusStart = Date.now();
            });
        }


        // Sync date input's value with facade, applying custom formatter if specified
        dateInput.addEventListener('change', (e) => {
            const customFormatterName = facadeInput.dataset.dateFacadeFormatter;
            facadeInput.value = customFormatterName ?
                window[customFormatterName](dateInput.valueAsDate) :
                dateInput.value;
            
            // If keyboard input enabled restore focus after value chosen.
            // A Safari quirk is it sets a value (current date) immediately upon gaining focus
            // while simultaneously opening the picker; if we pass focus to the facade on that
            // initial change it will cancel the picker before it has a chance to appear. 
            // As a workaround, suppress passing focus if change occurred immediately after focus.
            if(
                'dateFacadeEnableKeyboard' in facadeInput.dataset &&
                Date.now() - focusStart > 500) {
                log("picker value returned");
                facadeInput.focus();
            }

        });

    })
}
document.addEventListener("DOMContentLoaded", () => {
    applyDateInputStyleHack();
    log("loaded");
})
window.addEventListener('resize', () => {
    applyDateInputStyleHack();
});


function log(msg) {
  const container = document.getElementById('log');
  if (!container) {
    console.warn(`Element with id="${elementId}" not found.`);
    return;
  }
  const p = document.createElement('p');
  p.innerText = msg;
  container.appendChild(p);
}
