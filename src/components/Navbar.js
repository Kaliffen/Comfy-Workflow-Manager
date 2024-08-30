import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

function Navbar({ onAddWorkflow, onResetLocalStorage }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Workflow Collection</a>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Button
                            icon={faPlus}
                            title="Add Workflow"
                            onClick={onAddWorkflow}
                            className="btn-primary mr-2"
                        />
                    </li>
                    <li className="nav-item">
                        <Button
                            icon={faTrashAlt}
                            title="Reset Local Storage"
                            onClick={onResetLocalStorage}
                            className="btn-danger"
                        />
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;  