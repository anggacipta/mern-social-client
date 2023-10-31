import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import axios from "axios"
import { format, render, cancel, register } from 'timeago.js';
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [users,setUsers] = useState({})
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const {user:currentUser} = useContext(AuthContext);

   useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id))
   }, [currentUser._id, post.likes]);

   useEffect(()=> {
     const fetchUser = async () => {
      const response = await axios.get(`http://localhost:8800/api/user?userId=${post.userId}`);
      setUsers(response.data)
    }
    fetchUser();
  },[post.userId])

  const likeHandler = () => {
    try {
      axios.put("http://localhost:8800/api/post/"+post._id+"/like", {userId:currentUser._id})
    } catch (err) {

    }
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${users.username}`}>
              <img
                className="postProfileImg"
                src={users.profilePicture ? PF + users.profilePicture : PF+"person/noAvatar.png"}
                alt=""
              />
            </Link>
            <span className="postUsername">
              {users.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF+post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
