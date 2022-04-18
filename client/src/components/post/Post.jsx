import React from 'react';
import { Link } from "react-router-dom";
import "./post.css";

export default function Post({post}) {
  // for the images associated with blogs
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      {post.photo && (
        <img
          className="postImg"
          src={PF + post.photo}
          alt=""
        />
      )}
      <div className="postInfo">
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{post.createdAt}</span>
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
    </div>
  );
}
