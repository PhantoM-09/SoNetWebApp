import axios from 'axios';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Context } from '../../..';
import { FRIEND_ROUTE, LOGIN_ROUTE } from '../../../utils/consts';
import Post from './post/Post';

const Profile = observer(() => {
  const [isStart, setIsStart] = useState(false);

  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState({ lastName: '', name: '', birthDate: null, sex: '', country: null, city: null, profileImage: '', profileBackground: '', friendCount: 0, subscriberCount: 0 })

  useEffect(() => {
    axios.get('https://localhost:7132/api/user/get-user/', { withCredentials: true })
      .then(response => {
        var userInfo = response.data;

        axios.get('https://localhost:7132/api/file/get-profile-image/', { withCredentials: true })
          .then(imageResponse => {
            setProfileUser({ ...profileUser, lastName: userInfo.lastName, name: userInfo.name, sex: userInfo.sex, birthDate: userInfo.birthDate, friendCount: userInfo.friendCount, subscriberCount: userInfo.subscriberCount, profileImage: 'https://localhost:7132/' + imageResponse.data.profileImage, profileBackground: 'https://localhost:7132/' + imageResponse.data.profileBackground });
            setIsStart(true);
          })
      })
      .catch(error => {
        if (error.response) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
            pauseOnFocusLoss: false
          });

          user.setAuth(false);
          navigate(LOGIN_ROUTE);
        }
      })
  }, []);

  return (
    <div className="col-md-10">
      {isStart
        ?
        (<div className="col-md-12" style={{ position: 'relative' }}>
          <div className="col-md-12" style={{ background: 'black', opacity: .4, width: '100%', height: 370, position: 'absolute', borderRadius: 8 }}></div>
          <img className="col-md-12" style={{ height: 370, objectFit: 'cover', borderRadius: 8, zIndex: -1000, position: 'absolute' }} src={profileUser.profileBackground} />
          <div className="col-md-12">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-5" style={{ position: 'relative', top: 25 }}>
                  <div className="col-md-12">
                    <div className="container-md-12" style={{ border: '1px black solid', borderRadius: 8, background: 'white' }}>
                      <div className="row-md">
                        <div className="col-md">
                          <div style={{ padding: '5%' }}>
                            <img className="col-md-12" src={profileUser.profileImage} style={{ border: '1px black solid', borderRadius: 8, height: 290, objectFit: 'cover' }} />
                          </div>
                        </div>
                      </div>
                      <div className="row-md">
                        <div className="col-md-8 offset-md-2">
                          <div className="text-center" style={{ fontWeight: 'bold', fontSize: '14pt', marginBottom: -10 }}>
                            {profileUser.friendCount}
                          </div>
                          <div className="text-center" style={{ fontSize: '14pt' }}>Друзья</div>
                        </div>
                      </div>
                      <div className="row-md">
                        <div className="col-md-8 offset-md-2">
                          <div className="text-center" style={{ fontWeight: 'bold', fontSize: '14pt', marginBottom: -10 }}>
                            {profileUser.subscriberCount}
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
                        <div style={{ paddingTop: '4%', zIndex: 450, position: 'relative' }}>
                          <div className="btn col-md-12" style={{ fontSize: '12pt', border: '1px black solid', borderRadius: 8 }} onClick={() => navigate(FRIEND_ROUTE)}>Друзья</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6" style={{ marginTop: '40.2%', color: 'white', zIndex: 400 }}>
                  <div className="row-md" style={{ fontSize: '20pt' }}>
                    {profileUser.lastName + ' ' + profileUser.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md">
            <Post
              user={profileUser}
            />
            <div className="col-md-12">
              <div className="col-md-7 offset-md-6" style={{ zIndex: 400, position: 'absolute', marginTop: '-13.6%', fontSize: '12pt' }}>
                <div className="col-md-6 offset-md-4" style={{ border: '1px black solid', borderRadius: 8, marginLeft: '35.6%' }}>
                  <div className="row-md" style={{ fontSize: '12pt', marginLeft: '3%', marginTop: '1.3%' }}>
                    <div className="col-md">
                      {'Пол: ' + profileUser.sex}
                    </div>
                  </div>
                  <div className="row-md" style={{ fontSize: '12pt', marginLeft: '3%', marginTop: '1.3%' }}>
                    <div className="col-md">
                      {profileUser.birthDate === null ?
                        (null)
                        :
                        (
                          'Дата рождения: ' + profileUser.birthDate
                        )}
                    </div>
                  </div>

                  <div>
                    <div className="row-md" style={{ fontSize: '12pt', marginLeft: '3%', marginTop: '1.3%' }}>
                      <div className="col-md">
                        {profileUser.country === null ?
                          (null)
                          :
                          (
                            'Страна: ' + profileUser.country
                          )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="row-md" style={{ fontSize: '12pt', marginLeft: '3%', marginTop: '1.3%', marginBottom: '1.3%' }}>
                      <div className="col-md">
                        {profileUser.city === null ?
                          (null)
                          :
                          (
                            'Город: ' + profileUser.city
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>)
        :
        (null)}

    </div>
  );
});

export default Profile;