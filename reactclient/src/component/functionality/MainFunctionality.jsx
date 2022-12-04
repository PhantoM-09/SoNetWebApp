import React from 'react';
import Menu from './Menu'
import Profile from './Profile';

const MainFunctionality = () => {
    return (
        <div className="container">
            <div className="row" style={{marginTop: 20}}>
                <Menu/>
                <Profile/>
            </div>
        </div>
    )
}

export default MainFunctionality;