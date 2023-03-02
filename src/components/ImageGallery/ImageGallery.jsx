import { Component } from 'react';

import { Button } from 'components/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';

import css from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    query: '',
    hits: [],
    status: 'idle',
    totalHits: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const API_KEY = '33411658-9504db49656fc0db308898fd3';

    const prevQuery = prevProps.query;
    const currentQuery = this.props.query;
    const page = this.state.page;

    if (prevQuery !== currentQuery) {
      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?q=${currentQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(query =>
          this.setState({
            hits: query.hits,
            status: 'resolved',
            totalHits: query.totalHits,
          })
        );
      return;
    }

    if (prevState.page !== this.state.page) {
      fetch(
        `https://pixabay.com/api/?q=${currentQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(query =>
          this.setState({
            hits: query.hits,
            status: 'resolved',
          })
        );
    }
  }

  handlerLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      hits: [...prevState.hits, ...this.state.hits],
    }));
  };

  render() {
    const { status, hits, page, totalHits } = this.state;

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
        <div>
          <ul className={css.ImageGallery}>
            <ImageGalleryItem hits={hits} />
          </ul>
          {totalHits > 12 * page && (
            <Button handlerLoadMore={this.handlerLoadMore} />
          )}
        </div>
      );
    }
  }
}
