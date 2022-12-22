import React from 'react'
import ChatCompanion from './ChatCompanion';
import MessageContainer from './MessageContainer';
import SendMessageForm from './SendMessage';

const Chat = (props) => {
    return (
        <div style={{ border: '1px solid black', borderRadius: 8 }}>
            <ChatCompanion chatCompanion={props.chatCompanion} />
            <MessageContainer messages={props.messages} />
            <SendMessageForm sendMessage={props.sendMessage} />
        </div>
    )
}

export default Chat;