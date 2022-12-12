import React from 'react';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../..';
import MenuAdmin from './admin/MenuAdmin';
import Friend from './friend/Friend';
import MenuUser from './MenuUser'
import Profile from './profile/Profile';

const MainFunctionality = () => {
    const { user } = useContext(Context);
    const location = useLocation();
    return (
        <div className="container">
            <div className="row" style={{ marginTop: 20 }}>
                {user.isAdmin ?
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
                {location.pathname === "/friends"
                    ?
                    (<Friend />)
                    :
                    (null)
                }
            </div>
        </div>
    )
}

export default MainFunctionality;