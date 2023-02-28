import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';

export default class ImageGallery extends Component {
  state = {
    query: '',
    hits: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const API_KEY = '33411658-9504db49656fc0db308898fd3';

    const prevQuery = prevProps.query;

    const currentQuery = this.props.query;

    if (prevQuery !== currentQuery) {
      fetch(
        `https://pixabay.com/api/?q=${currentQuery}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(hits => this.setState({ hits: hits.hits }));
    }
  }

  render() {
    return (
      <ul className="gallery">
        Gallery
        <ImageGalleryItem hits={this.state.hits} />
      </ul>
    );
  }
}
