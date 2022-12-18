import React from 'react'
import { useState } from 'react';

const SendMessageForm = () => {
    const [messageText, setMessageText] = useState("");

    return (
        <div className='col-md' style={{marginTop: '5%'}}>
            <div className='row' style={{ borderTop: '0.1px solid black', borderRadius: '0px 0px 8px 8px', marginLeft: '0%', marginRight: '0%', marginBottom: '2%' }}>
                <div className='col-md-10' style={{marginTop: '2%', marginLeft: '0.5%'}}>
                    <input name="messageText" type="text" className="form-control" placeholder="Введите сообщение" value={messageText} onChange={e => setMessageText(e.target.value)} />
                </div>
                <div className='col-md' style={{marginTop: '2%', marginLeft: '0%'}}>
                    <button className='btn btn-primary'>Отправить</button>
                </div>

            </div>
        </div>
    );
}

export default SendMessageForm;