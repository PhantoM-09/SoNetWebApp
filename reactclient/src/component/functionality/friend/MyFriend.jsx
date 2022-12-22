import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Context } from '../../..';
import { LOGIN_ROUTE, STRANGE_ROUTE } from '../../../utils/consts';

const MyFriend = () => {
    const { user } = useContext(Context);
    const { strangeUser } = useContext(Context);

    const navigate = useNavigate();

    const [friends, setFriends] = useState([]);
    const [searchString, setSearchString] = useState("");

    const searchingFriends = friends.filter(searchingUser => {
        return String(searchingUser.userLastName).toLowerCase().includes(searchString.toLowerCase().trim())
    })

    const goStrangeProfile = (userId) => {
        strangeUser.setUserId(userId);
        navigate(STRANGE_ROUTE);
    }
    useEffect(() => {
        axios.get('http://localhost:5000/api/friend/get-friends/', { withCredentials: true })
            .then(response => {
                setFriends(response.data);
                console.log(response.data);
            })
            .catch(error => {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000,
                    pauseOnFocusLoss: false
                });

                user.setAuth(false);
                navigate(LOGIN_ROUTE);
            })
    }, [])

    const deleteFriend = (userId) => {
        var formData = new FormData();
        formData.append("friendId", userId);

        axios.post('http://localhost:5000/api/friend/delete-friend/', formData, { withCredentials: true })
            .then(() => {
                axios.get('http://localhost:5000/api/friend/get-friends/', { withCredentials: true })
                    .then(response => {
                        setFriends(response.data);
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
                    {(searchingFriends.length === 0 && searchString != '') && <div style={{ textAlign: 'center', marginTop: '5%', fontSize: '16pt' }} >Пользователей нет</div>}
                    {searchingFriends?.map((user) => (
                        <div className="row-md" key={user.userId}>
                            <div className="row">
                                <div className="col-md-1">
                                    <img src={'http://localhost:5000/' + user.userProfileImage
                                    } style={{ cursor: 'pointer', borderRadius: 500, height: 80, width: 80, objectFit: 'cover', marginLeft: '35%', marginTop: '30%' }} onClick={() => goStrangeProfile(user.userId)} />
                                </div>
                                <div className='col-md' style={{ fontSize: '14pt', marginLeft: '5%', marginTop: '1%' }}>
                                    <div className='row-md'>
                                        {user.userLastName + ' ' + user.userName}
                                    </div>
                                </div>
                                <div className='row-md offset-md-9'>
                                    <button className='btn btn-primary' style={{ marginLeft: '1%' }} onClick={() => deleteFriend(user.userId)}>Удалить из друзей</button>
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

export default MyFriend;