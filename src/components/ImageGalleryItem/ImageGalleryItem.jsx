import React from 'react';

export default function ImageGalleryItem({ hits }) {
  return hits.map(({ id, webformatURL }) => {
    return (
      <li className="gallery-item" key={id}>
        <img src={webformatURL} alt="" />
      </li>
    );
  });
}
