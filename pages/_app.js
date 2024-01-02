import Header from 'components/layout/Header/Header';
import { Analytics } from '@vercel/analytics/react';
import React from 'react';

import '../styles/globals.css';
import { StorageProvider } from 'contexts/StorageContext';
import { ReccsProvider } from 'contexts/ReccsContext';

export default function App({ Component, pageProps }) {
  return <>
    <Header />
    <div className='pagePadding'>
      <StorageProvider>
        <ReccsProvider>
          <Component {...pageProps} />
        </ReccsProvider>
      </StorageProvider>
      <Analytics />
    </div>
  </>;
}
