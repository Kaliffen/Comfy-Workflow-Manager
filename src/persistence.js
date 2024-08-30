import { workflows } from './module';
import { addWorkflow, Workflow } from './workflows';

// Get reference to the workflows container from the DOM
const workflowsContainer = document.getElementById('workflows-container');

// Function to save a specific workflow to local storage
function saveWorkflowsToLocalStorage(updatedWorkflow = null) {
    let workflowsData = JSON.parse(localStorage.getItem('workflows')) || [];

    if (updatedWorkflow) {
        // Find the index of the workflow to update (if it exists)
        const workflowIndex = workflowsData.findIndex(w => w.title === updatedWorkflow.title && w.namespace === updatedWorkflow.namespace);

        if (workflowIndex !== -1) {
            // Update existing workflow
            workflowsData[workflowIndex] = {
                title: updatedWorkflow.title,
                description: updatedWorkflow.description,
                jsonData: updatedWorkflow.jsonData,
                imageUrl: updatedWorkflow.imageUrl,
                namespace: updatedWorkflow.namespace
            };
        } else {
            // Add new workflow
            workflowsData.push({
                title: updatedWorkflow.title,
                description: updatedWorkflow.description,
                jsonData: updatedWorkflow.jsonData,
                imageUrl: updatedWorkflow.imageUrl,
                namespace: updatedWorkflow.namespace
            });
        }
    } else {
        // If no specific workflow is provided, save all workflows from the global array
        workflowsData = workflows.map(workflow => ({
            title: workflow.title,
            description: workflow.description,
            jsonData: workflow.jsonData,
            imageUrl: workflow.imageUrl,
            namespace: workflow.namespace
        }));
    }

    localStorage.setItem('workflows', JSON.stringify(workflowsData));
}

// Function to load workflows from local storage
function loadWorkflowsFromLocalStorage() {
    const workflowsData = JSON.parse(localStorage.getItem('workflows')) || [];

    // Clear existing workflows
    workflowsContainer.innerHTML = '';

    // Add loaded workflows
    workflowsData.forEach(workflowData => {
        const workflow = new Workflow(workflowData.title, workflowData.description, workflowData.jsonData, workflowData.imageUrl, workflowData.namespace);
        addWorkflow(workflow);
    });
}

// Get reference to the reset button
const resetButton = document.getElementById('reset-button');

// Add event listener to reset button
resetButton.addEventListener('click', () => {
    if (window.confirm('Are you sure you want to reset local storage? This will delete all workflows.')) {
        localStorage.setItem('workflows', JSON.stringify([]));
        workflowsContainer.innerHTML = '';
    }
});

export { saveWorkflowsToLocalStorage, loadWorkflowsFromLocalStorage };