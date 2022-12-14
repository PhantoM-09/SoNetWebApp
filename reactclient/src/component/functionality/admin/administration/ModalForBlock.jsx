import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";


const ModalForBlock = (props) => {
    const [blockReason, setBlockReson] = useState('');

    const [blockStart, setBlockStart] = useState(new Date());
    const [blockEnd, setBlockEnd] = useState(new Date());

    const blockUser = (e) => {
        e.preventDefault();

        if(blockReason.trim().length === 0)
        {
            toast.error('Введите причину блокировки', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
                pauseOnFocusLoss: false
              });
              return;
        }

        if(blockEnd.getTime() === blockStart.getTime())
        {
            toast.error('Дата начала и дата окончания не могут быть равны', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
                pauseOnFocusLoss: false
              });
              return;
        }
        
        if(blockEnd < blockStart)
        {
            toast.error('Дата окончания не может быть меньше даты начала', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
                pauseOnFocusLoss: false
              });
              return;
        }

        if(blockStart < new Date())
        {
            toast.error('Дата начала не может быть меньше текущей даты', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
                pauseOnFocusLoss: false
              });
              return;
        }

        var block = {
            BlockId: 0,
            BlockReason: blockReason,
            BLockStart: blockStart,
            BLockEnd: blockEnd,
            Users: null
        }

        axios.post('https://localhost:7132/api/block/add-user/' + props.actionUser.userId, block, {withCredentials: true})
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
                <div className='container-md'>
                    <div className='row-md' style={{ fontSize: '16pt' }}>
                        Блокирование пользователя
                    </div>
                    <div className="row-md">
                        <div className="col-md-1 d-inline-block">
                            <img src={'https://localhost:7132/' + props.actionUser.userProfileImage} style={{ borderRadius: 500, height: 80, width: 80, objectFit: 'cover', marginLeft: '0%', marginTop: '30%' }} />
                        </div>
                        <div className='col-md d-inline-block' style={{ fontSize: '16pt', marginLeft: '4%' }}>
                            <div className='col-md'>
                                {props.actionUser.userLastName + ' ' + props.actionUser.userName}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={blockUser}>
                    <input type="text" className="form-control" placeholder="Введите причину блокировки" value={blockReason} onChange={(e) => setBlockReson(e.target.value)} />

                    <div style={{ marginTop: '1%', marginBottom: '2%' }}>
                        <div>Выберите дату начала блокировки:</div>
                        <DatePicker className="col-md form-control" selected={blockStart} value={blockStart} onChange={(date: Date) => setBlockStart(date)} />
                        <div>Выберите дату окончания блокировки:</div>
                        <DatePicker className="col-md form-control" selected={blockEnd} value={blockEnd} onChange={(date: Date) => setBlockEnd(date)} />
                    </div>

                    <div className='d-flex justify-content-end' style={{ marginTop: '1%' }}>
                        <button className='btn btn-secondary' style={{ marginRight: '1%' }} onClick={() => props.onHide()} type="button">Отмена</button>
                        <button className='btn btn-primary' type="submit">Заблокировать</button>
                    </div>
                </form>

            </Modal.Body>
        </Modal>
    );
}

export default ModalForBlock;