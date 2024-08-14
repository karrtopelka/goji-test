import { FormWrapper, GroceryForm, GroceryList } from '@/components';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.operations}>
        <FormWrapper
          title='Grocery List'
          titleConfig={{
            variant: 'h3',
            gutterBottom: true,
          }}
          containerConfig={{
            sx: {
              display: 'flex',
              justifyContent: 'center',
            },
          }}
          paperConfig={{
            sx: {
              p: 2,
            },
          }}
          blockConfig={{
            sx: {
              p: 2,
            },
          }}>
          <GroceryForm showReset={true} />
        </FormWrapper>
      </div>
      <div className={styles.list}>
        <GroceryList />
      </div>
    </main>
  );
}
