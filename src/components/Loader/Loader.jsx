import { TailSpin } from 'react-loader-spinner';
import styles from './Loader.module.css';

export function Loader() {
  return (
    <div className={styles.loader}>
      <TailSpin color="#3f51b5" height={100} width={100} />
    </div>
  );
}
