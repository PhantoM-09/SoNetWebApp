import React, { useState } from "react";
import RegistrationForm from "./component/login/Registration"

export default function App() {
  const divContainer={
    background: 'lightblue',
  };
  const divRow={
    height: 53,
  };
  const img={
    width:116,
    height:43,
    marginTop:5
  };
  return (
    <div>
      <div className="container-md-12" style={divContainer}>
        <div className="container">
          <div className="row" style={divRow}>
            <div className="col-md">
              <img src="logo2.png" style={img} alt=""/>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <RegistrationForm/>
      </div>
    </div>
   
  );
}





