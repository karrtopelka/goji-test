import { GroceryItemsContainer } from './grocery-items-container';
import { GroceryItemsOperations } from './grocery-items-operations';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.operations}>
        <GroceryItemsOperations />
      </div>
      <div className={styles.konva}>
        <GroceryItemsContainer />
      </div>
    </main>
  );
}
