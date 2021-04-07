import React, { useState, useEffect } from 'react';

import { Typography, TextField, Button, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

import useStyles from './styles';
import './styles.css';

const Form = ({ currentId, setCurrentId }) => {

    const dispatch = useDispatch();

    const classes = useStyles();
    const post = useSelector((state) => currentId ? state.posts.find((p) => currentId === p._id) : null );

    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    });
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(post) setPostData(post)
    }, [post]);

    const clear = () => {
        setCurrentId(0);
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(currentId === 0) {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
            clear();
        } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            clear();
        }
    };

    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    <Link className='log' to='/auth'>Logueate</Link> para crear Momentazos y likear los Momentazos de otras personas!
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} >
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                <Typography variant='h6' className={`${classes.typography} ${'momentazo'}`} >
                    {currentId ? 'Edita' : 'Postea'} tu <p>Momentazo</p>
                </Typography>
                <TextField
                    name='title' 
                    variant='outlined'
                    label='Título'
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField
                    name='message'
                    multiline
                    rows={4} 
                    variant='outlined'
                    label='Mensaje'
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField
                    name='tags' 
                    variant='outlined'
                    label='Tags (separado por coma, sin espacio)'
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                />
                <div className={classes.fileInput} >
                    <FileBase
                        type='file'
                        multiple={false}
                        onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={`${classes.buttonSubmit} ${classes.typography} ${'post'}`} variant='contained' size='large' type='submit' fullWidth>
                    Postear
                </Button>
                <Button className={`${classes.clean} ${classes.typography} ${'limpiar'}`} variant='contained' size='small' onClick={clear} fullWidth>
                    Limpiar
                </Button>
            </form>
        </Paper>
    )
}

export default Form;