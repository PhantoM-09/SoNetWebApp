import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { Context } from '..';
import { authRoutes, publicRoutes } from '../routes';
import { LOGIN_ROUTE } from '../utils/consts';
import axios from 'axios'
import Main from './Main';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AppRouter = observer(() => {
    const { user } = useContext(Context);

    useEffect(() => {
        axios.get('http://localhost:5000/api/user/get-user/', { withCredentials: true })
            .then(response => {
                user.setUserId(response.data.id);
                user.setAuth(true);
                user.setUserType(response.data.type);
                user.setStart(true);
            })
            .catch(() => {
                user.setStart(true);
            })
    }, [])

    return (
        <div>
            <Main />
            <div style={{ marginTop: '3.2%' }}>
                {user.isStart ?
                    (<Routes>
                        {user.isAuth && authRoutes.map(({ path, Component }) =>
                            <Route key={path} path={path} element={Component} exact />
                        )}
                        {publicRoutes.map(({ path, Component }) =>
                            <Route key={path} path={path} element={Component} exact />
                        )}
                        <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />

                    </Routes>)
                    :
                    (null)
                }
            </div>
            <ToastContainer />

        </div>
    );
});

export default AppRouter;