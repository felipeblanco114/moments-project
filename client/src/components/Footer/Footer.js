import React from 'react'
import './footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='footer'>
            <Link to='/'>
            <div className={`${'logoF'} ${'hover'}`}>
                <p className='train'>MOMENTAZOS</p>
            </div>
            </Link>
            <p>Creado por Felipe Blanco Muzzolón</p>
            <p>2021</p>
        </div>
    )
}

export default Footer;
