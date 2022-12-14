import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Context } from '../../../..';
import { STRANGE_ROUTE } from '../../../../utils/consts';
import ModalForBlock from './ModalForBlock';
import ModalForDelete from './ModalForDelete';
import ModalForGrant from './ModalForGrant';

const Administration = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [searchString, setSearchString] = useState("");
    const { strangeUser } = useContext(Context);
    const { user } = useContext(Context);

    const [blockUserVisible, setBlockUserVisible] = useState(false);
    const [deleteUserVisible, setDeleteUserVisible] = useState(false);
    const [grantUserVisible, setGrantUserVisible] = useState(false);
    const [actionUser, setActionUser] = useState({});

    const searchingUsers = users.filter(searchingUser => {
        return String(searchingUser.userLastName).toLowerCase().includes(searchString.toLowerCase().trim())
    })

    const goStrangeProfile = (userId) => {
        strangeUser.setUserId(userId);
        navigate(STRANGE_ROUTE);
    }

    useEffect(() => {
        console.log(user.userType);
        axios.get('https://localhost:7132/api/block/get-noblock-users/', { withCredentials: true })
            .then(response => {
                setUsers(response.data);
                console.log(response.data);
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
                    {<ModalForGrant
                        show={grantUserVisible}
                        onHide={() => setGrantUserVisible(false)}
                        actionUser={actionUser}
                        setUsers={setUsers}
                    />
                    }

                    {<ModalForDelete
                        show={deleteUserVisible}
                        onHide={() => setDeleteUserVisible(false)}
                        actionUser={actionUser}
                        setUsers={setUsers}
                    />
                    }

                    {<ModalForBlock
                        show={blockUserVisible}
                        onHide={() => setBlockUserVisible(false)}
                        actionUser={actionUser}
                        setUsers={setUsers}
                    />
                    }
                    {(searchingUsers.length === 0 && searchString != '') && <div style={{ textAlign: 'center', marginTop: '5%', fontSize: '16pt' }} >Пользователей нет</div>}
                    {searchingUsers?.map((searchUser) => (
                        <div className="row-md" key={searchUser.userId}>
                            <div className="row">
                                <div className="col-md-1">
                                    <img src={'https://localhost:7132/' + searchUser.userProfileImage
                                    } style={{ cursor: 'pointer', borderRadius: 500, height: 80, width: 80, objectFit: 'cover', marginLeft: '35%', marginTop: '30%' }} onClick={() => goStrangeProfile(searchUser.userId)} />
                                </div>
                                <div className='col-md' style={{ fontSize: '14pt', marginLeft: '5%', marginTop: '1%' }}>
                                    <div className='row-md'>
                                        {searchUser.userLastName + ' ' + searchUser.userName}
                                    </div>
                                </div>
                                <div className='row-md offset-md-9' >
                                    {user.userType === 'MainAdmin'
                                        ?
                                        (<div className='col-md' style={{ marginLeft: '-9.1%' }}>
                                            <button className='btn btn-primary' onClick={() => { setActionUser(searchUser); setGrantUserVisible(true) }}>Назначить администратором</button>
                                        </div>)
                                        :
                                        (null)
                                    }

                                    <div className='col-md' style={{ marginLeft: '6%', marginTop: '1%' }}>
                                        <button className='btn btn-primary' onClick={() => { setActionUser(searchUser); setBlockUserVisible(true) }}>Блокировать</button>
                                    </div>
                                    <div className='col-md' style={{ marginLeft: '10.5%', marginTop: '1%' }}>
                                        <button className='btn btn-primary' onClick={() => { setActionUser(searchUser); setDeleteUserVisible(true) }}>Удалить</button>
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

export default Administration;