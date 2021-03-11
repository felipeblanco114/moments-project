import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import { useDispatch } from 'react-redux';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import SearchBar from './components/SearchBar/SearchBar.js'
import Footer from './components/Footer/Footer';

import kanagawa from './images/kanagawa.png';

import useStyles from './styles';

import { getPosts } from './actions/posts'              // Import actions


const App = () => {

    const [currentId, setCurrentId] = useState(0);

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <>
        <SearchBar />
        <Container maxWidth='lg' >
            {/* <AppBar className={classes.appBar} position='static' color='inherit' >
                <Typography className={`${classes.heading} ${classes.typography}`} variant='h2' align='center' >
                    Momentazos
                </Typography>
                <img src={kanagawa} className={classes.image} alt='moments' height='80' />
            </AppBar> */}
            <Grow in>
                <Container>
                    <Grid container className={classes.mainContainer} justify='space-between' alignItems='stretch' spacing={3} >

                        <Grid item xs={12} sm={7} >
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>

                        <Grid item xs={12} sm={4} >
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>

                    </Grid>
                </Container>
            </Grow>
        </Container>
        <Footer />
        </>
    )
}

export default App;