import Head from 'next/head';
import SongSearchPage from './songSearch.js';

const Index = () => {
  return (
    <>
      <Head>
        <title>Axel Wilson's Mixtape Maker</title>
        <meta name="description" content="Music recommendation web app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Axel Wilson, Rylen lanning, Elijah Smith, AJ Richerson, Hamdan Anwar, Connor Kildare, Music Recommendation, Recommendation, Music, Spotify API, Mixtape, Mixtape Maker, Playlist Maker, Playlist, Playlist Generator" />
        <meta name="author" content="Rylen lanning, Elijah Smith, AJ Richerson, Hamdan Anwar, Connor Kildare" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SongSearchPage />
      </main>
    </>
  )
}

export default Index;
