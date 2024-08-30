import React, { useState } from 'react';
import Workflow from '../App'; // Import the Workflow class from App.

function EditWorkflow({ workflow, onSave, onCancel }) {
    const [title, setTitle] = useState(workflow.title);
    const [description, setDescription] = useState(workflow.description);
    const [imageUrl, setImageUrl] = useState(workflow.imageUrl || '');
    const [namespace, setNamespace] = useState(workflow.namespace || '');

    const handleSave = () => {
        // Extract the original title without the namespace
        const originalTitleMatch = workflow.title.match(/^(.+)\.(.+)$/);
        const originalTitle = originalTitleMatch ? originalTitleMatch[2] : workflow.title;

        const updatedWorkflow = new Workflow(originalTitle, description, workflow.jsonData, imageUrl, namespace);
        onSave(updatedWorkflow);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value);
    };

    const handleNamespaceChange = (event) => {
        setNamespace(event.target.value);
    };

    return (
        <div className="card workflow-card">
            <div className="card-body">
                <div className="form-group">
                    <label htmlFor="edit-title">Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="edit-title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-description">Description:</label>
                    <textarea
                        className="form-control"
                        id="edit-description"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-imageUrl">Image URL:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="edit-imageUrl"
                        value={imageUrl}
                        onChange={handleImageUrlChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-namespace">Namespace:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="edit-namespace"
                        value={namespace}
                        onChange={handleNamespaceChange}
                    />
                </div>
                <button className="btn btn-success mr-2" onClick={handleSave}>Save</button>
                <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default EditWorkflow;