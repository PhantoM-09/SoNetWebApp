import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PROFILE_ROUTE, FRIEND_ROUTE, MESSAGE_ROUTE } from '../../utils/consts';


const MenuUser = () => {
    const profileButton = useRef(null);
    const friendButton = useRef(null);
    const messageButton = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/friends') {
            profileButton.current.classList.remove("active");
            friendButton.current.classList.add("active");
        }

        if (location.pathname === '/message') {
            profileButton.current.classList.remove("active");
            messageButton.current.classList.add("active");
        }
    }, [])

    return (
        <div className="col-md-2">
            <div className="row" style={{ position: 'fixed' }}>
                <div className="col-md-12">
                    <div className="d-flex align-items-left">
                        <div className="nav nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <button ref={profileButton} className="nav-link active col-md-12" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={() => navigate(PROFILE_ROUTE)}>
                                <div style={{ fontSize: '12pt', marginLeft: '-2em' }}>
                                    Мой профиль
                                </div>
                            </button>
                            <button ref={friendButton} className="nav-link col-md-12" id="v-pills-friends-tab" data-bs-toggle="pill" data-bs-target="#v-pills-friends" type="button" role="tab" aria-controls="v-pills-friends" aria-selected="false" onClick={() => navigate(FRIEND_ROUTE)}>
                                <div style={{ fontSize: '12pt', marginLeft: '-5em' }}>
                                    Друзья
                                </div>
                            </button>
                            <button ref={messageButton} className="nav-link col-md-12" id="v-pills-message-tab" data-bs-toggle="pill" data-bs-target="#v-pills-message" type="button" role="tab" aria-controls="v-pills-message" aria-selected="false" onClick={() => navigate(MESSAGE_ROUTE)}>
                                <div style={{ fontSize: '12pt', marginLeft: '-6.5em' }}>
                                    Чат
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuUser;