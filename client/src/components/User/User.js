import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import { Avatar, Grid, CircularProgress } from '@material-ui/core';
import './styles.css';
import Post from '../Posts/Post/Post';
import { useDispatch } from 'react-redux';
import { followUser } from '../../actions/user';
import Modal from './Modal';
import { fetchPosts } from '../../api';


const User = () => {

    const [user, setUser] =                 useState(JSON.parse(localStorage.getItem('profile')));
    // STATES

    const [users, setUsers] =               useState(null);
    console.log(users?.followers);

    const [posts, setPosts] =               useState([]);

    const [likePosts, setLikePosts] =       useState([]);

    const [follows, setFollows] =           useState([]);
    const [followers, setFollowers] =        useState([]);
    console.log(followers);

    const [switchPosts, setSwitchPosts] =   useState(false);

    const [currentId, setCurrentId] =       useState(0);

    const [isOpen, setIsOpen] =             useState(false);
    const [isOpenTwo, setIsOpenTwo] =       useState(false);

    const dispatch =                        useDispatch();

    const url = useLocation().pathname;
    const history = useHistory();
    const id = url.split('/')[2];


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

    const fetchFollows = () => {
        fetch(`http://localhost:5000/user/${id}/getFollows`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setFollows(data);
        })
        .catch(error => {
            console.log(error);
        })
    }
      const fetchFollowers = () => {
          if(users?.followers) {
            fetch(`http://localhost:5000/user/${users?.followers}/getFollowers`)
          .then(response => {
              return response.json();
          })
          .then(data => {
              setFollowers(data);
          }).catch(err =>{
              console.log(err);
          })};
      }


    // FETCH EFFECT

    useEffect(() => {
        fetchFollows();
        fetchPostsUser();
        fetchUser();
    }, [currentId, url]);
    
    useEffect(() => {
        fetchFollowers();
    }, [url])

    const handleSetSwitch = () => {
        fetchLikePosts();
        setSwitchPosts(true);
    }
    const handleTrueSwitch = () => {
        setSwitchPosts(false);
    }

    const handleFollow = () => {
        dispatch(followUser(id));
        setTimeout(window.location.reload.bind(window.location), 100);
    };

    const handleClickFollow = (follow) => {
        history.push(follow._id || follow);
        setIsOpen(false);
        setIsOpenTwo(false);
    }


    // COMPONENTS

    const Follow = () => {
        if(users?._id){
        return users.followers.find((follow) => follow === (user?.result?.googleId || user?.result?._id))
            ? (
            <div className='red-text'>
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
                {users?.isAdmin && (
                    <div className='admin'>
                        Admin
                    </div>
                )}
                <div className='card-body'>
                    <h3 className='fullname'>
                        {users?.name?.toUpperCase() ? users?.name?.toUpperCase() : posts[0]?.name?.toUpperCase() || 'Usuario de Google sin publicaciones' }
                    </h3>
                    <h5 className='email'>
                        {users?.email ? users.email : posts[0]?.email || '-'}
                    </h5>              
                </div>
                { user?.result?._id === users?._id || !user ? null
                :
                <button className='follow-btn' onClick={() => handleFollow()}>
                    <BottonFollow />
                </button>
                }
                <div className='col user-posts-card'>
                    <p><span className='count'>{posts.length}&nbsp;</span>{posts > 1 ? 'Posts' : 'Post'}</p>
                </div>
                 {users?.name ? <div className='card-footer'>
                    <div className='col vr' onClick={() => setIsOpen(true)} style={{ cursor: 'pointer' }}>
                        <p><span className='count'>{follows?.length}</span>&nbsp;Siguiendo</p>
                    </div>
                    <Modal open={isOpen} onClose={()=> setIsOpen(false)}>
                        {follows?.length === 0 ? <div>Este usuario no sigue a nadie.</div> : follows?.map((follow) => (
                            <div className='follow-list' onClick={() => handleClickFollow(follow)}>
                                <div>{follow?.name}</div>
                                <Avatar className='mini-avatar' alt={follow?.name} />
                            </div>
                        ))}
                    </Modal>
                    <div className='col' onClick={() => setIsOpenTwo(true)} style={{ cursor: 'pointer' }}>
                        <p><span className='count'>{users?.followers.length}</span>&nbsp;Seguidores</p>
                    </div>
                    <Modal open={isOpenTwo} onClose={() => setIsOpenTwo(false)}>
                     { users?.followers?.length === 0 ? <div>Este usuario no tiene seguidores.</div> : users?.followers?.map((follows) => (
                            <div className='follow-list' onClick={() => handleClickFollow(follows)}>
                                <div>{follows}</div>
                                <Avatar className='mini-avatar' alt={follows} />
                            </div>
                        ))}
                    </Modal>
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
                )).reverse()} 
            </div> :
            <div className='grid-posts'>
            { likePosts.length ? likePosts.map((post) => (
                    <Grid item key={post._id} >
                        <div className='singular-post'>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </div>
                    </Grid>
            )).reverse() : <CircularProgress size='3.5rem' color='black' className='circularProgress'/>}
            </div>
            }
        </div>}
        </>
    )
}

export default User;
