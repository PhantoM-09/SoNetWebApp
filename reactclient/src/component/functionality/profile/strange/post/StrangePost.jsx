import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../../../../..";
import ModalComment from "../../post/comment/ModalComment";
import LikeCounter from "../../post/LikeCounter";
import DeleteStrangePost from "./DeleteStrangePost";

const StrangePost = (props) => {
    const { user } = useContext(Context);
    const { strangeUser } = useContext(Context);

    const [posts, setPosts] = useState([]);

    const [deletePostVisible, setDeletePostVisible] = useState(false);
    const [deletedPost, setDeletedPost] = useState({});

    const [commentPostVisible, setCommentPostVisible] = useState(false);
    const [commentedPost, setCommentedPost] = useState({});
    const [comments, setComments] = useState([]);

    const loadComments = (post) =>{

        axios.get('https://localhost:7132/api/comment/get-comments/' + post.postId, { withCredentials: true })
            .then(response => {
                setComments(response.data);
            })

        setCommentedPost(post);
        setCommentPostVisible(true);
    }

    useEffect(() => {
        axios.get('https://localhost:7132/api/post/get-strange-posts/' + strangeUser.UserId, { withCredentials: true })
            .then(postResponse => {
                setPosts(postResponse.data);
            })
    }, [])

    return (
        <div className="row">
             {<ModalComment
                show={commentPostVisible}
                onHide={() => setCommentPostVisible(false)}
                commentedPost={commentedPost}
                user={props.user}
                comments = {comments}
                setComments = {setComments}
            />
            }
            {<DeleteStrangePost
                show={deletePostVisible}
                onHide={() => setDeletePostVisible(false)}
                deletedPost={deletedPost}
                setPosts={setPosts}
            />}
            <div className="col-md-5" style={{ zIndex: 450, position: 'absolute', marginLeft: '27.8%', marginTop: '-9.8%' }}>
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
                            {
                                user.userType === 'ContentAdmin' ||  user.userType === 'MainAdmin'
                                    ?
                                    (<div className="col-md-2 d-inline-block">
                                        <div className="col-md">

                                            <button className="btn btn-primary" style={{ fontSize: '12pt', marginLeft: '15%', position: 'absolute', zIndex: 450, marginTop: '-7.2%' }}
                                                onClick={() => { setDeletedPost(post); setDeletePostVisible(true) }}>Удалить</button>

                                        </div>
                                    </div>)
                                    :
                                    (null)
                            }

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
                                <img src="free-icon-comment-4991361.png" style={{ width: 20, height: 20, cursor: 'pointer', marginLeft: '13%' }} onClick={() =>  loadComments(post)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );

}

export default StrangePost;