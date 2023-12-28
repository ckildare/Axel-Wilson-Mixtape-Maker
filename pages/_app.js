import Header from 'components/layout/Header/Header';
import { Analytics } from '@vercel/analytics/react';
import { SpotifyAPIProvider } from 'spotifyContext';

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
