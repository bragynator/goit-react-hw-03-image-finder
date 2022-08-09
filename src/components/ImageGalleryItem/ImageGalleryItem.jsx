import styles from './ImageGalleryItem.module.css';

export function ImageGalleryItem(props) {
  const { webformatURL, tags, id, showModal } = props;
  return (
    <li className={styles.imageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={styles.imageGalleryItemImage}
        onClick={() => showModal(id)}
      />
    </li>
  );
}
