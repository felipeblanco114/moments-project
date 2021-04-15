import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Typography, Avatar } from '@material-ui/core';
import useStyles from './styles';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import swal from 'sweetalert';

import decode from 'jwt-decode';

import './searchbar.css';

function SearchBar() {

    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [disabled, setDisabled] = useState(true);

    const dispatch = useDispatch();

    const logout = () => {
        swal({
            title: "¿Estás seguro de salir de tu cuenta?",
            text: "¡Podrás volver cuando quieras!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                dispatch({ type: 'LOGOUT' });
                history.push('/');
                setUser(null);
            }
          });
        // dispatch({ type: 'LOGOUT' });

        // history.push('/');

        // setUser(null);
    }

    const TokenExpired = () => {
        dispatch({ type: 'LOGOUT' });

        history.push('/');

        setUser(null);
    }

    const [search, setSearch] = useState();

    const history = useHistory();
    const url = useLocation();

    const handleChange = (e) => {
        setSearch(e.target.value);
        if(e.target.value.length > 0) setDisabled(false);
    };

    const handleSearch = () => {
        history.push(`search?q=${search}`);
        window.location.reload();
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token)

            if (decodedToken.exp * 1000 < new Date().getTime()) TokenExpired();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [url]);

    const emailUsername = user?.result?.email.split('@')[0];

    return (
    <div className="search">
            <Link to='/'>
            <div className='logo'>
                <p className='train'>MOMENTAZOS</p>
            </div>
            </Link>
        {   !(url.pathname === '/auth') ? 
            <form>
                <div className='form-box'>

                    <input
                        className="search-input"
                        type="text"
                        placeholder="Busca tu Momentazo"
                        onChange={handleChange}
                        value={search}
                        autoComplete='off'
                        id="input"
                    />
                    <input
                        className="search-btn"
                        onClick={handleSearch}
                        id="button"
                        value="  🔎"
                        disabled={disabled}
                    />
                </div>
            </form>
            : null
        }
        
        <div className={classes.toolbar} >
            { user?.result ? (
                <div className={classes.profile}>
                    <Link to={`/user/${emailUsername}`}>
                    <Avatar className={`${classes.purple} ${classes.typography}`} alt={user?.result.name} src={user?.result.imageUrl}>
                        {user?.result.name.charAt(0)}
                    </Avatar>
                    </Link>
                    <Typography className={`${classes.userName} ${classes.typography}`} >
                        Hola, {user?.result.name.split(' ')[0]}!
                    </Typography>
                    <button className='login' onClick={logout} >CERRAR SESIÓN</button>
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