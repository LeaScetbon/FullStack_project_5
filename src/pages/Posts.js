import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
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
  
  const postsOfUser = posts.filter((post) => post.userId === JSON.parse(localStorage.getItem("currentUser")).id);


  return (
    
    <section className="section">
    <h4>Posts</h4>
    {postsOfUser.map((post) => (
      <div key={post.id}>
       
        <label>{post.title}</label>
      </div>
    ))}
  </section>
  );
}

export default Posts;