import React, { useState } from "react";

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

function LoginForm(){
  const[login, setLogin] = useState("");
  const[password, setPassword] = useState("");


  function handleChangeLogin(e)
  {
    setLogin(e.target.value)
  }

  function handleChangePassword(e)
  {
    setPassword(e.target.value)
  }

  return(
    <div className="row" style={{marginTop: 20}}>
        <div className="col-md-4 offset-md-4" style={{border: '1px black solid', borderRadius: 8}}>
          <div className="row-md">
            <div className="col-md">
              <img className="col-md-8 offset-md-2" src="logo-symbol.png" style={{marginTop: 30}} />
            </div>
          </div>
          <div className="row-md" style={{marginTop: 30}}>
            <div className="col-md-10 offset-md-1">
              <div className="input-group">
              <input type="text" className="form-control" placeholder="E-mail" aria-label="E-mail" aria-describedby="basic-addon1" value={login} onChange={handleChangeLogin}/>
              </div>
            </div>
          </div>
          <div className="row-md" style={{marginTop: 10}}>
            <div className="col-md-10 offset-md-1">
              <div className="input-group">
                <input  type="text" className="form-control" placeholder="Пароль" aria-label="Password" aria-describedby="basic-addon1" value={password} onChange={handleChangePassword}/>
              </div>
            </div>
          </div>
          <div className="row-md" style={{marginTop: 30}}>
            <div className="col-md">
              <button type="button" className="btn btn-primary col-md-10 offset-md-1">Вход</button>
            </div>
          </div>
          <div className="row-md" style={{marginTop: 10, marginBottom: 30}}>
            <div className="col-md">
              <button type="button" className="btn btn-primary col-md-10 offset-md-1">Регистрация</button>
            </div>
          </div>
        </div>
      </div>
  )
}




class RegistrationForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentStep: 1,
            lastName: "",
            name: "",
            email: "",
            password: "",
            birthDay: "",
            birthMonth: "",
            birthYear: "",
            sex: "",
            image: "",
        }
      }
    handleChange = event => {
        const{name, value} = event.target
        console.log(name + value)
        this.setState({
            [name]: value
        })
    }

    _next = () => {
        let currentStep = this.state.currentStep;
        currentStep = currentStep >= 2 ? 3 : currentStep + 1
        this.setState({
            currentStep: currentStep
        })
    }

    _prev = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 1 ? 1 : currentStep - 1
        this.setState({
            currentStep: currentStep
        })
    }

    previousButton() {
        let currentStep = this.state.currentStep;
        if(currentStep === 3){
          return (
              <div className="row-md" style={{marginTop: 30}}>
                  <div className="col-md"  >
                      <button type="button" className="btn btn-primary col-md-10 offset-md-1" onClick={this._prev}>Назад</button>
                  </div>
              </div>
          )
      }
        if(currentStep !== 1){
            return (
                <div className="row-md" style={{marginTop: 10}}>
                    <div className="col-md"  >
                        <button type="button" className="btn btn-primary col-md-10 offset-md-1" onClick={this._prev}>Назад</button>
                    </div>
                </div>
            )
        }
        return null;
    }

    nextButton(){
        let currentStep = this.state.currentStep;
        if(currentStep < 3){
            return (
                <div className="row-md" style={{marginTop: 30}}>
                    <div className="col-md"  >
                        <button type="button" className="btn btn-primary col-md-10 offset-md-1" onClick={this._next}>Далее</button>
                    </div>
                </div>
            )
        }
        return null;
    }

    sendButton =() => {
        let currentStep = this.state.currentStep;
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

    render()
    {
      return (
        <div className="row" style={{marginTop: 20}}>
        <div className="col-md-4 offset-md-4" style={{border: '1px black solid', borderRadius: 8}}>
          <div className="row-md">
            <div className="col-md">
              <img className="col-md-8 offset-md-2" src="logo-symbol.png" style={{marginTop: 30}} />
            </div>
          </div>
          <FirstStep
            currentStep = {this.state.currentStep}
            handleChange={this.handleChange}
            lastName = {this.state.lastName}
            name = {this.state.name}
            email = {this.state.email}
            password = {this.state.password}
            />
          <SecondStep
            currentStep = {this.state.currentStep}
            handleChange={this.handleChange}
            birthDay = {this.state.birthDay}
            birthMonth = {this.state.birthMonth}
            birthYear = {this.state.birthYear}
            />
          <ThirdStep
            currentStep = {this.state.currentStep}
            handleChange={this.handleChange}
            image = {this.state.image}
            />
          {this.nextButton()}
          {this.previousButton()}
          {this.sendButton()}
          <div className="row-md" style={{marginTop: 10, marginBottom: 30}}>
            <div className="col-md">
              <button type="button" className="btn btn-primary col-md-10 offset-md-1">Вход</button>
            </div>
          </div>
        </div>
      </div>
      );
     
    }
}

