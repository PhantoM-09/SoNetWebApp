import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const UpdatePost = (props) => {
    const updatePost = (e) => {
        e.preventDefault();

        if(props.updatedPost.postText.length === 0)
        {
            toast.error("Публикация не может быть пустой", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
                pauseOnFocusLoss: false
              });
        }
        else
        {
            var newPost = {
                PostText: props.updatedPost.postText,
                PostPublication: new Date()
            };
    
            axios.put('https://localhost:7132/api/post/update-post/' + props.updatedPost.postId, newPost, { withCredentials: true })
                .then(response => {
                    props.setPosts(response.data);
                    props.onHide();
                })
        }
    }
    return (
        <Modal
            size='lg'
            centered
            show={props.show}
            onHide={props.onHide}
            style={{ zIndex: 500000000 }} >
            <Modal.Header id='contained-model-title-vcenter'>
                <div className='container-md'>
                    <div className='row-md'>
                        <div className='col-md-12' style={{ fontSize: '16pt' }}>
                            Обновление публикации
                        </div>
                        <div key={props.updatedPost.postId} className="col-md-12" style={{ border: '1px black solid', borderRadius: 8, fontSize: '12pt', marginTop: '2%' }}>
                            <div className="row-md">
                                <div className="col-md d-inline-block" >
                                    <img style={{ borderRadius: 500, height: 80, width: 80, objectFit: 'cover', marginTop: '10%', marginLeft: '10%' }} src={props.user.profileImage} />
                                </div>
                                <div className="col-md-10 d-inline-block">
                                    <div className="col-md-8" style={{ fontSize: '14pt', marginLeft: '3%' }}>
                                        {props.user.lastName + ' ' + props.user.name}
                                    </div>
                                    <div className="col-md-6" style={{ fontSize: '12pt', marginLeft: '3%' }}>
                                        {(new Date(props.updatedPost.postPublication)).toLocaleString().substring(0, (new Date(props.updatedPost.postPublication)).toLocaleString().length - 3)}
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: '3%', marginLeft: '-0.5%', marginRight: '23%', fontSize: '14pt' }}>
                                <div className="col-md text-break text-justify">
                                <input name="newPostText" type="text" className="form-control" placeholder='Текст публикации' value={props.updatedPost.postText} onChange={(e) => props.setUpdatedPost({...props.updatedPost, postText: e.target.value})} />
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: '3%', marginBottom: '1.5%' }}>
                                <div className="col-md-10" style={{ marginLeft: '1%' }}>
                                    {props.updatedPost.postLikeAmount > 0
                                     ? 
                                     (<img src="red-heart.png" style={{ width: 20, height: 17.2}} />)
                                     :
                                     (<img src="black-heart.png" style={{ width: 20, height: 17.2}} />)
                                    }
                                    
                                    <span style={{ fontSize: '12pt', marginLeft: '1%' }}>
                                        {props.updatedPost.postLikeAmount}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </Modal.Header>
            <Modal.Body>
                <form onSubmit={updatePost}>
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-secondary' style={{ marginRight: '1%' }} onClick={() => props.onHide()} type="button">Отмена</button>
                        <button className='btn btn-primary' style={{ color: 'white' }} type="submit">Обновить</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default UpdatePost;