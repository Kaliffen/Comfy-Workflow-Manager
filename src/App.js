import React, { useState, useEffect } from 'react';
import WorkflowCard from './components/WorkflowCard';
import EditWorkflow from './components/EditWorkflow';
import Navbar from './components/Navbar';
import { loadWorkflowsFromLocalStorage, saveWorkflowsToLocalStorage } from './utils/persistence';

function App() {
  const [workflows, setWorkflows] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [editingWorkflowIndex, setEditingWorkflowIndex] = useState(null);

  useEffect(() => {
    loadWorkflowsFromLocalStorage().then(setWorkflows);
  }, []);

  const handleAddWorkflow = () => {
    const newWorkflow = new Workflow("New Workflow", "Description", "{}");
    newWorkflow.titleRef = React.createRef();
    newWorkflow.descriptionRef = React.createRef();
    setWorkflows([...workflows, newWorkflow]);
    saveWorkflowsToLocalStorage(workflows); // Pass the entire workflows array
  };

  const handleDeleteWorkflow = (index) => {
    if (window.confirm('Are you sure you want to delete this workflow?')) {
      setWorkflows(workflows.filter((_, i) => i !== index));
      saveWorkflowsToLocalStorage();
    }
  };

  const handleResetLocalStorage = () => {
    if (window.confirm('Are you sure you want to reset local storage? This will delete all workflows.')) {
      localStorage.setItem('workflows', JSON.stringify([]));
      setWorkflows([]);
    }
  };

  const handleEditWorkflow = (index) => {
    setEditingWorkflowIndex(index);
  };

  const handleSaveWorkflow = (updatedWorkflow) => {
    setWorkflows(workflows.map((workflow, i) =>
        i === editingWorkflowIndex ? updatedWorkflow : workflow
    ));
    setEditingWorkflowIndex(null);
    saveWorkflowsToLocalStorage();
  };

  const handleCancelEdit = () => {
    setEditingWorkflowIndex(null);
  };

  const filteredWorkflows = workflows.filter(workflow =>
      workflow.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
      <div className="container mt-5">
        <Navbar onAddWorkflow={handleAddWorkflow} onResetLocalStorage={handleResetLocalStorage} />

        <div className="form-group">
          <input
              type="text"
              className="form-control"
              id="filter-input"
              placeholder="Filter by namespace (e.g., X.Y.WorkflowName)"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        <div className="row" id="workflows-container">
          {filteredWorkflows.map((workflow, index) => (
              <div key={index} className="col-md-4">
                {editingWorkflowIndex === index ? (
                    <EditWorkflow
                        workflow={workflow}
                        onSave={handleSaveWorkflow}
                        onCancel={handleCancelEdit}
                    />
                ) : (
                    <WorkflowCard
                        workflow={workflow}
                        onDelete={() => handleDeleteWorkflow(index)}
                        onEdit={() => handleEditWorkflow(index)}
                        onSave={saveWorkflowsToLocalStorage}
                    />
                )}
              </div>
          ))}
        </div>

        {/* Include the Persistence component to handle loading and resetting */}
        <Persistence workflows={workflows} setWorkflows={setWorkflows} onReset={handleResetLocalStorage} />
      </div>
  );
}

// Workflow class
class Workflow {
  constructor(title, description, jsonData, imageUrl = null, namespace = "") {
    this.title = title;
    this.description = description;
    this.jsonData = jsonData;
    this.imageUrl = imageUrl;
    this.namespace = namespace;

    if (this.namespace) {
      this.title = `${this.namespace}.${this.title}`;
    }

    this.titleRef = React.createRef();
    this.descriptionRef = React.createRef();
  }
}

export default App;