import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import axios from 'axios';


const ModalForGrant = (props) => {

    const grantUser = (type) => {
        var formData = new FormData();
        formData.append("type", type);

        axios.post('https://localhost:7132/api/admin/add-admin/' +  props.actionUser.userId, formData, { withCredentials: true })
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
                    Выберите тип Администратора:
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex justify-content-start'>
                        <button className='btn btn-primary' onClick={() => grantUser("ContentAdmin")}>Администратор контента</button>
                        <button className='btn btn-primary' style={{ marginLeft: '1%' }} onClick={() => grantUser("AccessAdmin")}>Администратор доступа</button>
                    </div>
                    <div className='d-flex justify-content-end' style={{ marginTop: '2%' }}>
                        <button className='btn btn-secondary' style={{ marginRight: '1%' }} onClick={() => props.onHide()} type="button">Отмена</button>
                    </div>
            </Modal.Body>
        </Modal >
    );
}

export default ModalForGrant;