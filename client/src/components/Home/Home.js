import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid, Paper } from '@material-ui/core';

import Posts from '../Posts/Posts';
import Post from '../Posts/Post/Post';
import Form from '../Form/Form';
import { CircularProgress }from '@material-ui/core';

import { useHistory, useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { getPosts } from '../../actions/posts'              // Import actions
import useStyles from './styles';
import { fetchPosts } from '../../api';
import Paginate from '../Pagination';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {

    const [currentId, setCurrentId] = useState(0);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const id = user?.result._id || user?.result.googleId;

    const [follows, setFollows] = useState([]);

    const query = useQuery();

    const classes = useStyles();
    const dispatch = useDispatch();

    const [postsFollow, setPostsFollow] = useState([]);

    const page = query.get('page') || 1;

    console.log(user?.result);

    // const fetchFollows = () => {     // Recibe todos los usuarios que sigue mi usuario
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




    // const fetchPostsFollow = () => {    // Fetch a todos los posts de los users que sigo y de los propios
    //         for(let i = 0; i < follows?.length; i++) {
    //             fetch(`http://localhost:5000/posts/${follows[i]._id}/${id}/postsFollow`)
    //             .then(response => {
    //                 return response.json();
    //                 })
    //             .then(data => {
    //                 setPostsFollow([data]);
    //             }).catch(err =>{
    //                 console.log(err);
    //             })
    //     }
    // }
    // EJEMPLO: http://localhost:5000/posts/608b832039c0271accfce1ac/6089984e993c9d315c813ee9/postsFollow
    // RECIBE TODOS LOS POSTS DE THE WEEKND Y FELIPE BLANCO

    useEffect(() => {
        dispatch(getPosts());
        // fetchFollows();
        // fetchPostsFollow();
        // if(user?.result) {
        //     fetchFollows();              // Recibe todos los usuarios que sigo
            // fetchPostsFollow();          // Recibe todos los posts de los users que sigo y los propios posts
        // }
    }, [currentId, dispatch]);


    return (
        <Grow in>
            <Container maxWidth='xl'>
                     <Grid container className={classes.mainContainer} justify='space-between' alignItems='stretch' spacing={3} >

                    <Grid item xs={12} sm={8} >
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>

                    <Grid item xs={12} sm={4} >
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                    </Grid>
                    <Paper elavation={6} className={classes.pagination} >
                        <Paginate page={page} />
                    </Paper>
            </Container>
        </Grow>
    );
}

export default Home;
