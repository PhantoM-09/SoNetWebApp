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
  