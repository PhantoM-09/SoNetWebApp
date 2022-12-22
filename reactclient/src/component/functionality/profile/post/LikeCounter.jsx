import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';


const LikeCounter = (props) => {
    const [likeIsPress, setLikeIsPress] = useState(false);
    const [likeImage, setLikeImage] = useState("black-heart.png")
    const [likeCount, setLikeCount] = useState(0);

    const notPress = "black-heart.png";
    const press = "red-heart.png";

    useEffect(() => {
        axios.get('http://localhost:5000/api/post/get-like-count/' + props.post.postId, { withCredentials: true })
            .then(response => {
                setLikeCount(response.data)
                axios.get('http://localhost:5000/api/post/get-liked/' + props.post.postId, { withCredentials: true })
                    .then(response => {
                        switch (response.data) {
                            case 'liked':
                                console.log('press')
                                setLikeIsPress(true);
                                setLikeImage(press);
                                break;
                            case 'not liked':
                                console.log('no press')
                                setLikeIsPress(false);
                                setLikeImage(notPress);
                                break;
                        }
                    })
            })
    }, [])

    const pressLike = () => {
        if (likeIsPress) {
            setLikeIsPress(false);
            setLikeImage(notPress);
        }
        else {
            setLikeIsPress(true);
            setLikeImage(press);
        }
        changeLikeAmount();
    }

    const changeLikeAmount = () => {
        axios.put('http://localhost:5000/api/post/change-like/' + props.post.postId, null, { withCredentials: true })
            .then(response => {
                setLikeCount(response.data);
            })
    }

    return (
        <div className="col-md-10" style={{ marginLeft: '2.2%' }}>
            <img name="likeImage" src={likeImage} style={{ width: 20, height: 17.2, cursor: 'pointer' }} onClick={pressLike} />
            <span style={{ fontSize: '12pt', marginLeft: '1%' }}>
                {likeCount}
            </span>
        </div>
    );
}


export default LikeCounter;
