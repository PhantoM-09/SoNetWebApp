import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { Context } from '..';
import { authRoutes, publicRoutes } from '../routes';
import { LOGIN_ROUTE } from '../utils/consts';
import axios from 'axios'

const AppRouter = observer(() => {
    const { user } = useContext(Context);

    useEffect(() => {
        axios.get('https://localhost:7132/api/user/get-user/', { withCredentials: true })
            .then(response => {
                user.setAuth(true);
                user.setStart(true);
                console.log(user.isStart);
            })
            .catch(error => {
                user.setStart(true);
                console.log(user.isStart);
            })
    }, [])

    return (
        <div>
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


    );
});

export default AppRouter;