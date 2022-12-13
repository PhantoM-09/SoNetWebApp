import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../../../../..";
import LikeCounter from "../../post/LikeCounter";

const StrangePost = (props) => {
    const {strangeUser} = useContext(Context);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7132/api/post/get-strange-posts/' + strangeUser.UserId, { withCredentials: true })
            .then(postResponse => {
                setPosts(postResponse.data);
            })
    }, [])

    return (
        <div className="row">
<div className="col-md-5" style={{ zIndex: 400, position: 'absolute', marginLeft: '27.8%', marginTop: '-9.8%'}}>
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
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: '3%', marginLeft: '-0.5%', marginRight: '23%' }}>
                            <div className="col-md text-break text-justify">
                                {post.postText}
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: '3%', marginBottom: '1.5%' }}>
                        <LikeCounter
                                post={post}
                                setPosts={setPosts}
                            />
                            <div className="col-md">
                                <img src="free-icon-comment-4991361.png" style={{ width: 20, height: 20, cursor: 'pointer', marginLeft: '13%' }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
    );

}

export default StrangePost;