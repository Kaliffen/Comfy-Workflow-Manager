import { useEffect } from 'react';
import { Workflow } from '../components/workflows';

// Function to save a specific workflow to local storage
function saveWorkflowsToLocalStorage(updatedWorkflow = null) {
    let workflowsData = JSON.parse(localStorage.getItem('workflows')) || [];

    if (updatedWorkflow) {
        const workflowIndex = workflowsData.findIndex(w => w.title === updatedWorkflow.title && w.namespace === updatedWorkflow.namespace);

        if (workflowIndex !== -1) {
            workflowsData[workflowIndex] = {
                title: updatedWorkflow.title,
                description: updatedWorkflow.description,
                jsonData: updatedWorkflow.jsonData,
                imageUrl: updatedWorkflow.imageUrl,
                namespace: updatedWorkflow.namespace
            };
        } else {
            workflowsData.push({
                title: updatedWorkflow.title,
                description: updatedWorkflow.description,
                jsonData: updatedWorkflow.jsonData,
                imageUrl: updatedWorkflow.imageUrl,
                namespace: updatedWorkflow.namespace
            });
        }
    } else {
        workflowsData =     workflows.map(workflow => ({
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

    return Promise.resolve(workflowsData.map(data => new Workflow(data.title, data.description, data.jsonData, data.imageUrl, data.namespace)));
}


function Persistence({ workflows, setWorkflows, onReset }) {

    useEffect(() => {
        loadWorkflowsFromLocalStorage();
    }, []);

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset local storage? This will delete all workflows.')) {
            localStorage.setItem('workflows', JSON.stringify([]));
            setWorkflows([]);
        }
    };

    return null;
}

export { saveWorkflowsToLocalStorage, loadWorkflowsFromLocalStorage, Persistence };