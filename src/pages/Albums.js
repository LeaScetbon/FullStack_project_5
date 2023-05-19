import styles from "./Albums.module.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom/dist";

function Albums() {
  const [albums, setAlbums] = useState([]);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((data) =>
        setAlbums(data.filter((album) => album.userId === user.id))
      )
      .catch((error) => {
        console.error("Error fetching albums:", error);
      });
  }, []);

  return (
    <div className={styles.albumList}>
      {albums.map((album) => (
        <div className={styles.albumItem} key={album.id}>
          <NavLink
            to={`/albums/${album.id}`}
            state={{ title: album.title }}
            className={styles.albumLink}
            // activeClassName={styles.activeLink}
          >
            {album.title}
          </NavLink>
        </div>
      ))}
    </div>

    // <div>
    //   {albums.map((album) => (
    //     <div key={album.id}>
    //       <NavLink to={`/albums/${album.id}`} state={{ title: album.title }}>
    //         {album.title}
    //       </NavLink>
    //     </div>
    //   ))}
    // </div>
  );
}
export default Albums;
