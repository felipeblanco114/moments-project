import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Typography, Avatar, Button } from '@material-ui/core';
import useStyles from './styles';
import { useHistory, useLocation } from 'react-router-dom';

import './searchbar.css';

function SearchBar() {

    const classes = useStyles();

    const user = null;

    // const classes = useStyles();
    const [search, setSearch] = useState();

    const history = useHistory();
    const url = useLocation();

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // history.location.pathname === "/"
        // ? history.push(`search?q=${search}&page=1`)
        // : history.push(`?q=${search}&page=1`);
        // window.location.reload();
    };

    return (
    <div className="search">
        <div className='logo'>
            {/* <img src='https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png' alt='logo' /> */}
            <Link to='/'>
                <p>MOMENTAZOS</p>
            </Link>
        </div>
        {   url.pathname === '/' ? 
            <form onSubmit={handleSubmit}>
                <div className='form-box'>

                    <input
                        className="search-input"
                        type="text"
                        placeholder="Busca tu Momentazo"
                        onChange={handleChange}
                        id="input"
                    />
                    <input
                        className="search-btn"
                        type="submit"
                        id="button"
                        value="🔎"
                    />
                </div>
            </form>
            : null
        }
        
        <div className={classes.toolbar} >
            { user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                        {user.result.name.charAt(0)}
                    </Avatar>
                    <Typography className={classes.userName} variant='h6' >
                        {user.result.name}
                    </Typography>
                    <button className='logoutButton' >CERRAR SESIÓN</button>
                </div>
            ) : (
                <Link to='/auth'>
                    <button type='button' className='login' >INGRESAR</button>
                </Link>
            )}
        </div>
    </div>
    )
}
export default SearchBar;