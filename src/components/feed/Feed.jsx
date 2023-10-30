import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios"

export default function Feed({username}) {
  const [posts,setPosts] = useState([])

  useEffect(()=> {
     const fetchPosts = async () => {
      const response = username 
        ? await axios.get('http://localhost:8800/api/post/profile/' + username)
        : await axios.get('http://localhost:8800/api/post/timeline/65369415ddbef5eb520217d0');
      setPosts(response.data)
    }
    fetchPosts();
  },[username])
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
