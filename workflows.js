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

    // Add double-click event listeners for editing (if needed)
    title.addEventListener('dblclick', () => makeEditable(title, 'input'));
    description.addEventListener('dblclick', () => makeEditable(description, 'textarea'));

    card.appendChild(cardBody);
    return card;
}

// Function to filter workflows based on namespace
function filterWorkflows() {
    const filterText = filterInput.value.trim().toLowerCase();

    // Get all workflow cards
    const workflowCards = workflowsContainer.querySelectorAll('.workflow-card');

    workflowCards.forEach(card => {
        const workflowTitle = card.querySelector('.card-title').textContent.toLowerCase();
        const namespaceMatch = workflowTitle.startsWith(filterText) || filterText === '';
        card.style.display = namespaceMatch ? 'block' : 'none';
    });
}

// Event listener for filter input
filterInput.addEventListener('input', filterWorkflows);

// Declare addWorkflow as a global function
window.addWorkflow = addWorkflow;