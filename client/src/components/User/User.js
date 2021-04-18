import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Grid, CircularProgress } from '@material-ui/core';
import './styles.css';
import { getPosts } from '../../actions/posts'
import { filterPosts } from '../../api';
import Post from '../Posts/Post/Post';
import { useDispatch } from 'react-redux';
import { getUser } from '../../actions/user';


const User = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [users, setUsers] = useState(null);

    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    const url = useLocation().pathname;
    const id = url.split('/').pop();
    // const userEmail = userNameEmail + '@gmail.com'

    const fetchUser = () => {
        fetch(`http://localhost:5000/user/${id}`)
        .then(response => {
           return response.json();
         })
        .then(data => {
           setUsers(data);
        })
        .catch(error => {
            console.log(error);
        })
    };

    useEffect(() => {
        dispatch(getPosts());
        // setLoading(false);
    }, [currentId, dispatch]);

    useEffect(() => {
        fetchUser();
    }, [url]);



    const posts = useSelector((state) => state.posts);


    const userFilter = posts.filter((post) => post.creator == id);
    

    return ( 
        <div className='grid-users'>
            <div className='card'>
                <div className='card-header'>
                    { user?.result?.googleId == id ?
                    <Avatar className='avatarUser' alt={users?.name} src={user?.result.imageUrl}>
                        {users?.name?.charAt(0) ? users?.name?.charAt(0) : 'Google User'.charAt(0)}
                    </Avatar>
                    :   
                    <Avatar className='avatarUser' alt={users?.name} src={userFilter[0]?.selectedFile}>
                        {users?.name?.charAt(0) ? users?.name?.charAt(0) : 'Google User'.charAt(0)}
                    </Avatar>
                    }
                </div>
                <div className='card-body'>
                    <h3 className='fullname'>
                        {users?.name?.toUpperCase() ? users?.name?.toUpperCase() : userFilter[0]?.name?.toUpperCase() || 'Usuario de Google sin publicaciones' }
                    </h3>
                    <h5 className='email'>
                        {users?.email ? users.email : userFilter[0]?.email || 'Google User'}
                    </h5>
                </div>
                <div className='card-footer'>
                    <div className='col vr'>
                        <p><span className='count'>{userFilter.length}&nbsp;</span>{userFilter > 1 ? 'Posts' : 'Post'}</p>
                    </div>
                    <div className='col'>
                        <p><span className='count'>0</span>&nbsp;Followers</p>
                    </div>
                </div>
            </div>
            <div className='grid-posts'>
                {userFilter.map((post) => (
                        <Grid item key={post._id} >
                            <div className='singular-post'>
                                <Post post={post} setCurrentId={setCurrentId} />
                            </div>
                        </Grid>
                ))}
            </div>
        </div>
    )
}

export default User;
