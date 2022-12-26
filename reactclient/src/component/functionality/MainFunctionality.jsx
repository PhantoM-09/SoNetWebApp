import userEvent from '@testing-library/user-event';
import React from 'react';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../..';
import Control from './admin/Control';
import MenuAdmin from './admin/MenuAdmin';
import Friend from './friend/Friend';
import MenuUser from './MenuUser'
import Message from './message/Message';
import EditProfile from './profile/edit/EditProfile';
import Profile from './profile/Profile';
import StrangeProfile from './profile/strange/StrangeProfile';

const MainFunctionality = () => {
    const { user } = useContext(Context);
    const location = useLocation();
    return (
        <div className="container">
            <div className="row" style={{ marginTop: 20 }}>
                {user.userType === 'AccessAdmin' ||  user.userType === 'MainAdmin' ?
                    (<MenuAdmin />)
                    :
                    (<MenuUser />)
                }
                {location.pathname === "/profile"
                    ?
                    (<Profile />)
                    :
                    (null)
                }
                {location.pathname === "/edit-profile"
                    ?
                    (<EditProfile/>)
                    :
                    (null)
                }
                {location.pathname === "/friends"
                    ?
                    (<Friend />)
                    :
                    (null)
                }
                {location.pathname === "/message"
                    ?
                    (<Message/>)
                    :
                    (null)
                }
                {location.pathname === "/strange"
                    ?
                    (<StrangeProfile />)
                    :
                    (null)
                }
                {(user.userType === 'AccessAdmin' ||  user.userType === 'MainAdmin') && location.pathname === "/control"
                    ?
                    (<Control />)
                    :
                    (null)}
            </div>
        </div>
    )
}

export default MainFunctionality;