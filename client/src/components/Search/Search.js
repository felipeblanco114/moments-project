import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Grow, Grid, Typography } from '@material-ui/core';

import { getPosts } from '../../actions/posts'
import { useDispatch } from 'react-redux';

import Posts from '../Posts/Posts';
import Post from '../Posts/Post/Post';
import useStyles from './styles';


const Search = () => {

    const classes = useStyles();

    const [currentId, setCurrentId] = useState(0);
    const posts = useSelector((state) => state.posts);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    const url = useLocation();
    
    var urlSearch = url.search.split('=').pop();
    
    let search = urlSearch.replaceAll('%20', ' ')
        .toLowerCase()
        .replaceAll('%c3%b3', 'o')
        .replaceAll('%c3%a9', 'e')
        .replaceAll('%c3%a1', 'a')
        .replaceAll('%c3%ba', 'u')
        .replaceAll('%c3%ad', 'i');
    console.log(search);

    console.log(posts.map((post) => post.title.toLowerCase() == search));

    // FILTER

    var postTitle = posts.filter((post) => 
        post.title.toLowerCase().replaceAll('ó', 'o').replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ú', 'u').replaceAll('!', '') == search || 
        post.name.toLowerCase().replaceAll('ó', 'o').replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ú', 'u') == search ||
        post.name.toLowerCase().replaceAll('ó', 'o').replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ú', 'u').replaceAll('!', '').split(' ').includes(search) ||
        post.title.toLowerCase().replaceAll('ó', 'o').replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ú', 'u').split(' ').includes(search) ||
        post.tags.includes(search)
    );

    console.log(postTitle)

    return (
        <Grow in>
            {postTitle.length ? <Container>
                 <Grid container className={classes.mainContainer} justify='space-between' alignItems='stretch' spacing={3} >

                 {postTitle.map((post) => (
                    <Grid item key={post._id} xs={12} sm={6} >
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
                    
                </Grid>
            </Container> : <Link to='/'> <Typography variant='h5'>Volver a la página principal</Typography> </Link>}
        </Grow>
    )
}

export default Search
