import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from "./AlbumPhotos.module.css";

function AlbumPhotos() {
  const [photos, setPhotos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [endOfAlbum, setEndOfAlbum] = useState(false);
  const [endOfSet, setEendOfSet] = useState(false);

  const location = useLocation();
  const { title } = location.state;
  const { albumId } = useParams();
  const limit = 10;

  useEffect(() => {
    let url = `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&_start=${startIndex}&_limit=${limit}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPhotos((prevPhotos) => [...prevPhotos, ...data]);
        if (data.length < limit) {
          setEndOfAlbum(true);
        }
        if (endOfSet) {
          setCurrentPhotoIndex((prevIndex) => prevIndex + 1);
          setEendOfSet(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
        return [];
      });
  }, [startIndex]);

  const handlePrevious = () => {
    setCurrentPhotoIndex((prevIndex) => prevIndex - 1);
    setEndOfAlbum(false);
  };

  const handleNext = () => {
    if (currentPhotoIndex === photos.length - 1) {
      setStartIndex((prevStartIndex) => prevStartIndex + limit);
      setEendOfSet(true);
    } else {
      setCurrentPhotoIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className={styles.slider}>
      <h1 className={styles.albumTitle}>{title}</h1>
      {photos.length > currentPhotoIndex ? (
        <div className={styles.photoWrapper}>
          <button
            onClick={handlePrevious}
            disabled={currentPhotoIndex === 0}
            className={`${styles["arrow-button"]} ${styles.leftArrow}`}
          >
            &lt;
          </button>
          <div className={styles.photoContent}>
            <img
              src={photos[currentPhotoIndex].thumbnailUrl}
              alt={photos[currentPhotoIndex].title}
              className={styles.photo}
            />
            <h3 className={styles.photoTitle}>
              {photos[currentPhotoIndex].title}
            </h3>
          </div>
          <button
            onClick={handleNext}
            disabled={endOfAlbum || endOfSet || photos.length === 0}
            className={`${styles["arrow-button"]} ${styles.rightArrow}`}
          >
            &gt;
          </button>
        </div>
      ) : (
        <p>{endOfAlbum ? "End of album" : "Loading..."}</p>
      )}
    </div>
  );
}

export default AlbumPhotos;
