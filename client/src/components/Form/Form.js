import React, { useState, useEffect } from 'react';

import { Typography, TextField, Button, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';

import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {

    const dispatch = useDispatch();

    const classes = useStyles();
    const post = useSelector((state) => currentId ? state.posts.find((p) => currentId === p._id) : null );

    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    });

    useEffect(() => {
        if(post) setPostData(post)
    }, [post]);

    const clear = () => {
        setCurrentId(0);
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(currentId === 0) {
            dispatch(createPost(postData));
            clear();
        } else {
            dispatch(updatePost(currentId, postData));
            clear();
        }
    }

    return (
        <Paper className={classes.paper} >
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                <Typography variant='h6' className={classes.typography} >
                    {currentId ? 'Edita' : 'Postea'} tu Momentazo
                </Typography>
                <TextField
                    name='creator' 
                    variant='outlined'
                    label='Creador'
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                />
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
                    label='Tags'
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
                <Button className={`${classes.buttonSubmit} ${classes.typography}`} variant='contained' size='large' type='submit' fullWidth>
                    Postear
                </Button>
                <Button className={`${classes.clean} ${classes.typography}`} variant='contained' size='small' onClick={clear} fullWidth>
                    Limpiar
                </Button>
            </form>
        </Paper>
    )
}

export default Form;