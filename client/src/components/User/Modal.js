import React from 'react'
import './modal.css';

const Modal = ({ open, children, onClose }) => {
    
    if(!open) return null;

    return (
        <>
        <div className='overlay' onClick={onClose} />
        <div className='modal'>
            <button className='modal-btn' onClick={onClose}>✖</button>
            {children}
        </div>
        </>
    )
}

export default Modal
