import React, { useState, useRef } from 'react';
import { TextField, Button, Divider } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import './styles.css';
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {

    const dispatch = useDispatch()

    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');

    const user = JSON.parse(localStorage.getItem('profile'));

    const commentsRef = useRef();

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`
        const newComments = await dispatch(commentPost(finalComment, post._id));

        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div>
            <div className='comments-section'>
                {comments.length ? 
                (<div className='comments'>
                    <h3>Comentarios</h3>
                    {comments.map((comment, i) => (
                        <>
                        <p key={i}>
                            <strong>{comment.split(': ')[0]}</strong>
                            <p>{comment.split(':')[1]}</p>
                        </p>
                        <div ref={commentsRef} />
                        <Divider style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
                        </>
                    ))}
                </div>) : null }
                
                {user?.result?.name && (<div style={{ width: '50%' }}>
                        <h4 style={{ marginTop: '1.2rem', marginLeft: '1rem' }} >Comenta este post</h4>
                        <TextField multiline 
                            rows={6} 
                            variant='outlined' 
                            value={comment} 
                            style={{ width: '95%' }} 
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginleft: '.6rem', width: '95%', height: '1rem', fontWeight: 'bold' }} disabled={!comment} onClick={handleClick} >
                            Comentar
                        </Button>
                </div>)}
            </div>
        </div>
    )
}

export default CommentSection;