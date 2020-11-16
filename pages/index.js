import styles from '../styles/Home.module.css'

export default function Home() {
  const handleButtonClick = () => {
    console.log('click');
  };

  return (
    <div className={styles.container}>
      <button onClick={handleButtonClick} className={styles.button}>Click</button>
    </div>
  )
}
