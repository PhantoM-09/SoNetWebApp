import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { PROFILE_ROUTE } from '../../../../utils/consts';

const EditInformation = () => {

    const [user, setUser] = useState({ lastName: '', name: '', birthDate: '', sex: '', })
    const [choseCountry, setChoseCountry] = useState('');
    const [choseCity, setChoseCity] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [cities, setCities] = useState([]);
    const [citiesHide, setCitiesHide] = useState(true);
    const navigate = useNavigate();

    const func = (country) => {
        changeCountry(country);
    }

    const editProfile = (e) => {
        e.preventDefault();
        var formData = new FormData();

        formData.append("lastName", user.lastName.trim().replace(/ +/g, ' '));
        formData.append("name", user.name.trim().replace(/ +/g, ' '));
        formData.append("birthDate", user.birthDate === '' ? '' : user.birthDate.toLocaleDateString());
        formData.append("sex", user.sex);
        formData.append("country", choseCountry === '' ? '' : choseCountry);
        formData.append("city", choseCity);

        axios.put('https://localhost:7132/api/user/edit-user/', formData, { withCredentials: true })
            .then(() => {
                navigate(PROFILE_ROUTE);
            })
    }

    const changeCountry = (country) => {
        if (country !== '') {
            var i = 0;
            var address;
            for (i = 0; i < addresses.length; i++) {
                if (addresses[i].addressCountry === country) {
                    address = addresses[i];
                    break;
                }
            }

            axios.get('https://localhost:7132/api/user/get-cities/' + address.addressId, { withCredentials: true })
                .then(response => {
                    setCities(response.data);
                    setChoseCity(response.data[0]);
                })

            setCitiesHide(false);
        }
        else {
            setChoseCountry('')
            setChoseCity('');
            setCitiesHide(true);
        }
    }

    useEffect(() => {

        axios.get('https://localhost:7132/api/user/get-countries/', { withCredentials: true })
            .then(responseCountry => {
                setAddresses(responseCountry.data);
            })
    }, [])

    return (

        <div className='col-md' style={{ border: '1px solid black', borderRadius: 8 }}>
            <div>
                <div className='row'>
                    <div className='col-md-4' style={{ marginLeft: '1.5%', marginTop: '1%' }}>
                        <input name="lastName" type="text" className="form-control" placeholder="Фамилия" value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4' style={{ marginLeft: '1.5%', marginTop: '1%' }}>
                        <input name="name" type="text" className="form-control" placeholder="Имя" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4' style={{ marginLeft: '1.5%', marginTop: '1%' }}>
                        <div className='col-md-12'>Дата рождения:</div>
                        <div className="input-group" >
                            <ReactDatePicker className="col-md-4 form-control" selected={user.birthDate} value={user.birthDate} onChange={(date: Date) => setUser({ ...user, birthDate: date })} />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4' style={{ marginLeft: '1.5%', marginTop: '1%' }}>
                        <div className='col-md-12'>Пол:</div>
                        <div className="input-group" >
                            <select name="sex" className="form-select" selected={user.sex} onChange={e => setUser({ ...user, sex: e.target.value })}>
                                <option value="">Выбрать пол</option>
                                <option value="Мужской">Мужской</option>
                                <option value="Женский">Женский</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4' style={{ marginLeft: '1.5%', marginTop: '1%' }}>
                        <div className='col-md-12'>Страна:</div>
                        <div className="input-group" >
                            <select name="choseCountry" className="form-select" selected={choseCountry} onChange={e => { setChoseCountry(e.target.value); func(e.target.value) }}>
                                <option value="">Выбрать страну</option>
                                {addresses.map((address) => (
                                    <option key={address.addressId} value={address.addressCountry}>{address.addressCountry}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {!citiesHide && <div className='row'>
                    <div className='col-md-4' style={{ marginLeft: '1.5%', marginTop: '1%' }}>
                        <div className='col-md-12'>Город:</div>
                        <div className="input-group" >
                            <select name="choseCity" className="form-select" selected={choseCity} onChange={e => { setChoseCity(e.target.value) }}>
                                {cities.map((city, index) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                }
                <div className='row' style={{ marginTop: '5%', marginBottom: '1%' }}>
                    <div className='col-md-4' style={{ marginLeft: '1.5%', marginTop: '1%' }}>
                        <form onSubmit={editProfile}>
                            <button className='btn btn-primary' type="submit">Редактировать</button>
                            <button className='btn btn-secondary' type="button" style={{ marginLeft: '5%' }} onClick={e=>navigate(PROFILE_ROUTE)}>Отмена</button>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    );

}

export default EditInformation;