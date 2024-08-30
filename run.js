
// Sample workflow data with namespaces
const workflows = [
    {
        title: "Workflow 1",
        description: "Description of Workflow 1",
        jsonUrl: "workflow1.json",
        namespace: "Ab" // Root namespace
    },
    {
        title: "Workflow 2",
        description: "Description of Workflow 2",
        jsonUrl: "workflow2.json",
        namespace: "Ab"
    },
    {
        title: "Workflow 3",
        description: "Description of Workflow 3",
        jsonUrl: "workflow3.json",
        namespace: "Ab.Bb"
    }
];

// Add workflows to the container
workflows.forEach(workflow => {
    // Prepend namespace to title if it exists
    if (workflow.namespace) {
        workflow.title = `${workflow.namespace}.${workflow.title}`;
    }
    addWorkflow(workflow);

});