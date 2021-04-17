import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import 'moment/locale/es';
import { useDispatch } from 'react-redux';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import { Link } from 'react-router-dom';

import swal from 'sweetalert';

import { deletePost, likePost } from '../../../actions/posts';

import useStyles from './styles';
import './styles.css'

const Post = ({ post, setCurrentId }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'))

    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `A vos y a ${post.likes.length - 1} personas` : `${post.likes.length} Me gusta` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Me gusta' : 'Me gusta'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Me gusta</>;
    };

    const deleteWarning = () => {
        swal({
            title: "¿Estás seguro de eliminar este post?",
            text: "Una vez que lo elimines ya no lo podrás recuperar",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                dispatch(deletePost(post._id));
              swal("¡Poof! El post se ha eliminado correctamente", {
                icon: "success",
              });
            }
          });
    }

    return (
        <Card className={`${classes.card} ${'shadow'}`} >
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant='h6' className={classes.typography} ><Link to={`/user/${post.creator}`}>{ post.name }</Link> </Typography>
                <Typography variant='body2'> { moment(post.createdAt).locale('es').fromNow() } </Typography>
            </div>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
                (
                <div className={classes.overlay2}>
                    <Button 
                        style={{color: 'white'}} 
                        size='small' 
                        onClick={() => setCurrentId(post._id)} 
                    >
                        <EditOutlinedIcon className={classes.edit} fontSize='small' />
                    </Button>
                </div>
                )
            }
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary' > { post.tags.map((tag) => `#${tag}` ).join(' ') } </Typography>
            </div>
            <Typography className={`${classes.title} ${classes.typography}`} variant='h4' > { post.title } </Typography>
            <CardContent>
                <Typography className={`${classes.message} ${classes.typography}`} variant='body1' color='textSecondary' component='p' > { post.message } </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' disabled={!user?.result} onClick={() => dispatch(likePost(post._id))} >
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
                    (   
                    <Button size='small' onClick={() => deleteWarning()} >
                        <DeleteIcon fontSize='small' />
                    </Button> 
                    )
                }
            </CardActions>
        </Card>
    )
}
export default Post;