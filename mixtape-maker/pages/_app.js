import Header from '../components/layout/header/header.js';
import { Analytics } from '@vercel/analytics/react';
import { SpotifyAPIProvider } from './api/SpotifyAPIContext.js';

import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return <>
    <Header />
    <div className='pagepadding'>
      <SpotifyAPIProvider>
        <Component {...pageProps} />
      </SpotifyAPIProvider>
      <Analytics />
    </div>
  </>
}
