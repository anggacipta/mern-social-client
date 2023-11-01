import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {Add, Remove} from "@mui/icons-material"

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends, dispatch] = useState([]);
  const {user:currentUser} = useContext(AuthContext);
  const [follow,setFollow] = useState(currentUser.followings.includes());

  useEffect(()=>{
    const getFriends = async ()=> {
      try {
        const friendList = await axios.get("http://localhost:8800/api/user/friends/"+user._id);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    }
    getFriends();
  },[user])

  const handleClick = async () => {
    try {
      if (follow) {
        await axios.put("http://localhost:8800/api/user/"+user._id+"/unfollow", {userId:currentUser._id});
        dispatch({type: "UNFOLLOW", payload:user._id});
      } else {
        await axios.put("http://localhost:8800/api/user/"+user._id+"/follow", {userId:currentUser._id});
        dispatch({type: "UNFOLLOW", payload:user._id});
      }
    } catch (error) {
      console.log(error);
    }
    setFollow(!follow)
  }

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {follow ? "Unfollow" : "Follow"}
          {follow ? <Remove/> : <Add/>}
        </button>
      )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship ===1 ? "Single" : user.relationship ===1 ? "Married" : "-"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map(friend=>(
          <Link to={"/profile/"+friend.username} style={{textDdecoration: "none"}}>
          <div className="rightbarFollowing">
            <img
              src={friend.profilePicture ? PF+friend.profilePicture : PF+"person/noAvatar.png"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">{friend.username}</span>
          </div>
          </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
