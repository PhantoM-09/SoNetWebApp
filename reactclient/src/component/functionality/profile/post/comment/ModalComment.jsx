import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from '../../../../..';


const ModalComment = (props) => {
    const { user } = useContext(Context);
    const [editComment, setEditComment] = useState({});

    const [commentText, setCommentText] = useState("");

    const sendPost = (e) => {

        e.preventDefault();

        var formData = new FormData();
        formData.append("text", commentText);
        axios.post('http://localhost:5000/api/comment/add-comment/' + props.commentedPost.postId, formData, { withCredentials: true })
            .then(response => {
                props.setComments(response.data);
                setCommentText("");
            })
    }

    const deleteComment = (deletedComment) => {
        var formData = new FormData();
        formData.append("postId", props.commentedPost.postId);
        axios.post('http://localhost:5000/api/comment/delete-comment/' + deletedComment.commentId, formData, { withCredentials: true })
            .then(response => {
                props.setComments(response.data);
            })
    }

    return (
        <Modal
            size='lg'
            centered
            show={props.show}
            onHide={props.onHide}
            style={{ zIndex: 500000 }}>
            <Modal.Header id='contained-model-title-vcenter'>
                <div className='container-md'>
                    <div className='row-md'>
                        <div className="col-md-12" style={{ border: '1px black solid', borderRadius: 8, fontSize: '12pt', marginTop: '2%' }}>
                            <div className="row-md">
                                <div className="col-md d-inline-block" >
                                    <img style={{ borderRadius: 500, height: 80, width: 80, objectFit: 'cover', marginTop: '10%', marginLeft: '10%' }} src={props.user.profileImage} />
                                </div>
                                <div className="col-md-10 d-inline-block">
                                    <div className="col-md-8" style={{ fontSize: '14pt', marginLeft: '3%' }}>
                                        {props.user.lastName + ' ' + props.user.name}
                                    </div>
                                    <div className="col-md-6" style={{ fontSize: '12pt', marginLeft: '3%' }}>
                                        {(new Date(props.commentedPost.postPublication)).toLocaleString().substring(0, (new Date(props.commentedPost.postPublication)).toLocaleString().length - 3)}
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: '3%', marginLeft: '-0.5%', marginRight: '23%', fontSize: '14pt' }}>
                                <div className="col-md text-break text-justify">
                                    {props.commentedPost.postText}
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: '3%', marginBottom: '1.5%' }}>
                            </div>
                        </div>
                    </div>
                    {props.comments?.map((comment) => (
                        <div className='row-md' key={comment.commentId}>
                            <div className="col-md-12" style={{ border: '1px black solid', borderRadius: 8, fontSize: '12pt', marginTop: '2%' }}>
                                <div className="row-md">
                                    <div className="col-md d-inline-block" >
                                        <img style={{ borderRadius: 500, height: 60, width: 60, objectFit: 'cover', marginTop: '10%', marginLeft: '10%' }} src={'http://localhost:5000/' + comment.userProfileImage} />
                                    </div>
                                    <div className="col-md-10 d-inline-block">
                                        <div className="col-md-8" style={{ fontSize: '12pt', marginLeft: '3%' }}>
                                            {comment.userLastName + ' ' + comment.userName}
                                        </div>
                                        <div className="col-md-6" style={{ fontSize: '10pt', marginLeft: '3%' }}>
                                            {(new Date(comment.commentSend)).toLocaleString().substring(0, (new Date(comment.commentSend)).toLocaleString().length - 3)}
                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: '1%', marginLeft: '-0.5%', marginRight: '23%', fontSize: '12pt' }}>
                                    <div className="col-md text-break text-justify">
                                        {comment.commentText}
                                    </div>
                                </div>
                                <div className="col-md" style={{ marginTop: '0.5%', marginBottom: '1.5%' }}>
                                {user.userId === comment.userId
                                    || user.userType === "MainAdmin" || user.userType === "ContentAdmin"
                                        ?
                                        (<button className='btn btn-primary' style={{ marginLeft: '1%' }} onClick={() => { deleteComment(comment) }}>Удалить</button>)
                                        :
                                        (null)
                                    }
                                    {user.userId === comment.userId
                                        ?
                                        (<button className='btn btn-primary' style={{ marginLeft: '1%', visibility: 'hidden' }}>Редактировать</button>)
                                        :
                                        (null)
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </Modal.Header>
            <Modal.Body>
                <form onSubmit={sendPost}>
                    <div className='row' style={{ marginLeft: '0%', marginRight: '0%', marginBottom: '2%' }}>
                        <div className='col-md-9' style={{ marginTop: '2%', marginLeft: '0%' }}>
                            <input name="messageText" type="text" className="form-control" placeholder="Комментарий" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                        </div>
                        <div className='col-md' style={{ marginTop: '2%', marginLeft: '0%' }}>
                            <button className='btn btn-primary' type="submit">Отправить</button>
                        </div>

                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalComment;