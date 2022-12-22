import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';


const ViewBlockUser = (props) => {
    const [block, setBlock] = useState({})

    useEffect(() => {
        axios.get('http://localhost:5000/api/block/get-block/' + props.blockedUser.userId, {withCredentials: true})
        .then(response => {
            setBlock(response.data);
        })
    }, [props.blockedUser])

    return (
        <Modal
            size='lg'
            centered
            show={props.show}
            onHide={props.onHide}
            style={{ zIndex: 500000000 }}>
            <Modal.Header id='contained-model-title-vcenter'>
            <div className='container-md'>
                    <div className='row-md' style={{ fontSize: '16pt' }}>
                        Информация
                    </div>
                    <div className="row-md">
                        <div className="col-md-1 d-inline-block">
                            <img src={'http://localhost:5000/' + props.blockedUser.userProfileImage} style={{ borderRadius: 500, height: 80, width: 80, objectFit: 'cover', marginLeft: '0%', marginTop: '30%' }} />
                        </div>
                        <div className='col-md d-inline-block' style={{ fontSize: '16pt', marginLeft: '4%' }}>
                            <div className='col-md'>
                                {props.blockedUser.userLastName + ' ' + props.blockedUser.userName}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className='row-md'>Причина блокировки: {block.blockReason}</div>
                <div className='row-md'>Время начала блокировки: {(new Date(block.blockStart)).toDateString()}</div>
                <div className='row-md'>Время окончания блокировки: {(new Date(block.blockEnd)).toDateString()}</div>
            </Modal.Body>
        </Modal>
    );
}

export default  ViewBlockUser;