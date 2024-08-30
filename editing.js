// Function to edit a workflow
function editWorkflow(card) {
    const titleElement = card.querySelector('.card-title');
    const descriptionElement = card.querySelector('.card-text');
    const jsonLink = card.querySelector('a');
    const cardBody = card.querySelector('.card-body');

    const originalTitle = titleElement.textContent;
    const originalDescription = descriptionElement.textContent;
    const originalJsonUrl = jsonLink.href;

    // Create input fields for editing
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = originalTitle;
    const descriptionInput = document.createElement('textarea');
    descriptionInput.value = originalDescription;

    // Create a file input for uploading a new JSON file
    const jsonFileInput = document.createElement('input');
    jsonFileInput.type = 'file';
    jsonFileInput.accept = 'application/json';

    // Replace card content with input fields
    cardBody.innerHTML = '';
    cardBody.appendChild(titleInput);
    cardBody.appendChild(document.createElement('br'));
    cardBody.appendChild(descriptionInput);
    cardBody.appendChild(document.createElement('br'));
    cardBody.appendChild(jsonFileInput);

    // Create save and cancel buttons with icons
    const saveButton = document.createElement('button');
    saveButton.classList.add('btn', 'btn-success', 'mr-2');
    const saveIcon = document.createElement('i');
    saveIcon.classList.add('fas', 'fa-check');
    saveButton.appendChild(saveIcon);

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('btn', 'btn-secondary');
    const cancelIcon = document.createElement('i');
    cancelIcon.classList.add('fas', 'fa-times');
    cancelButton.appendChild(cancelIcon);

    cardBody.appendChild(saveButton);
    cardBody.appendChild(cancelButton);

    // Save button click handler
    saveButton.addEventListener('click', () => {
        const newTitle = titleInput.value.trim();
        const newDescription = descriptionInput.value.trim();

        // Handle JSON file upload
        if (jsonFileInput.files.length > 0) {
            const file = jsonFileInput.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const newJsonUrl = e.target.result;
                updateWorkflow(card, newTitle, newDescription, newJsonUrl);
            };
            reader.readAsDataURL(file);
        } else {
            // No new JSON file uploaded, keep the original URL
            updateWorkflow(card, newTitle, newDescription, originalJsonUrl);
        }
    });

    // Cancel button click handler
    cancelButton.addEventListener('click', () => {
        // Restore original content
        titleElement.textContent = originalTitle;
        descriptionElement.textContent = originalDescription;
        jsonLink.href = originalJsonUrl;

        cardBody.innerHTML = '';
        cardBody.appendChild(titleElement);
        cardBody.appendChild(descriptionElement);
        cardBody.appendChild(jsonLink);

        // Add edit and delete buttons back
        addEditDeleteButtons(card);
    });
}

// Function to update a workflow card
function updateWorkflow(card, newTitle, newDescription, newJsonUrl) {
    // Re-create the title, description, and link elements
    const titleElement = document.createElement('h5');
    titleElement.classList.add('card-title');
    titleElement.textContent = newTitle;

    const descriptionElement = document.createElement('p');
    descriptionElement.classList.add('card-text');
    descriptionElement.textContent = newDescription;

    const jsonLink = document.createElement('a');
    jsonLink.href = newJsonUrl;
    jsonLink.classList.add('btn', 'btn-primary');

    // Add Font Awesome icon
    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-download');
    jsonLink.appendChild(icon);

    // Get the card body and clear its contents
    const cardBody = card.querySelector('.card-body');
    cardBody.innerHTML = '';

    // Append the new elements to the card body
    cardBody.appendChild(titleElement);
    cardBody.appendChild(descriptionElement);
    cardBody.appendChild(jsonLink);
}

// Function to delete a workflow
function deleteWorkflow(card) {
    if (confirm('Are you sure you want to delete this workflow?')) {
        card.remove();
    }
}

// Function to add edit and delete buttons to a card
function addEditDeleteButtons(card) {
    const cardBody = card.querySelector('.card-body');

    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-warning', 'mr-2');
    editButton.title = 'Edit';
    const editIcon = document.createElement('i');
    editIcon.classList.add('fas', 'fa-edit');
    editButton.appendChild(editIcon);
    editButton.addEventListener('click', () => editWorkflow(card));

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.title = 'Delete';
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash-alt');
    deleteButton.appendChild(deleteIcon);
    deleteButton.addEventListener('click', () => deleteWorkflow(card));

    cardBody.appendChild(editButton);
    cardBody.appendChild(deleteButton);
}

// Function to make an element editable
function makeEditable(element, inputType) {
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
        } else if (event.key === 'Escape') {
            element.textContent = originalValue;
            inputField.replaceWith(element);
        }
    });

    // Handle blur event (lose focus)
    inputField.addEventListener('blur', () => {
        element.textContent = inputField.value;
        inputField.replaceWith(element);
    });
}