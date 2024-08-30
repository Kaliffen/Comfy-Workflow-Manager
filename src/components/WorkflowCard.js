import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import JsonEditor from './JsonEditor';
import { makeEditable } from '../utils/editing';

function WorkflowCard({ workflow, onDelete, onEdit, onSave }) { // Make sure onSave is received as a prop
    const [isEditingJson, setIsEditingJson] = useState(false);

    // Use the refs from the workflow object
    const titleRef = workflow.titleRef;
    const descriptionRef = workflow.descriptionRef;

    const handleEditJson = () => {
        setIsEditingJson(true);
    };

    const handleSaveJson = (newJsonData) => {
        workflow.jsonData = newJsonData;
        setIsEditingJson(false);
        onSave(); // Call the onSave prop to trigger saving in the parent component
    };

    return (
        <div className="col-md-4 workflow-card">
            {workflow.imageUrl && <img src={workflow.imageUrl} alt={workflow.title} className="card-img-top" />}
            <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center">
                    <h5
                        className="card-title flex-grow-1"
                        onDoubleClick={() => makeEditable(workflow.titleRef.current, 'input', onSave)}
                        ref={workflow.titleRef}
                    >
                        {workflow.title}
                    </h5>
                    <FontAwesomeIcon icon={faTrashAlt} className="text-danger ml-2" title="Delete" onClick={onDelete} />
                </div>

                <p
                    className="card-text"
                    onDoubleClick={() => makeEditable(workflow.descriptionRef.current, 'textarea', onSave)}
                    ref={workflow.descriptionRef}
                >
                    {workflow.description}
                </p>

                {/* Conditionally render the button based on jsonData */}
                <button className="btn btn-warning mr-2" title="Edit JSON Data" onClick={handleEditJson}>
                    <FontAwesomeIcon icon={faEdit} />
                </button>

                {isEditingJson && (
                    <JsonEditor jsonData={workflow.jsonData} onSave={handleSaveJson} />
                )}

                {/* Add an Edit button */}
                <button className="btn btn-primary mt-2" title="Edit Workflow" onClick={onEdit}>
                    <FontAwesomeIcon icon={faEdit} />
                </button>
            </div>
        </div>
    );
}

export default WorkflowCard;