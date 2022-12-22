import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../utils/consts";
import axios from 'axios';

const RegistrationForm = (props) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationUser, setRegistrationUser] = useState({ lastName: '', name: '', email: '', password: '', birthDate: new Date(), sex: 'Мужской', image: {} });

  const [registrationUserDirty, setRegistrationUserDirty] = useState({ lastNameDirty: false, nameDirty: false, emailDirty: false, passwordDirty: false });
  const [registrationUserError, setRegistrationUserError] = useState({ lastNameError: 'Фамилия не может быть пустой', nameError: 'Имя не может быть пустым', emailError: 'Email не может быть пустым', passwordError: 'Пароль не может быть пустым' });

  const [stepValid, setStepValid] = useState(false);

  const GoLogin = () => {
    navigate(LOGIN_ROUTE);
  }

  const Registration = (e) => {
    e.preventDefault();

    var modifiedLastName = registrationUser.lastName.trim().replace(/ +/g, ' ');
    var modifiedName = registrationUser.name.trim().replace(/ +/g, ' ');
    var user = {
      UserId: 0,
      UserEmail: registrationUser.email,
      UserPassword: registrationUser.password,
      UserLastName: modifiedLastName,
      UserName: modifiedName,
      UserSex: registrationUser.sex,
      UserBirthDay: registrationUser.birthDate,
    };
    axios.post('http://localhost:5000/api/auth/register', user, {withCredentials: true})
      .then(userResponse => {
        var userFile = new FormData();
        userFile.append("image", registrationUser.image);
        userFile.append("email", registrationUser.email);

        axios.post('http://localhost:5000/api/file/add-profile-image', userFile, {withCredentials: true})
          .then(imageResponse => {
            toast.success(imageResponse.data, {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 2000,
              pauseOnFocusLoss: false
            });
            navigate(LOGIN_ROUTE);
          })
          .catch(imageError => {
            if (imageError.response) {
              toast.error(imageError.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
                pauseOnFocusLoss: false
              });
            }
          })
      })
      .catch(userError => {
        if (userError.response) {
          toast.error(userError.response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
            pauseOnFocusLoss: false
          });
        }
      });
  }

  useEffect(() => {
    if (registrationUserError.lastNameError || registrationUserError.nameError || registrationUserError.emailError || registrationUserError.passwordError) {
      setStepValid(false);
    }
    else {
      setStepValid(true);
    }
  }, [registrationUserError.lastNameError, registrationUserError.nameError, registrationUserError.emailError, registrationUserError.passwordError])

  const blurHandle = (e) => {
    switch (e.target.name) {
      case 'lastName':
        setRegistrationUserDirty({ ...registrationUserDirty, lastNameDirty: true });
        break;
      case 'name':
        setRegistrationUserDirty({ ...registrationUserDirty, nameDirty: true });
        break;
      case 'email':
        setRegistrationUserDirty({ ...registrationUserDirty, emailDirty: true });
        break;
      case 'password':
        setRegistrationUserDirty({ ...registrationUserDirty, passwordDirty: true });
        break;
    }
  }

  const lastNameChangeHandle = (event) => {
    var lastName = event.target.value;
    setRegistrationUser({ ...registrationUser, lastName: event.target.value });

    if (!lastName) {
      setRegistrationUserError({ ...registrationUserError, lastNameError: 'Фамилия не может быть пустой' });
    }
    else {
      setRegistrationUserError({ ...registrationUserError, lastNameError: '' });
    }
  }

  const nameChangeHandle = (event) => {
    var name = event.target.value;
    setRegistrationUser({ ...registrationUser, name: event.target.value });

    if (!name) {
      setRegistrationUserError({ ...registrationUserError, nameError: 'Имя не может быть пустым' });
    }
    else {
      setRegistrationUserError({ ...registrationUserError, nameError: '' });
    }
  }

  const emailChangeHandle = (event) => {
    var email = event.target.value;
    setRegistrationUser({ ...registrationUser, email: event.target.value });

    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(email).toLowerCase())) {
      setRegistrationUserError({ ...registrationUserError, emailError: 'Некорректный email' });
    }
    else {
      setRegistrationUserError({ ...registrationUserError, emailError: '' });
    }
  }

  const passwordChangeHandle = (event) => {
    var password = event.target.value;
    setRegistrationUser({ ...registrationUser, password: event.target.value });

    if (password.length < 3) {
      setRegistrationUserError({ ...registrationUserError, passwordError: 'Пароль должен быть больше 3-х символов' });
      if (!password) {
        setRegistrationUserError({ ...registrationUserError, passwordError: 'Пароль не может быть пустым' });
      }
    }
    else {
      setRegistrationUserError({ ...registrationUserError, passwordError: '' });
    }
  }

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
    if (currentStep !== 1) {
      return (
        <div className="row-md" style={{ marginTop: 10 }}>
          <div className="col-md"  >
            <button type="button" className="btn btn-primary col-md-10 offset-md-1" onClick={_prev}>Назад</button>
          </div>
        </div>
      )
    }

    return null;
  }

  const nextButton = () => {
    if (currentStep < 3) {
      return (
        <div className="row-md" style={{ marginTop: 30 }}>
          <div className="col-md"  >
            <button disabled={!stepValid} type="button" className="btn btn-primary col-md-10 offset-md-1" onClick={_next}>Далее</button>
          </div>
        </div>
      )
    }
    return null;
  }

  const sendButton = () => {
    if (currentStep === 3) {
      return (
        <div className="row-md" style={{ marginTop: 30 }}>
          <div className="col-md"  >
            <button type="submit" className="btn btn-primary col-md-10 offset-md-1">Регистрация</button>
          </div>
        </div>
      )
    }
    return null;
  }

  return (
    <form onSubmit={Registration}>
      <FirstStep
        currentStep={currentStep}
        setRegistrationUser={setRegistrationUser}
        registrationUser={registrationUser}
        lastName={registrationUser.lastName}
        name={registrationUser.name}
        email={registrationUser.email}
        password={registrationUser.password}
        blurHandle={blurHandle}
        registrationUserDirty={registrationUserDirty}
        registrationUserError={registrationUserError}
        lastNameChangeHandle={lastNameChangeHandle}
        nameChangeHandle={nameChangeHandle}
        emailChangeHandle={emailChangeHandle}
        passwordChangeHandle={passwordChangeHandle}
      />
      <SecondStep
        currentStep={currentStep}
        setRegistrationUser={setRegistrationUser}
        registrationUser={registrationUser}
        birthDate={registrationUser.birthDate}
        sex={registrationUser.sex}
      />
      <ThirdStep
        currentStep={currentStep}
        setRegistrationUser={setRegistrationUser}
        registrationUser={registrationUser}
        image={registrationUser.image}
      />
      {nextButton()}
      {sendButton()}
      {previousButton()}
      <div className="row-md" style={{ marginTop: 10, marginBottom: 30 }}>
        <div className="col-md">
          <button type="button" className="btn btn-primary col-md-10 offset-md-1" onClick={GoLogin}>Вход</button>
        </div>
      </div>
    </form>
  );
}

