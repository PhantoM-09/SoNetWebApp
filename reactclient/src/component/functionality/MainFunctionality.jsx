import React from 'react';
import { useContext } from 'react';
import { Context } from '../..';
import MenuAdmin from './admin/MenuAdmin';
import MenuUser from './MenuUser'
import Profile from './Profile';

const MainFunctionality = () => {
    const {user} = useContext(Context);

    return (
        <div className="container">
            <div className="row" style={{ marginTop: 20 }}>
                {user.isAdmin ?
                    (<MenuAdmin/>)
                    :
                    (<MenuUser/>)
                }
                <Profile/>
            </div>
        </div>
    )
}

export default MainFunctionality;