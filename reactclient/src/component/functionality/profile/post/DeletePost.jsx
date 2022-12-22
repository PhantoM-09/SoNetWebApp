import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import axios from 'axios';


const DeletePost = (props) => {

    const deletePost = (e) => {
        e.preventDefault();
        axios.delete('http://localhost:5000/api/post/delete-post/' + props.deletedPost.postId, { withCredentials: true })
            .then(response => {
                props.setPosts(response.data);
                props.onHide();
            })
    }
    return (
        <Modal
            size='lg'
            centered
            show={props.show}
            onHide={props.onHide}
            style={{ zIndex: 500000000 }}>
            <Modal.Header id='contained-model-title-vcenter'>
                <div style={{ fontSize: '16pt' }}>
                    Удалить публикацию?
                </div>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={deletePost}>
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-secondary' style={{ marginRight: '1%' }} onClick={() => props.onHide()} type="button">Отмена</button>
                        <button className='btn btn-danger' type="submit">Удалить</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default DeletePost;