import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Typography, Avatar } from '@material-ui/core';
import useStyles from './styles';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


import swal from 'sweetalert';

import decode from 'jwt-decode';

import './searchbar.css';

function SearchBar() {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState((null));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [disabled, setDisabled] = useState(true);
    const [avatarUser, setAvatarUser] = useState();
    const url = useLocation();

    const dispatch = useDispatch();

    const { posts } = useSelector((state) => state.posts);

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
            handleClose();
          });
        // dispatch({ type: 'LOGOUT' });

        // history.push('/');

        // setUser(null);
    }

    const handlePerfil = () => {
        history.push(`/user/${id}`);
        handleClose();
    }
    const handleHome = () => {
        history.push(`/posts`);
        handleClose();
    }

    const TokenExpired = () => {
        dispatch({ type: 'LOGOUT' });

        history.push('/');

        setUser(null);
    }

    const [search, setSearch] = useState('');

    const history = useHistory();

    const handleChange = (e) => {
        setSearch(e.target.value);
        if(e.target.value.length > 0) setDisabled(false);
    };

    const handleSearch = () => {
        history.push(`search?q=${search}`);
        window.location.reload();
    };

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            history.push(`search?q=${search}`);
            window.location.reload();
        }
    }

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token)

            if (decodedToken.exp * 1000 < new Date().getTime()) TokenExpired();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [url]);

    const handleClick = ((event) => {
        setAnchorEl(event.currentTarget);
      });
      const handleClose = () => {
        setAnchorEl(null);
      };

    // const avatarFilter = posts?.filter((post) => user?.result.email === post.email);


    // useEffect(() => {
    //     if(user?.result) {
    //         setAvatarUser(user?.result.imageUrl ? user?.result.imageUrl : avatarFilter[0] ? avatarFilter[0].selectedFile : null);    
    //     }
        
    // }, [user?.result]);

    const id = user?.result?.googleId ? user?.result?.googleId : user?.result?._id;
    const userUrl = url.pathname.split('/').includes('user');
    console.log( url.pathname.split('/'));


    return (
    <div className="search">
            <Link to='/'>
            <div className='logo'>
                <p className='train'>MOMENTAZOS</p>
            </div>
            </Link>
        {   !(url.pathname === '/auth' || userUrl) ? 
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
                        onKeyPress={handleKeyPress}
                    />
                    <input
                        className="search-btn"
                        onClick={handleSearch}
                        id="button"
                        value=""
                        disabled={disabled}
                    />
                </div>
            </form>
            : null
        }
        
        <div className={classes.toolbar} >
            { user?.result ? (
                <div className={classes.profile}>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <Typography className={`${classes.userName} ${'button-menu'}`} >
                        Hola &nbsp;{user?.result.name.split(' ')[0]} &#9660;
                    </Typography>
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem className='menu-item' onClick={logout} >
                            <p >Cerrar sesión</p>
                        </MenuItem>
                        { url.pathname !== '/posts' ?
                        <MenuItem className='menu-item' onClick={handleHome}>
                            <p>Ir a inicio</p>
                        </MenuItem> : null}
                        { !url.pathname.split('/').includes('user') ?
                        <MenuItem className='menu-item' onClick={handlePerfil}>
                            <p>Ir a Perfil</p>
                        </MenuItem> : null}
                        </Menu>
                    </div>
                    
            ) : (
                <Link to='/auth'>
                    <button type='button' className='login-no-user' >INGRESAR</button>
                </Link>
            )}
        </div>
    </div>
    )
}
export default SearchBar;