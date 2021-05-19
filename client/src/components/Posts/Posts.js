import React, { useState } from 'react';
import Post from './Post/Post';

import { LazyLoadComponent } from 'react-lazy-load-image-component';

import { Grid, CircularProgress, Box, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import { useSelector } from 'react-redux';

import useStyles from './styles';
import './styles.css';

const Posts = ({ setCurrentId }) => {

    const classes = useStyles();

    const { posts, isLoading } = useSelector((state) => state.posts);         // From reducers/index.js

    // const [currentPage, setCurrentPage] = useState(1);
    // const postPerPage = 6;

    const list = posts?.map((post) => (
        <LazyLoadComponent>
            <Grid item key={post._id} xs={12} sm={6} >
                <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
        </LazyLoadComponent>
    ));


    // const indexOfLastPost = currentPage * postPerPage;
    // const indexOfFirstPost = indexOfLastPost - postPerPage;
    // const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);

    return (
        isLoading ? <CircularProgress className={classes.circular} size='3.4rem' /> : (
            <>
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                    <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
                ))}
            </Grid>
            </>
        )
    );
}

export default Posts;