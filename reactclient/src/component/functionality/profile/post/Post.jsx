import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import DeletePost from "./DeletePost";

const Post = (props) => {
    const [posts, setPosts] = useState([]);
    const [postText, setPostText] = useState("");
    const [deletePostVisible, setDeletePostVisible] = useState(false);

    useEffect(() => {
        axios.get('https://localhost:7132/api/post/get-posts/', { withCredentials: true })
            .then(postResponse => {
                setPosts(postResponse.data);
                console.log(posts);
            })
    }, [])
    
    const addPost = () => {
        if (postText.length === 0) {
            toast.error("Публикация не может быть пустой", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
                pauseOnFocusLoss: false
            });
        }
        else {
            var post = {
                PostText: postText,
                PostPublication: new Date()
            }

            axios.post('https://localhost:7132/api/post/add-post/', post, { withCredentials: true })
                .then(response => {
                    setPosts(prevState => [response.data, ...prevState]);
                    setPostText("");
                })
        }

    }

    return (
        <div>
            <div className="row">
                <div className="col-md-5" style={{ border: '1px black solid', borderRadius: 8, zIndex: 4000, position: 'absolute', marginLeft: '28.9%', marginTop: '-13.6%', fontSize: '12pt' }}>
                    <div className="row-md">
                        <div className="input-group">
                            <input type="text" name="postText" value={postText} onChange={e => setPostText(e.target.value)} className="form-control flex-wrap text-break text-wrap" placeholder="Напишите о своих новостях" aria-label="AddNews" aria-describedby="basic-addon1" style={{ marginTop: '3%', paddingBottom: '4%' }} />
                        </div>
                    </div>
                    <div className="row-md">
                        <button type="button" className="btn btn-primary col-md-6 offset-md-6" style={{ marginTop: '2%', marginBottom: '3%' }} onClick={addPost}>Создать публикацию</button>
                    </div>
                </div>
            </div>
            <div className="col-md-5" style={{ zIndex: 4000, position: 'absolute', marginLeft: '27.8%', marginTop: '-2%' }}>
                {posts?.map((post) => (

                    <div key={post.postId} className="col-md-12" style={{ border: '1px black solid', borderRadius: 8, fontSize: '12pt', marginTop: '2%' }}>
                        <div className="row-md">
                            <div className="col-md d-inline-block" >
                                <img style={{ borderRadius: 500, height: 50, width: 50, objectFit: 'cover', marginTop: '-5%', marginLeft: '20%' }} src={props.user.profileImage} />
                            </div>
                            <div className="col-md-6 d-inline-block">
                                <div className="col-md-8" style={{ fontSize: '12pt', marginLeft: '7.5%' }}>
                                    {props.user.lastName + ' ' + props.user.name}
                                </div>
                                <div className="col-md-6" style={{ fontSize: '10pt', marginLeft: '7.5%' }}>
                                    {(new Date(post.postPublication)).toLocaleString().substring(0, (new Date(post.postPublication)).toLocaleString().length - 3)}
                                </div>
                            </div>
                            <div className="col-md-2 d-inline-block">
                                <div className="col-md">
                                    <button className="btn btn-primary" style={{ fontSize: '12pt', marginLeft: '35%', marginTop: '-30%' }}>Редактировать</button>
                                    <button className="btn btn-primary" style={{ fontSize: '12pt', marginLeft: '17%', position: 'absolute', zIndex: 10000, marginTop: '1%' }} data-bs-toggle="modal" data-bs-target="#exampleModal">Удалить</button>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: '3%', marginLeft: '-0.5%', marginRight: '23%' }}>
                            <div className="col-md text-break text-justify">
                                {post.postText}
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: '3%', marginBottom: '1.5%' }}>
                            <div className="col-md-10" style={{ marginLeft: '2.2%' }}>
                                <img src="free-icon-heart-shape-outline-25424.png" style={{ width: 20, height: 20, cursor: 'pointer' }} />
                                <span style={{ fontSize: '12pt', marginLeft: '1%' }}>
                                    {post.postLikeAmount}
                                </span>
                            </div>
                            <div className="col-md">
                                <img src="free-icon-comment-4991361.png" style={{ width: 20, height: 20, cursor: 'pointer', marginLeft: '13%' }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div></div>
    );
}

export default Post;