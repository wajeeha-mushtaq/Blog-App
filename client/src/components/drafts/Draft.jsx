import React from 'react';
import Post from "../post/Post";
import "./drafts.css";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Draft({posts}) {
  const { user } = useContext(Context);
  return (
    <div className="posts">
      {
      posts.map(p=>(
        p.username == user.username && p.published == false?
        <Post key={p._id} post={p}/>: null
      ))
      }
    </div>
  );
}
