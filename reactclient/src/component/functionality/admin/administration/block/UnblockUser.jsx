import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import axios from 'axios';


const UnblockUser = (props) => {

    const unblockUser = (e) => {
        e.preventDefault();

        axios.delete('http://localhost:5000/api/block/unblock-user/' + props.blockedUser.userId, { withCredentials: true })
            .then(response => {
                props.setUsers(response.data);
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
                    Разблокировать пользователя?
                </div>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={unblockUser}>
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-secondary' style={{ marginRight: '1%' }} onClick={() => props.onHide()} type="button">Отмена</button>
                        <button className='btn btn-primary' type="submit">Разблокировать</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default UnblockUser;