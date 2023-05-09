import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Albums() {
  const [albums, setAlbums] = useState([]);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((data) => setAlbums(data))
      .catch((error) => {
        console.error("Error fetching albums:", error);
        // Navigate("/error");
      });
  }, []);

  const userAlbums = albums.filter((album) => album.userId === user.id);

  return (
    <div>
      {userAlbums.map((album) => (
        <div key={album.id}>
          <NavLink key={album.id} to={`/albums/${album.id}`}>
            {album.title}
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default Albums;
