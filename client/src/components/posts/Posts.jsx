import React from 'react';
import Post from "../post/Post";
import "./posts.css";

export default function Posts({posts}) {
  return (
    <>
    <h1 className='text'>Published Posts</h1>
    <div className="posts">
      {
      posts.map(p=>(
        p.published == true?
        <Post key={p._id} post={p}/>: null
      ))
      }
    </div>
    </>
  );
}
