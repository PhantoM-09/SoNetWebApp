import axios from 'axios';
import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Context } from '../../../..';
import { PROFILE_ROUTE } from '../../../../utils/consts';
import StrangePost from './post/StrangePost';

const StrangeProfile = () => {
    const [isStart, setIsStart] = useState(false);

    const { strangeUser } = useContext(Context);
    const navigate = useNavigate();
    const [profileUser, setProfileUser] = useState({ lastName: '', name: '', birthDate: null, sex: '', country: null, city: null, profileImage: '', profileBackground: '', friendCount: 0, subscriberCount: 0 })

    const [relationMode, setRelationMode] = useState('');

    const actionWithStrange = (id) => {
        var id = strangeUser.UserId;
        switch (relationMode) {
            case 'Удалить из друзей':
                deleteFriend(id);
                break;
            case 'Принять заявку':
                applyFriend(id);
                break;
            default:
                sendRequestToFriend(id);
                break;
        }
    }

    const deleteFriend = (userId) => {
        var formData = new FormData();
        formData.append("friendId", userId);

        axios.post('https://localhost:7132/api/friend/delete-friend/', formData, { withCredentials: true })
            .then(response => {
                if (response.data === 'subscriber') {
                    setRelationMode("Принять заявку")
                }
                else {
                    setRelationMode("Добавить в друзья");
                }

                var strangeUserId = strangeUser.UserId;
                axios.get('https://localhost:7132/api/user/get-strange-user/' + strangeUserId, { withCredentials: true })
                    .then(response => {
                        var userInfo = response.data;

                        setProfileUser({ ...profileUser, friendCount: userInfo.friendCount, subscriberCount: userInfo.subscriberCount });
                    })
                    .catch(error => {
                        if (error.response) {
                            toast.error(error.response.data.message, {
                                position: toast.POSITION.BOTTOM_RIGHT,
                                autoClose: 2000,
                                pauseOnFocusLoss: false
                            });

                            navigate(PROFILE_ROUTE);
                        }
                    })
            })
    }

    const applyFriend = (userId) => {
        var formData = new FormData();
        formData.append("friendId", userId);

        axios.post('https://localhost:7132/api/friend/apply-friend/', formData, { withCredentials: true })
            .then(() => {
                setRelationMode("Удалить из друзей")
                var strangeUserId = strangeUser.UserId;
                axios.get('https://localhost:7132/api/user/get-strange-user/' + strangeUserId, { withCredentials: true })
                    .then(response => {
                        var userInfo = response.data;
                        setProfileUser({ ...profileUser, friendCount: userInfo.friendCount, subscriberCount: userInfo.subscriberCount });
                    })
                    .catch(error => {
                        if (error.response) {
                            toast.error(error.response.data.message, {
                                position: toast.POSITION.BOTTOM_RIGHT,
                                autoClose: 2000,
                                pauseOnFocusLoss: false
                            });

                            navigate(PROFILE_ROUTE);
                        }
                    })
            })
    }

    const sendRequestToFriend = (userId) => {
        var formData = new FormData();
        formData.append("friendId", userId);

        axios.post('https://localhost:7132/api/friend/add-friend/', formData, { withCredentials: true })
            .then(() => {
                setRelationMode("Удалить из друзей")
                var strangeUserId = strangeUser.UserId;
                axios.get('https://localhost:7132/api/user/get-strange-user/' + strangeUserId, { withCredentials: true })
                    .then(response => {
                        var userInfo = response.data;
                        setProfileUser({ ...profileUser, friendCount: userInfo.friendCount, subscriberCount: userInfo.subscriberCount });
                    })
                    .catch(error => {
                        if (error.response) {
                            toast.error(error.response.data.message, {
                                position: toast.POSITION.BOTTOM_RIGHT,
                                autoClose: 2000,
                                pauseOnFocusLoss: false
                            });

                            navigate(PROFILE_ROUTE);
                        }
                    })
            })
    }


    useEffect(() => {
        var strangeUserId = strangeUser.UserId;

        axios.get('https://localhost:7132/api/user/get-strange-user/' + strangeUserId, { withCredentials: true })
            .then(response => {
                var userInfo = response.data;
                console.log(userInfo);
                axios.get('https://localhost:7132/api/file/get-strange-profile-image/' + strangeUserId, { withCredentials: true })
                    .then(imageResponse => {
                        setProfileUser({ ...profileUser, lastName: userInfo.lastName, name: userInfo.name, sex: userInfo.sex, birthDate: userInfo.birthDate, friendCount: userInfo.friendCount, subscriberCount: userInfo.subscriberCount, profileImage: 'https://localhost:7132/' + imageResponse.data.profileImage, profileBackground: 'https://localhost:7132/' + imageResponse.data.profileBackground });

                        setRelationMode("Добавить в друзья")

                        if (userInfo.type === 'subscriber') {
                            setRelationMode("Принять заявку")
                        }
                        if (userInfo.type === 'friend') {
                            setRelationMode("Удалить из друзей")
                        }
                        setIsStart(true);
                    })
            })
            .catch(error => {
                if (error.response) {
                    toast.error(error.response.data.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 2000,
                        pauseOnFocusLoss: false
                    });

                    navigate(PROFILE_ROUTE);
                }
            })
    }, []);

    return (
        <div className="col-md-10">
            {isStart
                ?
                (<div className="col-md-12" style={{ position: 'relative' }}>
                    <div className="col-md-12" style={{ background: 'black', opacity: .4, width: '100%', height: 370, position: 'absolute', borderRadius: 8 }}></div>
                    <img className="col-md-12" style={{ height: 370, objectFit: 'cover', borderRadius: 8, zIndex: -1000, position: 'absolute' }} src={profileUser.profileBackground} />
                    <div className="col-md-12">
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-5" style={{ position: 'relative', top: 25 }}>
                                    <div className="col-md-12">
                                        <div className="container-md-12" style={{ border: '1px black solid', borderRadius: 8, background: 'white' }}>
                                            <div className="row-md">
                                                <div className="col-md">
                                                    <div style={{ padding: '5%' }}>
                                                        <img className="col-md-12" src={profileUser.profileImage} style={{ border: '1px black solid', borderRadius: 8, height: 290, objectFit: 'cover' }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row-md">
                                                <div className="col-md-8 offset-md-2">
                                                    <div className="text-center" style={{ fontWeight: 'bold', fontSize: '14pt', marginBottom: -10 }}>
                                                        {profileUser.friendCount}
                                                    </div>
                                                    <div className="text-center" style={{ fontSize: '14pt' }}>Друзья</div>
                                                </div>
                                            </div>
                                            <div className="row-md">
                                                <div className="col-md-8 offset-md-2">
                                                    <div className="text-center" style={{ fontWeight: 'bold', fontSize: '14pt', marginBottom: -10 }}>
                                                        {profileUser.subscriberCount}
                                                    </div>
                                                    <div className="text-center" style={{ fontSize: '14pt' }}>Подписчики</div>
                                                </div>
                                            </div>
                                            <div className="row-md">
                                                <div className="col-md">
                                                    <div style={{ padding: '5%' }}>
                                                        <button type="button" className="btn btn-primary col-md-12" style={{ fontSize: '12pt' }} onClick={actionWithStrange}>{relationMode}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6" style={{ marginTop: '40.2%', color: 'white', zIndex: 400 }}>
                                    <div className="row-md" style={{ fontSize: '20pt' }}>
                                        {profileUser.lastName + ' ' + profileUser.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md">
                        <StrangePost
                            user={profileUser} />
                        <div className="col-md-12">
                            <div className="col-md-7 offset-md-6" style={{ zIndex: 400, position: 'absolute', marginTop: '-9.1%', fontSize: '12pt' }}>
                                <div className="col-md-6 offset-md-4" style={{ border: '1px black solid', borderRadius: 8, marginLeft: '35.6%' }}>
                                    <div className="row-md" style={{ fontSize: '12pt', marginLeft: '3%', marginTop: '1.3%' }}>
                                        <div className="col-md">
                                            {'Пол: ' + profileUser.sex}
                                        </div>
                                    </div>
                                    <div className="row-md" style={{ fontSize: '12pt', marginLeft: '3%', marginTop: '1.3%' }}>
                                        <div className="col-md">
                                            {profileUser.birthDate === null ?
                                                (null)
                                                :
                                                (
                                                    'Дата рождения: ' + profileUser.birthDate
                                                )}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="row-md" style={{ fontSize: '12pt', marginLeft: '3%', marginTop: '1.3%' }}>
                                            <div className="col-md">
                                                {profileUser.country === null ?
                                                    (null)
                                                    :
                                                    (
                                                        'Страна: ' + profileUser.country
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="row-md" style={{ fontSize: '12pt', marginLeft: '3%', marginTop: '1.3%', marginBottom: '1.3%' }}>
                                            <div className="col-md">
                                                {profileUser.city === null ?
                                                    (null)
                                                    :
                                                    (
                                                        'Город: ' + profileUser.city
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
                :
                (null)}

        </div>
    );
}

export default StrangeProfile;