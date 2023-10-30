import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState, useEffect } from "react";
import axios from "axios"
import { useParams} from 'react-router'

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [users,setUsers] = useState({})
  const username = useParams().username

  useEffect(()=> {
     const fetchUser = async () => {
      const response = await axios.get(`http://localhost:8800/api/user?username=${username}`);
      setUsers(response.data)
    }
    fetchUser();
  },[])

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={users.coverPicture || PF+"person/noCover.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={users.prfilePicture || PF+"person/noAvatar.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{users.username}</h4>
                <span className="profileInfoDesc">{users.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username}/>
            <Rightbar user={users}/>
          </div>
        </div>
      </div>
    </>
  );
}