class FirstStep extends React.Component{
    render() {
        if(this.props.currentStep !== 1){
            return null;
        }
        return (
            <div>
                <div className="row-md" style={{marginTop: 30}}>
                <div className="col-md-10 offset-md-1">
                  <div className="input-group">
                  <input name="lastName" type="text" className="form-control" placeholder="Фамилия" aria-label="LastName" aria-describedby="basic-addon1" value={this.props.lastName} onChange={this.props.handleChange}/>
                  </div>
                </div>
              </div>
              <div className="row-md" style={{marginTop: 10}}>
                <div className="col-md-10 offset-md-1">
                  <div className="input-group">
                    <input name="name" type="text" className="form-control" placeholder="Имя" aria-label="Name" aria-describedby="basic-addon1" value={this.props.name} onChange={this.props.handleChange}/>
                  </div>
                </div>
              </div>
              <div className="row-md" style={{marginTop: 10}}>
                <div className="col-md-10 offset-md-1">
                  <div className="input-group">
                    <input name="email" type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" value={this.props.email} onChange={this.props.handleChange}/>
                  </div>
                </div>
              </div>
              <div className="row-md" style={{marginTop: 10}}>
                <div className="col-md-10 offset-md-1">
                  <div className="input-group">
                    <input name="password" type="text" className="form-control" placeholder="Пароль" aria-label="Password" aria-describedby="basic-addon1" value={this.props.password} onChange={this.props.handleChange}/>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

class SecondStep extends React.Component{
  render() {
      if(this.props.currentStep !== 2){
          return null;
      }
      return (
          <div>
              <div className="row-md" style={{marginTop: 30}}>
                <div className="col-md-4 offset-md-1">
                  Дата рождения:
                </div>
                <div className="col-md offset-md-1" style={{display:'inline-block'}}>
                  <div className="input-group">
                    <select name="birthDay" className="form-select" aria-label="Default select example" value={this.props.birthDay} onChange={this.props.handleChange}>
                      <option value="1" selected>1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </div>
                <div className="col-md"  style={{display:'inline-block'}}>
                  <div className="input-group">
                    <select name="birthMonth" className="form-select" aria-label="Default select example" value={this.props.birthMonth} onChange={this.props.handleChange}>
                      <option value="сентябрь"selected>сентябрь</option>
                      <option value="октябрь">октябрь</option>
                      <option value="ноябрь">ноябрь</option>
                      <option value="декабрь">декабрь</option>
                    </select>
                  </div>
                </div>
                <div className="col-md" style={{display:'inline-block'}}>
                  <div className="input-group">
                    <select name="birthYear" className="form-select" aria-label="Default select example" value={this.props.birthYear} onChange={this.props.handleChange}>
                      <option value="2001" selected>2001</option>
                      <option value="2002">2002</option>
                      <option value="2003">2003</option>
                      <option value="2004">2004</option>
                    </select>
                  </div>
                </div>
            </div>
            <div className="row-md" style={{marginTop: 10}}>
              <div className="col-md offset-md-1" style={{display:'inline-block'}}>
                    <div className="input-group">
                      <select name="sex" className="form-select" aria-label="Default select example" value={this.props.sex} onChange={this.props.handleChange}>
                        <option value="male" selected>Мужской</option>
                        <option value="female">Женский</option>
                      </select>
                    </div>
                  </div>
              </div>
          </div>
      );
  }
}

class ThirdStep extends React.Component{


  constructor(props)
  {
    super(props)
    this.state = {
      image: "",
    }
  }

  handleChangeFile = event => {
    this.sendPicture(event.target.files[0]);
  }

  handleChangeImage = event => {
    this.setState({image: event.target.src})
  }

  sendPicture(file){
    let formData = new FormData();

    formData.append("image", file); 
    fetch('https://localhost:7132/api/Values', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(imageFromServer => {
        this.setState({image: imageFromServer});
        console.log('отправлено')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
      if(this.props.currentStep !== 3){
          return null;
      }
      return (
          <div>
            <div className="row-md" style={{marginTop: 30}}>
              <div className="col-md-10 offset-md-1">
                <img name="image" src={this.state.image} className="col-md-8 offset-md-2" onChange={this.handleChangeImage}/>
              </div>
            </div>
            <div className="row-md" style={{marginTop: 30}}>
                <div className="col-md-10 offset-md-1">
                  <div className="input-group">
                  <input type="file" aria-describedby="basic-addon1" id="fi" onChange={this.handleChangeFile}/>
                  </div>
                </div>
              </div>

          </div>
      );
  }
}