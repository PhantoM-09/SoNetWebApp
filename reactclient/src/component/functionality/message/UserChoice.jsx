import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const UserChoice = (props) => {
    const [users, setUsers] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [lastCompanion, setLastCompanion] = useState({});
    const [start, setStart] = useState(false);

    const searchingUsers = users.filter(searchingUser => {
        return String(searchingUser.userLastName).toLowerCase().includes(searchString.toLowerCase().trim())
    })

    const searchUsers = (e) =>{

        if(e.target.value.length === 0)
        {
            axios.get('http://localhost:5000/api/friend/get-friends/', { withCredentials: true })
            .then(response => {
                setUsers(response.data);
            })
        }
        else
        {
            axios.get('http://localhost:5000/api/user/get-all-users/', { withCredentials: true })
            .then(response => {
                setUsers(response.data);
            })
        }

        setSearchString(e.target.value)
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/friend/get-friends/', { withCredentials: true })
            .then(response => {
                setUsers(response.data);
            })

    }, [])

    const joinChat = (companion) =>{
        if(companion !== lastCompanion && !start)
        {
            setLastCompanion(companion);
            props.joinChat(companion);
            setStart(true);
        }
        else
        {
            props.closeConnection();
            setLastCompanion(companion);
            props.setChatCompanion(companion);
             
        }
    }
    return (
        <div>
            <div className='col-md'>
                <input type="text" className="form-control" placeholder="Поиск друзей" value={searchString} onChange={searchUsers} />
            </div>
            <div style={{ border: '1px solid black', borderRadius: 8, marginTop: '2.7%' }}>
                {(searchingUsers.length === 0 && searchString != '') && <div style={{ textAlign: 'center', marginTop: '2%', fontSize: '14pt', marginBottom: '2%' }} >Пользователей нет</div>}
                {searchingUsers?.map((user) => (
                    <div className="row-md" key={user.userId}>
                        <div className="row">
                            <div className="col-md-2">
                                <img src={'http://localhost:5000/' + user.userProfileImage} style={{ cursor: 'pointer', borderRadius: 500, height: 60, width: 60, objectFit: 'cover', marginLeft: '40%', marginTop: '30%' }} onClick={e => joinChat(user)}/>
                            </div>
                            <div className='col-md-8' style={{ fontSize: '12pt', marginLeft: '12%', marginTop: '1%' }}>
                                <div className='row-md text-break'>
                                    {user.userLastName + ' ' + user.userName}
                                </div>
                            </div>
                            <div className='row-md'>
                                <hr style={{ height: '0.5%', border: '0 none', color: 'black', backgroundColor: 'black', marginLeft: '4%', marginRight: '4%' }} />
                            </div>
                        </div>

                    </div>
                ))}
            </div>

        </div>

    );
}

export default UserChoice;