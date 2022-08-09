import styles from './LoadMoreButton.module.css';

export function LoadMoreButton({ onClick }) {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      Load More
    </button>
  );
}
