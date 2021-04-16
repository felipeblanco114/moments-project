import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Grid, CircularProgress } from '@material-ui/core';
import './styles.css';
import { filterPosts } from '../../api';
import Post from '../Posts/Post/Post';


const User = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [currentId, setCurrentId] = useState(0);

    const url = useLocation().pathname;
    const userNameEmail = url.split('/').pop();
    const userEmail = userNameEmail + '@gmail.com'
    console.log(userEmail);
    

    const posts = useSelector((state) => state.posts);
    console.log(posts.email);

    const userFilter = posts.filter((post) => post.email == userEmail);
    console.log(userFilter);
    

    return ( 
        <>
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
            <div className='posts-user'>
            {userFilter.map((post) => (
                    <Grid item key={post._id} xs={12} sm={6} >
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </div>
        </>
    )
}

export default User
