import { Link } from "react-router-dom";
import "./post.css";

export default function Post({post}) {
  return (
    <div className="post">
      {post.photo && (
        <img
          className="postImg"
          src={post.photo}
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
