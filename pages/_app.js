import Header from 'components/layout/Header/Header';
import { Analytics } from '@vercel/analytics/react';
import { SpotifyAPIProvider } from 'spotifyContext';
import React from 'react';

import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return <>
    <Header />
    <div className='pagePadding'>
      <SpotifyAPIProvider>
        <Component {...pageProps} />
      </SpotifyAPIProvider>
      <Analytics />
    </div>
  </>;
}
