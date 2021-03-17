import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Typography, Avatar } from '@material-ui/core';
import useStyles from './styles';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './searchbar.css';

function SearchBar() {

    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const dispatch = useDispatch();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        history.push('/');

        setUser(null);
    }

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

    useEffect(() => {
        const token = user?.token;

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [url]);

    return (
    <div className="search">
        <div className='logo'>
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
            {url.pathname === '/' ? <> { user?.result ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>
                        {user?.result.name.charAt(0)}
                    </Avatar>
                    <Typography className={`${classes.userName} ${classes.typography}`} >
                        {user?.result.name}
                    </Typography>
                    <button className='login' onClick={logout} >CERRAR SESIÓN</button>
                </div>
            ) : (
                <Link to='/auth'>
                    <button type='button' className='login' >INGRESAR</button>
                </Link>
            )} </> : null}
        </div>
    </div>
    )
}
export default SearchBar;