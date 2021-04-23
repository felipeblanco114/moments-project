import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Container, Grow, Grid, Typography } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

import { useDispatch } from 'react-redux';

import Post from '../Posts/Post/Post';
import useStyles from './styles';


const Search = () => {

    const classes = useStyles();

    // STATES

    const [search, setSearch] = useState([]);

    console.log(search)

    const [currentId, setCurrentId] = useState(0);

    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    const url = useLocation();
    
    var urlSearch = url.search.split('=').pop();

    // FETCH

    const fetchSearch = () => {
        fetch(`http://localhost:5000/posts/search/${urlSearch}`)
        .then(response => {
           return response.json();
         })
        .then(data => {
           setSearch(data);
        })
        .catch(error => {
            console.log(error);
        })
    };

    // USE EFFECT

    useEffect(() => {
        fetchSearch();
        setLoading(false);
    }, [currentId, dispatch]);
    
    // COMPONENTS

    const LoadingOrNull = () => {
        if(search?.length === 0 && loading === false) {
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
            <Grow in className={classes.gridResults}>
            { search?.length ? <Container>
                 <Grid container className={classes.mainContainer} justify='space-between' alignItems='stretch' spacing={3} >

                 {search.map((post) => (
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
