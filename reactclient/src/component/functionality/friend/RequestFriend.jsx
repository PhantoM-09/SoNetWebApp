import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../..';
import { STRANGE_ROUTE } from '../../../utils/consts';

const RequestFriend = () =>{
    const {strangeUser} = useContext(Context);
    const navigate = useNavigate();

    const [subscribers, setSubscribers] = useState([]);
    const [searchString, setSearchString] = useState("");

    const searchingSubscribes = subscribers.filter(user => {
        return String(user.userLastName).toLowerCase().includes(searchString.toLowerCase().trim())
    })

    const goStrangeProfile = (userId) =>{
        strangeUser.setUserId(userId);
        navigate(STRANGE_ROUTE);
    }

    useEffect(() => {
        axios.get('https://localhost:7132/api/friend/get-subscribers/', { withCredentials: true })
            .then(response => {
                setSubscribers(response.data);
                console.log(response.data);
            })
    }, [])

    const applyFriend = (userId) =>{
        var formData = new FormData();
        formData.append("friendId", userId);

        axios.post('https://localhost:7132/api/friend/apply-friend/', formData, {withCredentials: true})
        .then(() =>{
            axios.get('https://localhost:7132/api/friend/get-subscribers/', { withCredentials: true })
            .then(response => {
                setSubscribers(response.data);
            })
        })
    }

    return (
        <div className='col-md'>
            <div className='col-md'>
                <input type="text" className="form-control" placeholder="Поиск друзей" value={searchString} onChange={(e) => setSearchString(e.target.value)} />
            </div>
            <div className='col-md' style={{ marginTop: '1%' }}>
                <div style={{ border: '1px solid black', borderRadius: 8, paddingBottom: '5%' }}>
                    {(searchingSubscribes.length === 0 && searchString != '') && <div style={{ textAlign: 'center', marginTop: '5%', fontSize: '16pt' }} >Пользователей нет</div>}
                    {searchingSubscribes?.map((user) => (
                        <div className="row-md" key={user.userId}>
                            <div className="row">
                                <div className="col-md-1">
                                    <img src={'https://localhost:7132/' + user.userProfileImage} style={{ cursor: 'pointer', borderRadius: 500, height: 80, width: 80, objectFit: 'cover', marginLeft: '35%', marginTop: '30%' }} onClick={() => goStrangeProfile(user.userId)}/>
                                </div>
                                <div className='col-md' style={{ fontSize: '14pt', marginLeft: '5%', marginTop: '1%' }}>
                                    <div className='row-md'>
                                        {user.userLastName + ' ' + user.userName}
                                    </div>
                                </div>
                                <div className='row-md offset-md-9'>
                                    <button className='btn btn-primary' style={{ marginLeft: '1%' }} onClick={() => applyFriend(user.userId)}>Принять заявку</button>
                                </div>
                                <div className='row-md'>
                                    <hr style={{ height: '0.5%', border: '0 none', color: 'black', backgroundColor: 'black', marginLeft: '2%', marginRight: '2%' }} />
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RequestFriend;