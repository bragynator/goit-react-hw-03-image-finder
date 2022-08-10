import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';

export function ImageGallery({ items, showModal }) {
  return (
    <ul className={styles.imageGallery}>
      {items.map(({ id, webformatURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            id={id}
            webformatURL={webformatURL}
            tags={tags}
            showModal={showModal}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  showModal: PropTypes.func,
};
