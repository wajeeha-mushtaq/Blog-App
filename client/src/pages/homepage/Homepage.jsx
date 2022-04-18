import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import "./homepage.css";
import { useLocation } from "react-router-dom";

export default function Homepage() {
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
      <div className="home">
        <Posts posts={posts}/>
      </div>
    </>
  );
}
