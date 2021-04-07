import React, {useState, useEffect} from 'react';
import Post from './Post/Post';

import { Grid, CircularProgress, Box, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import { useSelector } from 'react-redux';

import useStyles from './styles';

const Posts = ({ setCurrentId }) => {

    const classes = useStyles();

    const posts = useSelector((state) => state.posts);         // From reducers/index.js

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);

    const list = posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={6} >
            <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
    ));


    console.log(posts);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);

    return (
        !posts.length ? <CircularProgress className={classes.circular} size='3.4rem' /> : (
            <>
            <Grid className={classes.container} container alignItems='stretch' spacing={3} >
                {currentPosts}
            </Grid>
            <Grid container justify='center' className={`${classes.pagination}`}>
                <Button size='small' variant='contained' className={`${classes.pagButton} ${classes.typography}`} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage == 1}>
                    <Typography variant='BUTTON'>ANTERIOR</Typography>
                </Button>
                <Box m={3}> <Typography className={classes.cPage}>{currentPage}</Typography> </Box>
                <Button size='small' variant='contained' className={`${classes.pagButton} ${classes.typography}`} onClick={() => setCurrentPage(currentPage + 1)} disabled={(currentPosts.length < 10) || (posts.length == currentPage * postPerPage)}>
                    <Typography variant='BUTTON'>SIGUIENTE</Typography>
                </Button>
            </Grid>
            </>
        )
    );
}

export default Posts;