import { useRouter } from 'next/router';
import { getAccessTokenCookie } from 'utils/sessionStorageUtils';
import Button from 'components/UserInput/Button/Button';
import React, { useState, useContext, useEffect } from 'react';
import styles from './index.module.scss';
import TrackCard from 'components/cards/TrackCard/TrackCard';
import Link from 'next/link';
import { SearchContext, SearchProvider } from 'contexts/SearchContext';
import { ReccsContext } from 'contexts/ReccsContext';
import { StorageContext } from 'contexts/StorageContext';
import SearchCard from './SearchCard/SearchCard';

const SearchPage = () => {
  return (
    <SearchProvider>
      <SearchPageWithProvider />
    </SearchProvider>
  );
};

const SearchPageWithProvider = () => {
  const { isLoadingSearch, fetchSearch, searchedTracks, searchQuery } = useContext(SearchContext);
  const { isLoadingReccs, reccTracks, fetchTrackReccsFromSearch } = useContext(ReccsContext);
  const { selectedTracks } = useContext(StorageContext);
  const [token, setToken] = useState('');
  const [searchSelectedTracks, setSearchSelectedTracks] = useState([]);
  const router = useRouter();
  const { q } = router.query;

  const handleTrackSelect = (isSelected, track) => {
    track.isSelected = isSelected;
    let newSelectedTracks = [...searchSelectedTracks];

    if (isSelected) {
      newSelectedTracks.push(track);
    } else {
      const indexToRemove = newSelectedTracks.findIndex(t => t.id === track.id);
      if (indexToRemove !== -1) {
        newSelectedTracks.splice(indexToRemove, 1);
      }
    }

    console.log('newSelectedTracks: ', newSelectedTracks);
    setSearchSelectedTracks(newSelectedTracks);
  };

  useEffect(() => {
    if (reccTracks?.length < 1 || selectedTracks?.length < 1) {
      // TODO: display no recommendations found message
      console.log('no recommendations found');
      return;
    }
    router.push('/recommendations');
  }, [reccTracks]);

  useEffect(() => {
    async function getToken() {
      let token = getAccessTokenCookie();
      if (!token) {
        await fetch('/auth/token');
        token = getAccessTokenCookie();
      }
      if (token) setToken(token);
    }
    getToken();
  }, []);

  useEffect(() => {
    console.log('q: ', q);
    if (q) fetchSearch(q);
  }, [q]);

  return (
    <div className={styles.screenWrapper}>
      {token === '' && <Login />}
      <SearchCard />
      {searchedTracks.length > 0 &&
        <div className={styles.screenWrapper}>
          <div className={styles.searchTracks}>
            {(searchedTracks || []).map((track, key) => {
              return (
                <TrackCard key={key} track={track} onSelect={(e) => handleTrackSelect(e, track)} />
              );
            })}
          </div>
          <div className={styles.bottomButtons}>
            <Button text={'More Results'} isLoading={isLoadingSearch} onClick={async () => await fetchSearch(searchQuery, 'next')} />
            <Button text={'Recommend'} isLoading={isLoadingReccs} onClick={async () => await fetchTrackReccsFromSearch(searchSelectedTracks)} disabled={searchSelectedTracks.length < 1} />
          </div>
        </div>}
      <Button type={'primary'} text={'About'} onClick={() => router.push('/about')} />
    </div>
  );
};

const Login = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Link href={'http://localhost:5000/auth/login'}>
          Login with Spotify
        </Link>
      </header>
    </div>
  );
};

export default SearchPage;