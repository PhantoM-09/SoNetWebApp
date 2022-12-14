import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Context } from '../../../../..';
import { STRANGE_ROUTE } from '../../../../../utils/consts';
import UnblockUser from './UnblockUser';
import ViewBlockUser from './ViewBlockUser';

const BlockedUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [searchString, setSearchString] = useState("");
    const { strangeUser } = useContext(Context);

    const [viewBlockUserVisible, setViewBlockUserVisible] = useState(false);
    const [unblockUserVisible, setUnlockUserVisible] = useState(false);
    const [blockedUser, setBlockedUser] = useState({});

    const searchingUsers = users.filter(searchingUser => {
        return String(searchingUser.userLastName).toLowerCase().includes(searchString.toLowerCase().trim())
    })

    const goStrangeProfile = (userId) => {
        strangeUser.setUserId(userId);
        navigate(STRANGE_ROUTE);
    }

    useEffect(() => {
        axios.get('https://localhost:7132/api/block/get-users/', { withCredentials: true })
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000,
                    pauseOnFocusLoss: false
                });
            })
    }, [])

    return (
        <div className='col-md'>
            <div className='col-md'>
                <input type="text" className="form-control" placeholder="Поиск пользователей" value={searchString} onChange={(e) => setSearchString(e.target.value)} />
            </div>
            <div className='col-md' style={{ marginTop: '1%' }}>
                <div style={{ border: '1px solid black', borderRadius: 8, paddingBottom: '5%' }}>
                {<ViewBlockUser
                        show={viewBlockUserVisible}
                        onHide={() => setViewBlockUserVisible(false)}
                        blockedUser={blockedUser}
                        setUsers={setUsers}
                    />
                    }
                    {<UnblockUser
                        show={unblockUserVisible}
                        onHide={() => setUnlockUserVisible(false)}
                        blockedUser={blockedUser}
                        setUsers={setUsers}
                    />
                    }
                    {(searchingUsers.length === 0 && searchString != '') && <div style={{ textAlign: 'center', marginTop: '5%', fontSize: '16pt' }} >Пользователей нет</div>}
                    {searchingUsers?.map((user) => (
                        <div className="row-md" key={user.userId}>
                            <div className="row">
                                <div className="col-md-1">
                                    <img src={'https://localhost:7132/' + user.userProfileImage
                                    } style={{ cursor: 'pointer', borderRadius: 500, height: 80, width: 80, objectFit: 'cover', marginLeft: '35%', marginTop: '30%' }} onClick={() => goStrangeProfile(user.userId)} />
                                </div>
                                <div className='col-md' style={{ fontSize: '14pt', marginLeft: '5%', marginTop: '1%' }}>
                                    <div className='row-md'>
                                        {user.userLastName + ' ' + user.userName}
                                    </div>
                                </div>
                                <div className='row-md offset-md-8' >
                                    <div className='col-md' style={{marginLeft: '4.2%'}}>
                                        <button className='btn btn-primary'  onClick={() => { setBlockedUser(user); setViewBlockUserVisible(true) }}>Просмотр информации</button>
                                    </div>
                                    <div className='col-md' style={{marginLeft: '11.2%', marginTop: '1%'}}>
                                        <button className='btn btn-primary'  onClick={() => { setBlockedUser(user); setUnlockUserVisible(true) }}>Разблокировать</button>
                                    </div>
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
    )
}

export default BlockedUsers;