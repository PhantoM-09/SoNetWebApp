import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";
import { PROFILE_ROUTE, REGISTRATION_ROUTE } from "../../utils/consts";
import { toast } from 'react-toastify';
import { observer } from "mobx-react-lite";

const LoginForm = observer(() => {
    const navigate = useNavigate();
    const {user} = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('E-mail не может быть пустым');
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false);
        }
        else {
            setFormValid(true);
        }
    }, [emailError, passwordError])
    const emailChangeHandle = (event) => {
        var email = event.target.value;
        setEmail(email);

        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(email).toLowerCase())) {
            setEmailError('Некорректный email');
        }
        else {
            setEmailError('');
        }
    }

    const passwordChangeHandle = (event) => {
        var password = event.target.value;
        setPassword(password);

        if (password.length < 3) {
            setPasswordError('Пароль должен быть больше 3-х символов');
            if (!password) {
                setPasswordError('Пароль не может быть пустым')
            }
        }
        else {
            setPasswordError('');
        }
    }

    const blurHandle = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
        }
    }

    const goRegistration = () => {
        navigate(REGISTRATION_ROUTE);
    }

    const Login = (e) => {
        e.preventDefault();

        const userData = new FormData();
        userData.append("email", email);
        userData.append("password", password);

        axios.post('https://localhost:7132/api/auth/login', userData, {withCredentials: true})
            .then(response => {
                user.setAuth(true);
                if (response.data === "Admin") {
                    user.setAdmin(true);
                }
                navigate(PROFILE_ROUTE);
            })
            .catch(error => {
                if (error.response) {
                    toast.error(error.response.data.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 2000,
                        pauseOnFocusLoss: false
                    });
                }
            })
    }

    return (
        <form onSubmit={Login}>
            <div className="row-md" style={{ marginTop: 30 }}>
                <div className="col-md-10 offset-md-1">
                    {(emailDirty && emailError) && <div style={{ color: 'red' }}>{emailError}</div>}
                </div>
            </div>
            <div className="row-md" style={{ marginTop: 0 }}>
                <div className="col-md-10 offset-md-1">
                    <div className="input-group">
                        <input name="email" onBlur={blurHandle} type="text" className="form-control" placeholder="E-mail" aria-label="E-mail" aria-describedby="basic-addon1" value={email} onChange={emailChangeHandle} />
                    </div>
                </div>
            </div>
            <div className="row-md" style={{ marginTop: 10 }}>
                <div className="col-md-10 offset-md-1">
                    {(passwordDirty && passwordError) && <div style={{ color: 'red' }}>{passwordError}</div>}
                </div>
            </div>
            <div className="row-md" style={{ marginTop: 0 }}>
                <div className="col-md-10 offset-md-1">
                    <div className="input-group">
                        <input name="password" onBlur={blurHandle} type="password" className="form-control" placeholder="Пароль" aria-label="Password" aria-describedby="basic-addon1" value={password} onChange={passwordChangeHandle} />
                    </div>
                </div>
            </div>
            <div className="row-md" style={{ marginTop: 30 }}>
                <div className="col-md">
                    <button type="submit" className="btn btn-primary col-md-10 offset-md-1" disabled={!formValid}>Вход</button>
                </div>
            </div>
            <div className="row-md" style={{ marginTop: 10, marginBottom: 30 }}>
                <div className="col-md">
                    <button type="button" className="btn btn-primary col-md-10 offset-md-1" onClick={goRegistration}>Регистрация</button>
                </div>
            </div>
        </form>
    );
});

export default LoginForm;