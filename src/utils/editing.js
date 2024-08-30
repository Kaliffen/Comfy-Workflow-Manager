
function makeEditable(element, inputType, onSaveCallback) {
    const originalValue = element.textContent;
    const inputField = document.createElement(inputType);
    inputField.value = originalValue;
    element.replaceWith(inputField);
    inputField.focus();
    inputField.select();

    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            element.textContent = inputField.value;
            inputField.replaceWith(element);

            if (onSaveCallback) {
                onSaveCallback();
            }
        } else if (event.key === 'Escape') {
            element.textContent = originalValue;
            inputField.replaceWith(element);
        }
    });

    inputField.addEventListener('blur', () => {
        element.textContent = inputField.value;
        inputField.replaceWith(element);

        if (onSaveCallback) {
            onSaveCallback();
        }
    });
}

export { makeEditable };