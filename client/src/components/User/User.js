import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import './styles.css';
import { filterPosts } from '../../api';


const User = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);

    return (
        <div className='card'>
            <div className='card-header'>
                <Avatar className='avatarUser' alt={user?.result.name} src={user?.result.imageUrl}>
                    {user?.result.name.charAt(0)}
                </Avatar>
            </div>
            <div className='card-body'>
                <h3 className='fullname'>
                    {user?.result?.name.toUpperCase()}
                </h3>
                <h5 className='email'>
                    {user?.result?.email}
                </h5>
            </div>
        </div>
    )
}

export default User
