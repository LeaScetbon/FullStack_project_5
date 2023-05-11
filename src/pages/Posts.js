import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function Posts() {
  const [posts, setPosts] = useState([]);
  const [IdPost,setIdPOst] = useState("null");
  const [isBoldId, setIsBoldId] = useState(false);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => {
        console.error("Error fetching todos:", error);
        navigate("/error");
      });
  }, []);

  const postsOfUser = posts.filter(
    (post) => post.userId === JSON.parse(localStorage.getItem("currentUser")).id
  );

  const handleComments = async (postId) => {
    setIdPOst(postId);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      const comments = await response.json();
      setComments(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  return (
    <section className="section">
      <h4>Posts</h4>
      {postsOfUser.map((post) => (
        <div key={post.id}>
          <label>
           Title: {post.title}{" "}
            <button onClick={() => setIsBoldId(post.id)}>Bold</button>
          </label>
          <p style={{ fontWeight: isBoldId === post.id ? "bold" : "normal" }}>{post.body}</p>
          <button onClick={() => handleComments(post.id) }>See the comments</button>
          {IdPost === post.id && (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <h5>{comment.name}</h5>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}

export default Posts;
