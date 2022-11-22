import React, { useState } from "react";

export default class RegistrationForm extends React.Component{
    constructor(props){
        super(props)
        this.useState = {
            currentStep: 1,
            lastName: "",
            name: "",
            email: "",
            password: "",
            birthDay: "",
            birthMonth: "",
            birthYear: "",
            country: "",
            city: "",
            image: "",
        }

        handleChange = event => {
            const{name, value} = event.target;
            this.setState({
                [name]: value
            })
        }

        _next = () => {
            let currentStep = this.state.currentStep;
            currentStep = currentStep >= 2 ? 3 : currentStep + 1;
            this.setState({
                currentStep: currentStep
            })
        }

        _prev = () => {
            let currentStep = this.state.currentStep;
            currentStep = currentStep <= 1 ? 1 : currentStep - 1;
            this.setState({
                currentStep: currentStep
            })
        }

        previousButton =() => {
            let currentStep = this.state.currentStep;
            if(currentStep !== 1){
                return (
                    <div className="row-md" style={{marginTop: 10}}>
                        <div className="col-md"  >
                            <button type="button" className="btn btn-primary col-md-10 offset-md-1">Назад</button>
                        </div>
                    </div>
                )
            }
            return null;
        }

        nextButton =() => {
            let currentStep = this.state.currentStep;
            if(currentStep < 3){
                return (
                    <div className="row-md" style={{marginTop: 30}}>
                        <div className="col-md"  >
                            <button type="button" className="btn btn-primary col-md-10 offset-md-1">Далее</button>
                        </div>
                    </div>
                )
            }
            return null
        }

        sendButton =() => {
            let currentStep = this.state.currentStep;
            if(currentStep === 3){
                return (
                    <div className="row-md" style={{marginTop: 30}}>
                        <div className="col-md"  >
                            <button type="button" className="btn btn-primary col-md-10 offset-md-1">Регистрация</button>
                        </div>
                    </div>
                )
            }
            return null
        }

        render(
            <div className="row" style={{marginTop: 20}}>
            <div className="col-md-4 offset-md-4" style={{border: '1px black solid', borderRadius: 8}}>
              <div className="row-md">
                <div className="col-md">
                  <img className="col-md-8 offset-md-2" src="logo-symbol.png" style={{marginTop: 30}} />
                </div>
              </div>
              <FirstStep
                currentStep = {this.state.currentStep}
                handleChange = {this.state.handleChange}
                lastName = {this.state.lastName}
                name = {this.state.name}
                email = {this.state.email}
                password = {this.state.password}
                />
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
        );
    }
}

class ThirdStep extends React.Component{
    render() {
        if(this.props.currentStep !== 3){
            return null;
        }
        return (
            <div>
                <div className="row-md" style={{marginTop: 30}}>
                <div className="col-md-10 offset-md-1">
                  <div className="input-group">
                  <input type="file" className="form-control" placeholder="Фамилия" aria-label="LastName" aria-describedby="basic-addon1" value={this.props.lastName} onChange={this.props.handleChange}/>
                  </div>
                </div>
              </div>
              <div className="row-md" style={{marginTop: 10}}>
                <div className="col-md-10 offset-md-1">
                  <div className="input-group">
                    <input  type="text" className="form-control" placeholder="Имя" aria-label="Name" aria-describedby="basic-addon1" value={this.props.name} onChange={this.props.handleChange}/>
                  </div>
                </div>
              </div>
              <div className="row-md" style={{marginTop: 10}}>
                <div className="col-md-10 offset-md-1">
                  <div className="input-group">
                    <input  type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" value={this.props.email} onChange={this.props.handleChange}/>
                  </div>
                </div>
              </div>
              <div className="row-md" style={{marginTop: 10}}>
                <div className="col-md-10 offset-md-1">
                  <div className="input-group">
                    <input  type="text" className="form-control" placeholder="Пароль" aria-label="Password" aria-describedby="basic-addon1" value={this.props.password} onChange={this.props.handleChange}/>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}