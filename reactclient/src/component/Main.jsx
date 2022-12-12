import axios from "axios";
import { observer } from "mobx-react-lite";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { LOGIN_ROUTE } from "../utils/consts";


const Main = observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [exitDisable, setExitDisable] = useState(true);

  useEffect(() =>{
    if(user.isAuth)
    {
      setExitDisable(false);
    }
    else
    {
      setExitDisable(true);
    }
  }, [user.isAuth]);

  const logout = () => {
    axios.get('https://localhost:7132/api/auth/logout', { withCredentials: true })
      .then(response => {
        user.setAuth(false);
        user.setAdmin(false);
        navigate(LOGIN_ROUTE);
      })
  }

  return (
    <div>
      <div className="container-md-12" style={{ background: '#6FBCF8', position: 'fixed', width: '100%', top:0, zIndex: 600 }}>
        <div className="container">
          <div className="row" style={{ height: 53 }}>
            <div className="col-md">
              <img src="logo2.png" style={{ width: 116, height: 43, marginTop: 5 }} alt="" />
              <button className="btn btn-primary" style={{ marginLeft: "85.4%", marginTop: '0.3%' }} onClick={logout} hidden={exitDisable}>Выход</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Main;