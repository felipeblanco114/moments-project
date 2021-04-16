import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Grid, CircularProgress } from '@material-ui/core';
import './styles.css';
import { getPosts } from '../../actions/posts'
import { filterPosts } from '../../api';
import Post from '../Posts/Post/Post';
import { useDispatch } from 'react-redux';


const User = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    const url = useLocation().pathname;
    const userNameEmail = url.split('/').pop();
    const userEmail = userNameEmail + '@gmail.com'
    console.log(userEmail);

    useEffect(() => {
        dispatch(getPosts());
        // setLoading(false);
    }, [currentId, dispatch]);
    

    const posts = useSelector((state) => state.posts);
    console.log(posts.email);

    const userFilter = posts.filter((post) => post.email == userEmail);
    console.log(userFilter);
    

    return ( 
        <div className='grid-users'>
            <div className='card'>
                <div className='card-header'>
                    <Avatar className='avatarUser' alt={user?.result.name} src={user?.result.imageUrl ? user?.result.imageUrl : userFilter[0]?.selectedFile}>
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

export default User
