import React, { useEffect, useState } from 'react'
import { CircularProgress, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import './styles.css';

const PostDetails = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    
    const [post, setPost] = useState(null);
    const url = useLocation();
    const id = url.pathname.split('/')[2];

    const fetchPost = () => {
        fetch(`http://localhost:5000/posts/${id}/details`)
        .then(response => {
           return response.json();
         })
        .then(data => {
           setPost(data);
        })
        .catch(error => {
            console.log(error);
        })
    };

     useEffect(() => {
         fetchPost();
    }, [url]);

    const handleProfile = () => {
        history.push(`/user/${post[0].creator}`)
    }


    return (
        <>
        { post === null ? <CircularProgress size='3.4rem' color='black' className='circularProgress'/> :
        <Paper className='paper-post-detail'>
            <div className='content' >
                <h2 style={{  wordWrap: 'break-word'}}>{post[0].title}</h2>
                <p style={{ fontSize: '.9rem', marginTop: '-0.4rem', marginLeft: '1rem'}}>{post[0].tags && post[0].tags === '' ? post[0].tags.map((tag) => `#${tag} `) : null }</p>
                <div className={'post-detail-message'}><p style={{ marginTop: '-2rem', backgroundColor: 'rgb(253,253,253)', fontSize: '1.4rem', borderBottom: 'solid 0.1px rgb(240,240,240)', marginBottom: '-1.2rem', paddingBottom: '1.4rem', padding: '1.4rem', wordWrap: 'break-word', marginRight: 'auto', marginLeft: 'auto', maxWidth: '26rem'}}>{post[0].message}</p></div>
                <p onClick={handleProfile} className='post-detail-created' style={{ cursor: 'pointer',fontSize: '1.2rem', margin: '1rem'}}>{post[0].name}</p>
                <p style={{ marginTop: '-.3rem', marginLeft: '1rem', color: 'rgb(120,120,120)', fontSize: '.9rem' }}>{post[0].email}</p>
                <p style={{ marginTop: '2rem', fontSize: '.8rem' }} >{ moment(post[0].createdAt).fromNow() }</p>
            </div>
            <div className='image-div'>
                { post[0]?.selectedFile === '' ? 
                <img style={{ minHeight: '14.64rem'}} src='https://static.thenounproject.com/png/140281-200.png' ult='no-image' className='image-post-detail' />
                :
                <img src={post[0].selectedFile} ult={post[0].title} className='image-post-detail' />}
            </div>
        </Paper>
        }
        </>
    )
}
export default PostDetails;
