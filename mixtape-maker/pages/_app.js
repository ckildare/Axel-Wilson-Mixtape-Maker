import Header from '../components/layout/header/header.js';
import { Analytics } from '@vercel/analytics/react';

import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return <>
    <Header />
    <div class='pagepadding'>
      <Component {...pageProps} />
      <Analytics/>
    </div>
  </>
}
