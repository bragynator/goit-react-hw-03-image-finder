import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
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
