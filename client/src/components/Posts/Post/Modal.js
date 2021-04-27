import React from 'react'
import './modal.css';

const Modal = ({ open, children, onClose }) => {

    if(!open) return null;

    return (
        <>
        <div className='overlay-post' />
        <div className='modal-post'>
            <button className='modal-btn-post' onClick={onClose}>✖</button>
            {children}
        </div>
        </>
    )
}

export default Modal
