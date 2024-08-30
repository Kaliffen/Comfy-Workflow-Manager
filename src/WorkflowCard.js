import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

function WorkflowCard({ workflow, onDelete, onSave }) { // Add onSave prop
    const [isEditingJson, setIsEditingJson] = useState(false);

    // Use the refs from the workflow object
    const titleRef = workflow.titleRef;
    const descriptionRef = workflow.descriptionRef;

    const handleEditJson = () => {
        setIsEditingJson(true);
    };

    const handleSaveJson = () => {
        setIsEditingJson(false);
        onSave(); // Call the onSave prop to trigger saving in the parent component
    };
    
    return (
        <div className="col-md-4 workflow-card">
            {workflow.imageUrl && <img src={workflow.imageUrl} alt={workflow.title} />}
            <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center">
                    <h5
                        className="card-title flex-grow-1"
                        onDoubleClick={() => makeEditable(titleRef.current, 'input', saveWorkflowsToLocalStorage)}
                        ref={titleRef}
                    >
                        {workflow.title}
                    </h5>
                    <FontAwesomeIcon icon={faTrashAlt} className="text-danger ml-2" title="Delete" onClick={onDelete} />
                </div>

                <p
                    className="card-text"
                    onDoubleClick={() => makeEditable(descriptionRef.current, 'textarea', saveWorkflowsToLocalStorage)}
                    ref={descriptionRef}
                >
                    {workflow.description}
                </p>

                {workflow.jsonData && workflow.jsonData !== "{}" ? (
                    <button className="btn btn-warning mr-2" title="Edit JSON Data" onClick={handleEditJson}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                ) : (
                    <button className="btn btn-success" title="Add JSON Data" onClick={handleEditJson}>
                        <FontAwesomeIcon icon={faPlus} className="text-white" />
                    </button>
                )}

                {isEditingJson && (
                    <textarea
                        className="form-control mt-2"
                        rows={5}
                        defaultValue={workflow.jsonData}
                        onBlur={(e) => {
                            workflow.jsonData = e.target.value;
                            handleSaveJson();
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default WorkflowCard;

