import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import "./draft.css";
import { useLocation } from "react-router-dom";
import Draft from '../../components/drafts/Draft';

export default function DraftPage() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();

  // fetch all posts on load
  useEffect(()=>{
    const fetchPosts =  async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    }
    fetchPosts();
  }, [search])
  return (
    <>
      <Header />
      <div>
        <h1 className='text'>Your Drafts posts</h1>
        <Draft posts={posts}/>
      </div>
    </>
  );
}
