import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Grow, Grid, Typography } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

import { getPosts } from '../../actions/posts'
import { useDispatch } from 'react-redux';

import Posts from '../Posts/Posts';
import Post from '../Posts/Post/Post';
import useStyles from './styles';


const Search = () => {

    const classes = useStyles();

    const [currentId, setCurrentId] = useState(0);
    const posts = useSelector((state) => state.posts);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
        setLoading(false);
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

    
    const match = posts.map((post) => post.title.toLowerCase() == search);
    console.log(match)
    // FILTER

    var postTitle = posts.filter((post) => 
        post.title.toLowerCase().replaceAll('ó', 'o').replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ú', 'u').replaceAll('!', '') == search || 
        post.name.toLowerCase().replaceAll('ó', 'o').replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ú', 'u') == search ||
        post.name.toLowerCase().replaceAll('ó', 'o').replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ú', 'u').replaceAll('!', '').split(' ').includes(search) ||
        post.title.toLowerCase().replaceAll('ó', 'o').replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ú', 'u').split(' ').includes(search) ||
        post.tags.includes(search) ||
        post.title.toLowerCase().replaceAll('ó', 'o').replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ú', 'u').replaceAll('!', '').split('').includes(search) ||
        post.name.toLowerCase().replaceAll('ó', 'o').replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ú', 'u').replaceAll('!', '').split('').includes(search) ||
        post.title.toLowerCase().replaceAll('ó', 'o').replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ú', 'u').replaceAll('!', '').split('', 2).join('').includes(search) ||
        post.name.toLowerCase().replaceAll('ó', 'o').replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ú', 'u').replaceAll('!', '').split('', 2).join('').includes(search) ||
        post.title.toLowerCase().replaceAll('ó', 'o').replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ú', 'u').replaceAll('!', '').split('', 3).join('').includes(search) ||
        post.name.toLowerCase().replaceAll('ó', 'o').replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ú', 'u').replaceAll('!', '').split('', 3).join('').includes(search)
    );

    console.log(postTitle)

    const LoadingOrNull = () => {
        if(match == 0) {
            return <CircularProgress className={classes.circular} size='3.4rem' />
        } else {
            return (
            <Typography className={classes.back} variant='h5'>
                No se han encontrado resultados.<br></br> 
                <Link to='/' className={classes.back}> 
                <strong>Volver a la página principal.</strong>
                </Link>
            </Typography> )
        }
    }

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
            </Container> :  
            <LoadingOrNull />
            }
        </Grow>
    )
}

export default Search
