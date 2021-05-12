import React from 'react'
import './modal.css';

const Modal = ({ open, children, onClose }) => {

    if(!open) return null;

    return (
        <>
        <div className='overlay-post' onClick={onClose} > <button className='modal-btn-post' onClick={onClose}>✖</button> </div>

            <div className='modal-post'>
                {children}
            </div>
        </>
    )
}

export default Modal
