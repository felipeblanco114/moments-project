import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import { useDispatch } from 'react-redux';

import Home from './components/Home/Home';

import SearchBar from './components/SearchBar/SearchBar.js'
import Footer from './components/Footer/Footer';
import Auth from './components/Auth/Auth';
import Search from './components/Search/Search';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import User from './components/User/User';

// import kanagawa from './images/kanagawa.png';

const App = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <SearchBar />
            <Container maxWidth='lg' >
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/auth' exact component={Auth} />
                    <Route path='/search' component={Search} />
                    <Route path='/user/:emailUsername' component={User} />
                </Switch>
            </Container>
            <Footer />
        </BrowserRouter>
    )
}

export default App;