// Gallery.js
import React, { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import "./Gallery.css";
import logo from "./Assets/Pixel.png";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = () => {
    axios
      .get(`https://picsum.photos/v2/list?page=${page}&limit=10`)
      .then((response) => {
        setImages((prevImages) => [...prevImages, ...response.data]);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <div className="top">
        <img className="logo" src={logo} />
        <h1>Image Gallery</h1>
      </div>
      <div className="header">
        <img className="banner" src="https://as2.ftcdn.net/v2/jpg/05/35/47/39/1000_F_535473996_U2yXA7XqC7TC4GKpoOxiI3LHNUVx2xcI.jpg" />
      </div>

      <div className="image-gallery">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="20px">
            {images.map((image) => (
              <img
                className="img"
                key={image.id}
                src={image.download_url}
                alt={image.author}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
        <div className="load-more">
        <button onClick={loadMoreImages}>
        Load More
      </button>
        </div>

      </div>
    </>
  );
};

export default Gallery;
