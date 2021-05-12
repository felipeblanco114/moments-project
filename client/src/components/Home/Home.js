import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid } from '@material-ui/core';

import Posts from '../Posts/Posts';
import Post from '../Posts/Post/Post';
import Form from '../Form/Form';
import { CircularProgress }from '@material-ui/core';

import { useDispatch } from 'react-redux';

import { getPosts } from '../../actions/posts'              // Import actions
import useStyles from './styles';
import { fetchPosts } from '../../api';

const Home = () => {

    const [currentId, setCurrentId] = useState(0);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const id = user?.result._id || user?.result.googleId;

    // const [follows, setFollows] = useState([]);
    // console.log(follows[0]?._id);

    // const [postsFollow, setPostsFollow] = useState([]);

    // console.log(postsFollow?.length);

    const classes = useStyles();
    const dispatch = useDispatch();

    // const fetchFollows = () => {
    //     fetch(`http://localhost:5000/user/${id}/getFollows`)
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then(data => {
    //         setFollows(data);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })
    // }

    // const fetchPostsFollow = () => {
    //     fetch(`http://localhost:5000/posts/${follows[0]?._id}/${id}/getPostsFollow`)
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then(data => {
    //         setPostsFollow(data);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })
    // }

    useEffect(() => {
        dispatch(getPosts());
        // fetchFollows();
        // fetchPostsFollow();
    }, [currentId, dispatch]);

    // const followPosts = () => {
    //     <div className='grid-posts'>
    //         { postsFollow.length ? followPosts.map((post) => (
    //                 <Grid item key={post._id} >
    //                     <div className='singular-post'>
    //                         <Post post={post} setCurrentId={setCurrentId} />
    //                     </div>
    //                 </Grid>
    //         )) : <CircularProgress size='3.5rem' color='black' className='circularProgress'/>}
    //     </div>
    // };

    return (
        <Grow in>
            <Container>
                 <Grid container className={classes.mainContainer} justify='space-between' alignItems='stretch' spacing={3} >

                     {/* <followPosts /> */}
                    <Grid item xs={12} sm={7} >
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>

                    <Grid item xs={12} sm={4} >
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;
