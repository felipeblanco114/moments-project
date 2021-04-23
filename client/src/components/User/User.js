import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Avatar, Grid, CircularProgress } from '@material-ui/core';
import './styles.css';
import Post from '../Posts/Post/Post';
import { useDispatch } from 'react-redux';
import { followUser } from '../../actions/user';


const User = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    // STATES

    const [users, setUsers] = useState(null);

    const [posts, setPosts] = useState([]);

    const [likePosts, setLikePosts] = useState([]);

    const [switchPosts, setSwitchPosts] = useState(false);

    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    const url = useLocation().pathname;
    const id = url.split('/').pop();

    // FETCHS

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
    
    const fetchPostsUser = () => {
        fetch(`http://localhost:5000/posts/${id}`)
        .then(response => {
           return response.json();
         })
        .then(data => {
           setPosts(data);
        })
        .catch(error => {
            console.log(error);
        })
    };

    const fetchLikePosts = () => {
        fetch(`http://localhost:5000/posts/${id}/likes`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setLikePosts(data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    // FETCH EFFECT

    useEffect(() => {
        fetchPostsUser();
        fetchUser();
    }, [currentId, url]);

    const handleSetSwitch = () => {
        fetchLikePosts();
        setSwitchPosts(true);
    }
    const handleTrueSwitch = () => {
        setSwitchPosts(false);
    }

    // COMPONENTS

    const Follow = () => {
        if(users?._id){
        return users.followers.find((follow) => follow === (user?.result?.googleId || user?.result?._id))
            ? (
            <div>
                ✓
            </div>
            ) : (
            <div>
                Seguir
            </div>
            );} else {
                return <></>
            }
    };
    const BottonFollow = () => {
        return (user?.result?._id) ?
                <Follow />
        : null
    }


    return ( 
        <>
        { users === null ? <CircularProgress size='3.4rem' color='black' className='circularProgress'/> : 
        <div className='grid-users'>
            <div className='card'>
                <div className='card-header'>
                    { user?.result?.googleId === id ?
                    <Avatar className='avatarUser' alt={users?.name} src={user?.result.imageUrl}>
                        {users?.name?.charAt(0) ? users?.name?.charAt(0) : 'Google User'.charAt(0)}
                    </Avatar>
                    :   
                    <Avatar className='avatarUser' alt={users?.name} src={posts[0]?.selectedFile}>
                        {users?.name?.charAt(0) ? users?.name?.charAt(0) : 'Google User'.charAt(0)}
                    </Avatar>
                    }
                </div>
                { user?.result?._id === users?._id || !user ? null
                :
                <button className='follow-btn' onClick={() => dispatch(followUser(users._id, user?.result._id))}>
                    <BottonFollow />
                </button>
                }
                <div className='card-body'>
                    <h3 className='fullname'>
                        {users?.name?.toUpperCase() ? users?.name?.toUpperCase() : posts[0]?.name?.toUpperCase() || 'Usuario de Google sin publicaciones' }
                    </h3>
                    <h5 className='email'>
                        {users?.email ? users.email : posts[0]?.email || '-'}
                    </h5>              
                </div>
                <div className='col user-posts-card'>
                    <p><span className='count'>{posts.length}&nbsp;</span>{posts > 1 ? 'Posts' : 'Post'}</p>
                </div>
                {users?.name ? <div className='card-footer'>
                    <div className='col vr'>
                        <p><span className='count'>{users?.following.length}</span>&nbsp;Siguiendo</p>
                    </div>
                    <div className='col'>
                        <p><span className='count'>{users?.followers.length}</span>&nbsp;Seguidores</p>
                    </div>
                </div> :
                <div className='col'>
                 <p><span className='google-user-followers'>Los usuarios de Google no pueden tener seguidores</span></p>
                </div>
                }
            </div>

            <div className='posts-likes'>
                {switchPosts === false ? <h2 onClick={handleTrueSwitch} className='selected'>POSTS</h2> :
                <h2 onClick={handleTrueSwitch}>POSTS</h2>
                }
                {switchPosts === true ? <h2 onClick={handleSetSwitch} className='selected'>LIKES</h2> :
                <h2 onClick={handleSetSwitch}>LIKES</h2>
                }
            </div>
            
            { switchPosts === false ? 
            <div className='grid-posts'>
                {posts.map((post) => (
                        <Grid item key={post._id} >
                            <div className='singular-post'>
                                <Post post={post} setCurrentId={setCurrentId} />
                            </div>
                        </Grid>
                ))}
            </div> :
            <div className='grid-posts'>
            { likePosts.length ? likePosts.map((post) => (
                    <Grid item key={post._id} >
                        <div className='singular-post'>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </div>
                    </Grid>
            )) : <CircularProgress size='3.5rem' color='black' className='circularProgress'/>}
            </div>
            }
        </div>}
        </>
    )
}

export default User;