export default RegistrationForm;

const FirstStep = (props) => {
  if (props.currentStep !== 1) {
    return null;
  }

  return (
    <div>
      <div className="row-md" style={{ marginTop: 30 }}>
        <div className="col-md-10 offset-md-1">
          {(props.registrationUserDirty.lastNameDirty && props.registrationUserError.lastNameError) && <div style={{ color: 'red' }}>{props.registrationUserError.lastNameError}</div>}
        </div>
      </div>
      <div className="row-md" style={{ marginTop: 0 }}>
        <div className="col-md-10 offset-md-1">
          <div className="input-group">
            <input onBlur={props.blurHandle} name="lastName" type="text" className="form-control" placeholder="Фамилия" aria-label="LastName" aria-describedby="basic-addon1" value={props.lastName} onChange={props.lastNameChangeHandle} />
          </div>
        </div>
      </div>
      <div className="row-md" style={{ marginTop: 10 }}>
        <div className="col-md-10 offset-md-1">
          {(props.registrationUserDirty.nameDirty && props.registrationUserError.nameError) && <div style={{ color: 'red' }}>{props.registrationUserError.nameError}</div>}
        </div>
      </div>
      <div className="row-md" style={{ marginTop: 0 }}>
        <div className="col-md-10 offset-md-1">
          <div className="input-group">
            <input onBlur={props.blurHandle} name="name" type="text" className="form-control" placeholder="Имя" aria-label="Name" aria-describedby="basic-addon1" value={props.name} onChange={props.nameChangeHandle} />
          </div>
        </div>
      </div>
      <div className="row-md" style={{ marginTop: 10 }}>
        <div className="col-md-10 offset-md-1">
          {(props.registrationUserDirty.emailDirty && props.registrationUserError.emailError) && <div style={{ color: 'red' }}>{props.registrationUserError.emailError}</div>}
        </div>
      </div>
      <div className="row-md" style={{ marginTop: 0 }}>
        <div className="col-md-10 offset-md-1">
          <div className="input-group">
            <input onBlur={props.blurHandle} name="email" type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" value={props.email} onChange={props.emailChangeHandle} />
          </div>
        </div>
      </div>
      <div className="row-md" style={{ marginTop: 10 }}>
        <div className="col-md-10 offset-md-1">
          {(props.registrationUserDirty.passwordDirty && props.registrationUserError.passwordError) && <div style={{ color: 'red' }}>{props.registrationUserError.passwordError}</div>}
        </div>
      </div>
      <div className="row-md" style={{ marginTop: 0 }}>
        <div className="col-md-10 offset-md-1">
          <div className="input-group">
            <input onBlur={props.blurHandle} name="password" type="text" className="form-control" placeholder="Пароль" aria-label="Password" aria-describedby="basic-addon1" value={props.password} onChange={props.passwordChangeHandle} />
          </div>
        </div>
      </div>
    </div>
  );
}

