import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import axios from 'axios';


const ModalForDelete = (props) => {

    const deleteUser = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("userId", props.actionUser.userId);

        axios.post('https://localhost:7132/api/user/delete-user/', formData, { withCredentials: true })
            .then(() => {
                axios.get('https://localhost:7132/api/block/get-noblock-users/', { withCredentials: true })
                    .then(response => {
                        props.setUsers(response.data);
                        props.onHide();
                    })
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
                    Удалить пользователя?
                </div>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={deleteUser}>
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-secondary' style={{ marginRight: '1%' }} onClick={() => props.onHide()} type="button">Отмена</button>
                        <button className='btn btn-danger' type="submit">Удалить</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalForDelete;