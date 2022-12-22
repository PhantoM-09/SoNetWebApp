import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import axios from 'axios';


const ModalForRevoke = (props) => {

    const revokeUser = (e) => {
        e.preventDefault();
        axios.delete('http://localhost:5000/api/admin/delete-admin/' +  props.actionUser.userId, { withCredentials: true })
            .then(() => {
                axios.get('http://localhost:5000/api/admin/get-admins/', { withCredentials: true })
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
                    Убрать статус администратора?
                </div>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={revokeUser}>
                <div className='d-flex justify-content-start'>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-secondary' style={{ marginRight: '1%' }} onClick={() => props.onHide()} type="button">Отмена</button>
                        <button className='btn btn-danger' type="submit">Да</button>
                    </div>
                </form>
                
            </Modal.Body>
        </Modal >
    );
}

export default ModalForRevoke;