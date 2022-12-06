import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LOGIN_ROUTE } from '../../utils/consts';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ lastName: '', name: '', birthDate: null, sex: '', country: null, city: null, profileImage: '', profileBackground: '', friendCount: 0, subscriberCount: 0 })

  useEffect(() => {
    axios.get('https://localhost:7132/api/user/get-user/', { withCredentials: true })
      .then(response => {
        var userInfo = response.data;
        setUser({ ...user, lastName: userInfo.lastName, name: userInfo.name, sex: userInfo.sex, birthDate: userInfo.birthDate, friendsCount: userInfo.friendCount,  subscriberCount: userInfo.subscriberCount});
      
        axios.get('https://localhost:7132/api/file/get-profile-image/', { withCredentials: true })
        .then(imageResponse => {
          setUser({...user, profileImage: imageResponse.data.profileImage, profileBackground: imageResponse.data.profileBackground});
        })
      })
      .catch(error => {
        if (error.response) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            pauseOnFocusLoss: false
          });
          navigate(LOGIN_ROUTE);
        }
      })
  }, []);

  return (
    <div className="col-md-10">
      <div className="col-md-12" style={{ position: 'relative' }}>
        <div className="col-md-12" style={{ background: 'black', opacity: .4, width: '100%', height: 370, position: 'absolute', borderRadius: 8 }}></div>
        <img className="col-md-12" style={{ height: 370, objectFit: 'cover', borderRadius: 8, zIndex: -1000, position: 'absolute' }} src="25458.jpg" />
        <div className="col-md-12">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-5" style={{ position: 'relative', top: 25 }}>
                <div className="col-md-12">
                  <div className="container-md-12" style={{ border: '1px black solid', borderRadius: 8, background: 'white' }}>
                    <div className="row-md">
                      <div className="col-md">
                        <div style={{ padding: '5%' }}>
                          <img className="col-md-12" src={user.profileImage} style={{ border: '1px black solid', borderRadius: 8, height: 290, objectFit: 'cover' }} />
                        </div>
                      </div>
                    </div>
                    <div className="row-md">
                      <div className="col-md-8 offset-md-2">
                        <div className="text-center" style={{ fontWeight: 'bold', fontSize: '14pt', marginBottom: -10 }}>
                          {user.friendCount}
                        </div>
                        <div className="text-center" style={{ fontSize: '14pt' }}>Друзья</div>
                      </div>
                    </div>
                    <div className="row-md">
                      <div className="col-md-8 offset-md-2">
                        <div className="text-center" style={{ fontWeight: 'bold', fontSize: '14pt', marginBottom: -10 }}>
                          {user.subscriberCount}
                        </div>
                        <div className="text-center" style={{ fontSize: '14pt' }}>Подписчики</div>
                      </div>
                    </div>
                    <div className="row-md">
                      <div className="col-md">
                        <div style={{ padding: '5%' }}>
                          <button type="button" className="btn btn-primary col-md-12" style={{ fontSize: '12pt' }}>Редактировать</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="row-md">
                    <div className="col-md">
                      <div style={{ paddingTop: '4%', zIndex: 8000, position: 'relative' }}>
                        <div className="btn col-md-12" style={{ fontSize: '12pt', border: '1px black solid', borderRadius: 8 }}>Друзья</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6" style={{ marginTop: '40.2%', color: 'white', zIndex: 4000 }}>
                <div className="row-md" style={{ fontSize: '20pt' }}>
                  {user.lastName + ' ' + user.name}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md">
          <div className="row">
            <div className="col-md-5" style={{ border: '1px black solid', borderRadius: 8, zIndex: 4000, position: 'absolute', marginLeft: '28.9%', marginTop: '-13.6%', fontSize: '12pt' }}>
              <div className="row-md">
                <div className="input-group">
                  <input type="text" className="form-control flex-wrap text-wrap" placeholder="Напишите о своих новостях" aria-label="AddNews" aria-describedby="basic-addon1" style={{ marginTop: '3%', paddingBottom: '4%' }} />
                </div>
              </div>
              <div className="row-md">
                <button type="button" className="btn btn-primary col-md-6 offset-md-6" style={{ marginTop: '2%', marginBottom: '3%' }}>Создать публикацию</button>
              </div>
            </div>
            <div className="col-md-12">
              <div className="col-md-7 offset-md-6" style={{ zIndex: 4000, position: 'absolute', marginTop: '-13.6%', fontSize: '12pt' }}>
                <div className="col-md-6 offset-md-4" style={{ border: '1px black solid', borderRadius: 8, marginLeft: '35.6%' }}>
                <div className="row-md" style={{ fontSize: '12pt', marginLeft: '3%', marginTop: '1.3%' }}>
                      <div className="col-md">
                        {'Пол: ' + user.sex}
                      </div>
                    </div>
                  <div className="row-md" style={{ fontSize: '12pt', marginLeft: '3%', marginTop: '1.3%' }}>
                    <div className="col-md">
                      {user.birthDate === null ?
                        (null)
                        :
                        (
                          'Дата рождения: ' + user.birthDate
                        )}
                    </div>
                  </div>

                  <div>
                    <div className="row-md" style={{ fontSize: '12pt', marginLeft: '3%', marginTop: '1.3%' }}>
                      <div className="col-md">
                        {user.country === null ?
                          (null)
                          :
                          (
                            'Страна: ' + user.country
                          )}
                      </div>
                    </div>
                  </div>



                  <div>
                    <div className="row-md" style={{ fontSize: '12pt', marginLeft: '3%', marginTop: '1.3%', marginBottom: '1.3%' }}>
                      <div className="col-md">
                        {user.city === null ?
                          (null)
                          :
                          (
                            'Город: ' + user.city
                          )}
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;