const SecondStep = (props) => {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <div>
      <div className="row-md" style={{ marginTop: 30 }}>
        <div className="col-md-4 offset-md-1">
          Дата рождения:
        </div>
        <div className="col-md-10 offset-md-1">
          <div className="input-group">
            <DatePicker className="col-md-12 form-control" selected={props.birthDate} value={props.birthDate} onChange={(date: Date) => props.setRegistrationUser({ ...props.registrationUser, birthDate: date })} />
          </div>
        </div>

      </div>
      <div className="row-md" style={{ marginTop: 10 }}>
        <div className="col-md-10 offset-md-1">
          <div className="input-group">
            <select name="sex" className="form-select" selected={props.sex} onChange={e => props.setRegistrationUser({ ...props.registrationUser, sex: e.target.selected })}>
              <option value="Мужской">Мужской</option>
              <option value="Женский">Женский</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

const ThirdStep = (props) => {
  const [image, setImage] = useState("http://localhost:5000/standard_files/standard_profile_image.png");

  const handleChangeFile = (event) => {
    var file = event.target.files[0];

    props.setRegistrationUser({ ...props.registrationUser, image: file });
    convertFileToImage(file);
  }

  const convertFileToImage = (file) => {
    var reader = new FileReader();

    reader.onload = function (event) {
      setImage(event.target.result);
    }

    reader.readAsDataURL(file);
  }

  if (props.currentStep !== 3) {
    return null;
  }

  return (
    <div>
      <div className="row-md" style={{ marginTop: 30 }}>
        <div className="col-md-10 offset-md-1">
          <img name="image" src={image} className="col-md-8 offset-md-2" style={{ height: 290, objectFit: 'cover' }} />
        </div>
      </div>
      <div className="row-md" style={{ marginTop: 10 }}>
        <div className="col-md-10 offset-md-1">
          <div className="input-group">
            <input type="file" className="form-control" aria-describedby="basic-addon1" onChange={handleChangeFile} />
          </div>
        </div>
      </div>
    </div>
  );
}