import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import { Component } from 'react';

import css from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    query: '',
    hits: [],
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const API_KEY = '33411658-9504db49656fc0db308898fd3';

    const prevQuery = prevProps.query;
    const currentQuery = this.props.query;
    // const page = 1;

    if (prevQuery !== currentQuery) {
      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?q=${currentQuery}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(query => this.setState({ hits: query.hits, status: 'resolved' }));
    }
  }

  render() {
    const { status, hits } = this.state;

    if (status === 'idle') {
      return <div>Введите текст</div>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (hits.length < 1) {
      return <div>Ничего не найдено</div>;
    }

    if (status === 'resolved') {
      return (
        <ul className={css.ImageGallery}>
          <ImageGalleryItem hits={hits} />
        </ul>
      );
    }
  }
}
