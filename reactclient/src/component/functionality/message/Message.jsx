import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Context } from '../../..';
import Chat from './Chat';
import UserChoice from './UserChoice';

const Message = () => {
    const { user } = useContext(Context);
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatCompanion, setChatCompanion] = useState({});
    const [start, setStart] = useState(false);
    const [closed, setClosed] = useState(false);

    useEffect(() => {
        if (closed) {

            joinChat(chatCompanion);
        }
    }, [closed])

    const joinChat = async (companion) => {
        try {

            if (connection === null) {
                setClosed(false);
                const newConnection = new HubConnectionBuilder()
                    .withUrl('http://localhost:5000/chat')
                    .configureLogging(LogLevel.Information)
                    .build();

                newConnection.on("ReceiveMessage", (text, send, sender) => {
                    var message = {
                        messageText: text,
                        messageSend: send,
                        messageSender: sender
                    };
                    setMessages(messages => [...messages, message]);

                })

                newConnection.onclose(e => {
                    setConnection(null);
                    setMessages([]);
                    setClosed(true);
                });

                await newConnection.start();
                var connectionUser = {
                    UserId: new String(user.userId),
                    CompanionId: new String(companion.userId)
                }
                await newConnection.invoke("Join", connectionUser);
                setConnection(newConnection);
            }
            console.log('START')
            setChatCompanion(companion);
            setStart(true);

            axios.get('http://localhost:5000/api/message/get-messages/' + companion.userId, { withCredentials: true })
                .then(response => {
                    setMessages(response.data)
                })
        }
        catch (e) {

        }
    }

    const closeConnection = async () => {
        try {
            await connection.stop();
        }
        catch (e) {

        }
    }

    const sendMessage = async (messageText) => {
        try {
            await connection.invoke("SendMessage", messageText)
        }
        catch (e) {

        }
    }

    return (
        <div className="col-md-10" style={{ marginBottom: '5%' }}>
            <div className='container-md-12'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserChoice joinChat={joinChat} closeConnection={closeConnection} setChatCompanion={setChatCompanion} />
                    </div>
                    {start
                        ?
                        (<div className='col-md'>
                            <Chat messages={messages} chatCompanion={chatCompanion} sendMessage={sendMessage} />
                        </div>)
                        :
                        (null)
                    }
                </div>

            </div>



        </div>
    );
}

export default Message;

