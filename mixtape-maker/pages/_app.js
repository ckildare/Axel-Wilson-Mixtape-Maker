import '@/styles/globals.css'
import styles from '@/styles/Home.module.css';
import Header from '../components/layout/header/header.js';
import Footer from '../components/layout/footer/footer.js';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return <>
    <Header />
    <div className={styles.pageConent}>
      <Component {...pageProps} />
      <Analytics/>
    </div>
  </>
}
