import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const SearchFriend = () => {
    const [users, setUsers] = useState([]);
    const [searchString, setSearchString] = useState("");

    const searchingUsers = users.filter(user => {
        return String(user.userLastName).toLowerCase().includes(searchString.toLowerCase().trim())
    })

    useEffect(() => {
        axios.get('https://localhost:7132/api/user/get-users/', { withCredentials: true })
            .then(response => {
                setUsers(response.data);
                console.log(response.data);
            })
    }, [])

    const sendRequestToFriend = (userId) =>{
        var formData = new FormData();
        formData.append("friendId", userId);

        axios.post('', formData, {withCredentials: true})
        .then(response =>{
            setUsers(response.data);
        })
    }

    return (
        <div className='col-md'>
            <div className='col-md'>
                <input type="text" className="form-control" placeholder="Поиск пользователей" value={searchString} onChange={(e) => setSearchString(e.target.value)} />
            </div>
            <div className='col-md' style={{ marginTop: '1%' }}>
                <div style={{ border: '1px solid black', borderRadius: 8, paddingBottom: '5%' }}>
                    {(searchingUsers.length === 0 && searchString != '') && <div style={{ textAlign: 'center', marginTop: '5%', fontSize: '16pt' }} >Пользователей нет</div>}
                    {searchingUsers?.map((user) => (
                        <div className="row-md" key={user.userId}>
                            <div className="row">
                                <div className="col-md-1">
                                    <img src={'https://localhost:7132/' + user.userProfileImage
                                    } style={{ cursor: 'pointer', borderRadius: 500, height: 80, width: 80, objectFit: 'cover', marginLeft: '35%', marginTop: '30%' }} />
                                </div>
                                <div className='col-md' style={{ fontSize: '14pt', marginLeft: '5%', marginTop: '1%' }}>
                                    <div className='row-md'>
                                        {user.userLastName + ' ' + user.userName}
                                    </div>
                                </div>
                                <div className='row-md offset-md-9'>
                                    <button className='btn btn-primary' style={{ marginLeft: '1%' }} onClick={() => sendRequestToFriend(user.userId)}>Отправить заявку</button>
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

export default SearchFriend;