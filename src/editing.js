// Function to make an element editable
function makeEditable(element, inputType, onSaveCallback) {
    const originalValue = element.textContent;
    const inputField = document.createElement(inputType);
    inputField.value = originalValue;
    element.replaceWith(inputField);
    inputField.focus();
    inputField.select(); // Select all text in the input field

    // Handle key presses
    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission (if applicable)
            element.textContent = inputField.value;
            inputField.replaceWith(element);

            if (onSaveCallback) {
                onSaveCallback(); // Call the callback after saving
            }
        } else if (event.key === 'Escape') {
            element.textContent = originalValue;
            inputField.replaceWith(element);
        }
    });

    // Handle blur event (lose focus)
    inputField.addEventListener('blur', () => {
        element.textContent = inputField.value;
        inputField.replaceWith(element);

        if (onSaveCallback) {
            onSaveCallback(); // Call the callback after saving
        }
    });
}

export { makeEditable };