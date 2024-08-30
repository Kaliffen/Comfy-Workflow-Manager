import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Button({ icon, title, onClick, className, ...rest }) {
    return (
        <button className={`btn ${className}`} title={title} onClick={onClick} {...rest}>
            <FontAwesomeIcon icon={icon} />
        </button>
    );
}

export default Button;