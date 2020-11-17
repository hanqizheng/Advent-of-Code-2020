import React, { useState } from 'react';
import styles from '../styles/Home.module.css'

function Page({ data }) {
  const [tempValue, setTempValue] = useState();
  const [realValue, setRealValue] = useState(data.value);

  const handleInputOnchange = (e) => {
    setTempValue(e.target.value);
  }

  const handleClick = async () => {
    // const res = await fetch(`https://test-serverless-inky.vercel.app/api/click?input=${tempValue}`);
    // const data = await res.json();
    setRealValue(tempValue);
  }

  return (
    <div className={styles.container}>
      <span style={{ marginBottom: 20 }}>{`value: ${realValue}`}</span>
      <input style={{ marginBottom: 20 }} onChange={handleInputOnchange} />
      <button className={styles.button} onClick={handleClick}>Click</button>
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch('https://test-serverless-inky.vercel.app/api/hello');
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}

export default Page
