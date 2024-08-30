// Function to save workflows to a JSON file
async function saveWorkflows() {
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

    try {
        // Prompt the user to choose a file for saving (creates a new file if it doesn't exist)
        const fileHandle = await window.showSaveFilePicker({
            types: [
                {
                    description: 'JSON file',
                    accept: { 'application/json': ['.json'] },
                },
            ],
        });

        // If a file is chosen, write the JSON data to it
        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();

        console.log('Workflows saved successfully!');
    } catch (error) {
        if (error.name === 'AbortError') {
            // User canceled the save dialog
            console.log('Save operation canceled.');
        } else {
            console.error('Error saving workflows:', error);
        }
    }
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