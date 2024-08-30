const workflowsContainer = document.getElementById('workflows-container');
const filterInput = document.getElementById('filter-input');

// Function to add a workflow to the container
function addWorkflow(workflow) {
    const card = createWorkflowCard(workflow);
    workflowsContainer.appendChild(card);
}

// Function to create a workflow card
function createWorkflowCard(workflow) {
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'workflow-card');

    if (workflow.imageUrl) {
        const img = document.createElement('img');
        img.src = workflow.imageUrl;
        img.alt = workflow.title;
        card.appendChild(img);
    }

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = workflow.title;
    cardBody.appendChild(title);

    const description = document.createElement('p');
    description.classList.add('card-text');
    description.textContent = workflow.description;
    cardBody.appendChild(description);

    const link = document.createElement('a');
    link.href = workflow.jsonUrl;
    link.classList.add('btn', 'btn-primary');

    // Add Font Awesome icon
    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-download');
    link.appendChild(icon);

    cardBody.appendChild(link);

    // Add double-click event listeners for editing
    title.addEventListener('dblclick', () => makeEditable(title, 'input'));
    description.addEventListener('dblclick', () => makeEditable(description, 'textarea'));

    card.appendChild(cardBody);
    return card;
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


// Function to filter workflows based on namespace
function filterWorkflows() {
    const filterText = filterInput.value.trim().toLowerCase();

    // Get all workflow cards
    const workflowCards = workflowsContainer.querySelectorAll('.workflow-card');

    workflowCards.forEach(card => {
        const workflowTitle = card.querySelector('.card-title').textContent.toLowerCase();
        const namespaceMatch = workflowTitle.startsWith(filterText) || filterText === ''; // Show all if filter is empty
        card.style.display = namespaceMatch ? 'block' : 'none';
    });
}

// Event listener for filter input
filterInput.addEventListener('input', filterWorkflows);

// Function to save workflows to a JSON file
function saveWorkflows() {
    const workflowsData = [];
    const workflowCards = workflowsContainer.querySelectorAll('.workflow-card');

    workflowCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent;
        const description = card.querySelector('.card-text').textContent;
        const jsonUrl = card.querySelector('a').href;
        const imageUrl = card.querySelector('img') ? card.querySelector('img').src : null;

        // Extract namespace from title (if present)
        const namespaceMatch = title.match(/^(.+)\.(.+)$/);
        const namespace = namespaceMatch ? namespaceMatch[1] : "";
        const workflowTitle = namespaceMatch ? namespaceMatch[2] : title;

        workflowsData.push({
            title: workflowTitle,
            description: description,
            jsonUrl: jsonUrl,
            imageUrl: imageUrl,
            namespace: namespace
        });
    });

    const jsonData = JSON.stringify(workflowsData, null, 2); // Pretty-print JSON

    // Create a Blob object with the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a temporary download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workflows.json';
    document.body.appendChild(a);
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Function to load workflows from a JSON file
function loadWorkflows() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';

    input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const jsonData = e.target.result;
                const workflowsData = JSON.parse(jsonData);

                // Clear existing workflows
                workflowsContainer.innerHTML = '';

                // Add loaded workflows
                workflowsData.forEach(workflow => {
                    // Prepend namespace to title if it exists
                    if (workflow.namespace) {
                        workflow.title = `${workflow.namespace}.${workflow.title}`;
                    }
                    addWorkflow(workflow);
                });
            };
            reader.readAsText(file);
        }
    });

    input.click(); // Trigger file selection dialog
}

// Get references to the buttons from the navbar
const saveButton = document.getElementById('save-button');
const loadButton = document.getElementById('load-button');

// Add event listeners to the buttons 
saveButton.addEventListener('click', saveWorkflows);
loadButton.addEventListener('click', loadWorkflows);

// Declare addWorkflow as a global function
window.addWorkflow = addWorkflow;