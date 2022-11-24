import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationUser, setRegistrationUser] = useState({lastName: '', name: '', email: '', password: '', birthDate: '', sex: '', image: {}});

  const _next = () => {
      let curStep = currentStep;
      curStep = curStep >= 2 ? 3 : curStep + 1;
      setCurrentStep(curStep);
  }

  const _prev = () => {
      let curStep = currentStep;
      curStep = curStep <= 1 ? 1 : curStep - 1;
      setCurrentStep(curStep);
  }

  const previousButton = () => {
      if(currentStep === 3){
        return (
            <div className="row-md" style={{marginTop: 30}}>
                <div className="col-md"  >
                    <button type="button" className="btn btn-primary col-md-10 offset-md-1" onClick={_prev}>Назад</button>
                </div>
            </div>
        )
    }
      if(currentStep !== 1){
          return (
              <div className="row-md" style={{marginTop: 10}}>
                  <div className="col-md"  >
                      <button type="button" className="btn btn-primary col-md-10 offset-md-1" onClick={_prev}>Назад</button>
                  </div>
              </div>
          )
      }
      return null;
  }

  const nextButton = () => {
      if(currentStep < 3){
          return (
              <div className="row-md" style={{marginTop: 30}}>
                  <div className="col-md"  >
                      <button type="button" className="btn btn-primary col-md-10 offset-md-1" onClick={_next}>Далее</button>
                  </div>
              </div>
          )
      }
      return null;
  }

  const sendButton = () => {
      if(currentStep === 3){
          return (
              <div className="row-md" style={{marginTop: 10}}>
                  <div className="col-md"  >
                      <button type="button" className="btn btn-primary col-md-10 offset-md-1">Регистрация</button>
                  </div>
              </div>
          )
      }
      return null;
  }

  return (
    <div className="row" style={{marginTop: 20}}>
    <div className="col-md-4 offset-md-4" style={{border: '1px black solid', borderRadius: 8}}>
      <div className="row-md">
        <div className="col-md">
          <img className="col-md-8 offset-md-2" src="logo-symbol.png" style={{marginTop: 30}} />
        </div>
      </div>
      <FirstStep
        currentStep = {currentStep}
        setRegistrationUser = {setRegistrationUser}
        registrationUser = {registrationUser}
        lastName = {registrationUser.lastName}
        name = {registrationUser.name}
        email = {registrationUser.email}
        password = {registrationUser.password}
        />
      <SecondStep
        currentStep = {currentStep}
        setRegistrationUser = {setRegistrationUser}
        registrationUser = {registrationUser}
        birthDate = {registrationUser.birthDate}
        />
      <ThirdStep
        currentStep = {currentStep}
        setRegistrationUser = {setRegistrationUser}
        registrationUser = {registrationUser}
        file = {registrationUser.file}
        />
      {nextButton()}
      {previousButton()}
      {sendButton()}
      <div className="row-md" style={{marginTop: 10, marginBottom: 30}}>
        <div className="col-md">
          <button type="button" className="btn btn-primary col-md-10 offset-md-1">Вход</button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default RegistrationForm

const FirstStep = (props) => {
  if(props.currentStep !== 1){
    return null;
  }

  return (
    <div>
        <div className="row-md" style={{marginTop: 30}}>
        <div className="col-md-10 offset-md-1">
          <div className="input-group">
          <input name="lastName" type="text" className="form-control" placeholder="Фамилия" aria-label="LastName" aria-describedby="basic-addon1" value={props.lastName} onChange={e => props.setRegistrationUser({...props.registrationUser, lastName: e.target.value})}/>
          </div>
        </div>
      </div>
      <div className="row-md" style={{marginTop: 10}}>
        <div className="col-md-10 offset-md-1">
          <div className="input-group">
            <input name="name" type="text" className="form-control" placeholder="Имя" aria-label="Name" aria-describedby="basic-addon1" value={props.name} onChange={e => props.setRegistrationUser({...props.registrationUser, name: e.target.value})}/>
          </div>
        </div>
      </div>
      <div className="row-md" style={{marginTop: 10}}>
        <div className="col-md-10 offset-md-1">
          <div className="input-group">
            <input name="email" type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" value={props.email} onChange={e => props.setRegistrationUser({...props.registrationUser, email: e.target.value})}/>
          </div>
        </div>
      </div>
      <div className="row-md" style={{marginTop: 10}}>
        <div className="col-md-10 offset-md-1">
          <div className="input-group">
            <input name="password" type="text" className="form-control" placeholder="Пароль" aria-label="Password" aria-describedby="basic-addon1" value={props.password} onChange={e => props.setRegistrationUser({...props.registrationUser, password: e.target.value})}/>
          </div>
        </div>
      </div>
    </div>
  );
}

const SecondStep = (props) => {
  if(props.currentStep !== 2){
    return null;
  }
  return (
    <div>
        <div className="row-md" style={{marginTop: 30}}>
          <div className="col-md-4 offset-md-1">
            Дата рождения:
          </div>
          <div className="col-md offset-md-1"  style={{display: 'inline-block'}}>
            <div className="input-group">
              <DatePicker selected={props.birthDate} value={props.birthDate} onChange={(date:Date) => props.setRegistrationUser({...props.registrationUser, birthDate: date})}/>
            </div>
          </div>
          
      </div>
      <div className="row-md" style={{marginTop: 10}}>
        <div className="col-md offset-md-1" style={{display:'inline-block'}}>
              <div className="input-group">
                <select name="sex" className="form-select" aria-label="Default select example" value={props.sex} onChange={e => props.setRegistrationUser({...props.registrationUser, sex: e.target.value})}>
                  <option value="male" selected>Мужской</option>
                  <option value="female">Женский</option>
                </select>
              </div>
            </div>
        </div>
    </div>
  );
}

const ThirdStep = (props) => {
  const [image, setImage] = useState("");

  const handleChangeFile = (event) => {
    var file = event.target.files[0];

    props.setRegistrationUser({...props.registrationUser, file: file});
    convertFileToImage(file);
  }

  const convertFileToImage = (file) =>
  {
    var reader = new FileReader();

    reader.onload = function(event){
      setImage(event.target.result);
    }

    reader.readAsDataURL(file);   
  }

  if(props.currentStep !== 3){
    return null;
  }

  return (
    <div>
      <div className="row-md" style={{marginTop: 30}}>
        <div className="col-md-10 offset-md-1">
          <img name="image" src={image} className="col-md-8 offset-md-2"/>
        </div>
      </div>
      <div className="row-md" style={{marginTop: 30}}>
          <div className="col-md-10 offset-md-1">
            <div className="input-group">
            <input type="file" className="form-control" aria-describedby="basic-addon1" onChange={handleChangeFile}/>
            </div>
          </div>
        </div>
    </div>
  );
}