import React from 'react';

import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ hits }) {
  return hits.map(({ id, webformatURL }) => {
    return (
      <li className={css.ImageGalleryItem} key={id}>
        <img className={css.ImageGalleryItemImage} src={webformatURL} alt="" />
      </li>
    );
  });
}
