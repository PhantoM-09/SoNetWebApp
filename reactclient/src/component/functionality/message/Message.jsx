import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import React, { useContext, useState } from 'react';
import { Context } from '../../..';
import Chat from './Chat';
import UserChoice from './UserChoice';

const Message = () => {
    const { user } = useContext(Context);
    const [connection, setConnection] = useState();
    const [messages, setMessages] = useState([]);
    const [chatCompanion, setChatCompanion] = useState({});

    const joinChat = async (companion) => {
        try {
            setChatCompanion(companion);
            console.log(chatCompanion);

            const connection = new HubConnectionBuilder()
                .withUrl('https://localhost:7132/chat')
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReceiveMessage", (text, send) => {
                var message = {
                    messageText: text,
                    messageSend: send
                };
                console.log('mes' + message);
                setMessages(messages => [...messages, message]);
                console.log('mess' + messages);
            })

            await connection.start();
            var connectionUser = {
                UserId: new String(user.userId),
                CompanionId: new String(companion.userId)
            }
            await connection.invoke("Join", connectionUser);
            setConnection(connection);
        }
        catch (e) {

        }
    }

    return (
        <div className="col-md-10" style={{marginBottom: '5%'}}>
            <div className='container-md-12'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserChoice joinChat={joinChat} />
                    </div>
                    <div className='col-md'>
                        <Chat messages={messages} chatCompanion={chatCompanion} />
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Message;

