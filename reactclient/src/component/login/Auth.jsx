import React, { useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, PROFILE_ROUTE } from "../../utils/consts";
import LoginForm from "./Login";
import RegistrationForm from "./Registration";
import { ToastContainer } from 'react-toastify';
import { useContext } from "react";
import { Context } from "../..";


const AuthForm = () => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        if(user.isAuth)
        {
            navigate(PROFILE_ROUTE);
        }
        else
        {
            setAuth(true);
        }
    })
    return (
        <div className="container">
            <div className="row" style={{ marginTop: 20 }}>
                <div className="col-md-4 offset-md-4" style={{ border: '1px black solid', borderRadius: 8 }}>
                    <div className="row-md">
                        <div className="col-md">
                            <img className="col-md-8 offset-md-2" src="logo-symbol.png" style={{ marginTop: 30 }} />
                        </div>
                    </div>
                    <ToastContainer />
                    {
                        auth ?
                            (<div>
                                {isLogin ?
                                    (<LoginForm />)
                                    :
                                    (<RegistrationForm />)
                                }
                            </div>)
                            :
                            (null)
                    }
                </div>
            </div>
        </div>
    )
};

export default AuthForm;