import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROFILE_ROUTE } from '../../../../utils/consts';

const EditPictures = () => {
    const [profileImage, setProfileImage] = useState('');
    const [profileBackground, setProfileBackground] = useState('');

    const [imageFile, setImageFile] = useState({})
    const [backgroundFile, setBackgroundFile] = useState({})

    const navigate = useNavigate();

    const editPictures = (e) =>{
        e.preventDefault();

        var formData= new FormData();
        formData.append("profileImage", imageFile);
        formData.append("profileBackground",backgroundFile);

        axios.put('https://localhost:7132/api/file/edit-images/', formData, {withCredentials: true})
        .then(response=>{
            navigate(PROFILE_ROUTE);

        })
    }

    const handleChangeImageFile = (event) => {
        var file = event.target.files[0];

        setImageFile(file);

        convertFileToProfileImage(file);
    }

    const handleChangeBackgroundFile = (event) => {
        var file = event.target.files[0];

        setBackgroundFile(file);

        convertFileToProfileBackground(file);
    }

    const convertFileToProfileImage = (file) => {
        var reader = new FileReader();

        reader.onload = function (event) {
            setProfileImage(event.target.result);
        }

        reader.readAsDataURL(file);
    }

    const convertFileToProfileBackground = (file) => {
        var reader = new FileReader();

        reader.onload = function (event) {
            setProfileBackground(event.target.result);
        }

        reader.readAsDataURL(file);
    }


    useEffect(() => {
        axios.get('https://localhost:7132/api/file/get-profile-image/', { withCredentials: true })
            .then(imageResponse => {
                setProfileImage('https://localhost:7132/' + imageResponse.data.profileImage);
                setProfileBackground('https://localhost:7132/' + imageResponse.data.profileBackground)
            })
    }, [])

    return (
        <div className='col-md' style={{ border: '1px solid black', borderRadius: 8 }} >
            <div className="row" style={{ marginLeft: '0.1%', marginTop: '1.1%' }}>
                <div className='col-md-4'>
                    <img className="col-md-12" src={profileImage} style={{ border: '1px black solid', borderRadius: 8, height: 280, objectFit: 'cover' }}></img>
                </div>
            </div>
            <div className="row" style={{ marginLeft: '0.1%', marginTop: '1.1%', marginRight: '0.1%' }}>
                <div className='col-md-4'>
                    <div className="input-group">
                        <input type="file" className="form-control" onChange={handleChangeImageFile} />
                    </div>
                </div>
            </div>

            <div className="row" style={{ marginLeft: '0.1%', marginTop: '1.1%', marginRight: '0.1%' }}>
                <div className='col-md'>
                    <img className="col-md-12" src={profileBackground} style={{ border: '1px black solid', borderRadius: 8, height: 360, objectFit: 'cover' }}></img>
                </div>
            </div>
            <div className="row" style={{ marginLeft: '0.1%', marginTop: '1.1%', marginRight: '0.1%' }}>
                <div className='col-md-4'>
                    <div className="input-group">
                        <input type="file" className="form-control" onChange={handleChangeBackgroundFile} />
                    </div>
                </div>
            </div>
            <div className="row" style={{ marginLeft: '0.1%', marginTop: '3%', marginRight: '0.1%', marginBottom: '1%' }}>
                <div className='col-md'>
                    <form onSubmit={editPictures}>
                        <button className='btn btn-primary' type='submit'>Сохранить</button>
                        <button className='btn btn-secondary' style={{ marginLeft: '1.7%' }} type="button" onClick={e=> navigate(PROFILE_ROUTE)}>Отмена</button>
                    </form>
                </div>
            </div>
        </div>
    );


}

export default EditPictures;