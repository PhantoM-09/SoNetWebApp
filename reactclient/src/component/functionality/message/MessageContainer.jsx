import React from 'react'

const MessageContainer = (props) => {
    return (
        <div className='row-md'>
            {props.messages?.map((message, index) =>
                <div key={index} style={{ marginLeft: '2%' }}>
                    <div className='bg-primary' style={{ fontSize: '12pt', border: '1px solid ', borderRadius: 15, color: 'white', display: 'inline-flex', margin: '0px auto 0px auto', padding: 5, marginTop: '1%' }}>{message.messageText}</div>
                    <div style={{ fontSize: '8pt', marginLeft: '1%'}}>
                        {(new Date(message.messageSend)).toLocaleString().substring(0, (new Date(message.messageSend)).toLocaleString().length - 3)}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MessageContainer;
