import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import 'moment/locale/es';
import { useDispatch } from 'react-redux';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import { deletePost, likePost } from '../../../actions/posts';

import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Card className={classes.card} >
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant='h6' className={classes.typography} > { post.creator } </Typography>
                <Typography variant='body2'> { moment(post.createdAt).locale('es').fromNow() } </Typography>
            </div>
            <div className={classes.overlay2}>
                <Button 
                    style={{color: 'white'}} 
                    size='small' 
                    onClick={() => setCurrentId(post._id)} 
                >
                    <EditOutlinedIcon className={classes.edit} fontSize='small' />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary' > { post.tags.map((tag) => `#${tag}` ) } </Typography>
            </div>
            <Typography className={`${classes.title} ${classes.typography}`} variant='h4' > { post.title } </Typography>
            <CardContent>
                <Typography className={`${classes.message} ${classes.typography}`} variant='body1' color='textSecondary' component='p' > { post.message } </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' onClick={() => dispatch(likePost(post._id))} >
                    <ThumbUpAltIcon fontSize='small' />
                    &nbsp; {post.likeCount}
                </Button>
                <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))} >
                    <DeleteIcon fontSize='small' />
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post;