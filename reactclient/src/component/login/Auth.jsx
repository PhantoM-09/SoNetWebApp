import React from "react";
import {useLocation} from "react-router-dom";
import { LOGIN_ROUTE } from "../../utils/consts";
import LoginForm from "./Login";
import RegistrationForm from "./Registration";
import { ToastContainer } from 'react-toastify';


const AuthForm = () => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;

    return (
        <div className="container">
            <div className="row" style={{marginTop: 20}}>
            <div className="col-md-4 offset-md-4" style={{border: '1px black solid', borderRadius: 8}}>
                <div className="row-md">
                <div className="col-md">
                    <img className="col-md-8 offset-md-2" src="logo-symbol.png" style={{marginTop: 30}} />
                </div>
                </div>
                {isLogin ?
                (<LoginForm/>)
                :
                (<RegistrationForm/>)
                }
                <ToastContainer/>
            </div>
            </div>
        </div>
    )
}

export default AuthForm;