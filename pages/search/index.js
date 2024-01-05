import { useRouter } from 'next/router';
import Button from 'components/UserInput/Button/Button';
import React, { useContext, useEffect } from 'react';
import styles from './index.module.scss';
import { SearchContext, SearchProvider } from 'contexts/SearchContext';
import { ReccsContext } from 'contexts/ReccsContext';
import { StorageContext } from 'contexts/StorageContext';
import SearchCard from './SearchCard/SearchCard';
import TrackView from 'components/TrackView/TrackView';

const SearchPage = () => {
  return (
    <SearchProvider>
      <SearchPageWithProvider />
    </SearchProvider>
  );
};

const SearchPageWithProvider = () => {
  const { 
    isLoadingSearch, 
    fetchSearch, 
    searchedTracks, 
    page 
  } = useContext(SearchContext);

  const { 
    isLoadingReccs, 
    reccTracks, 
    fetchTrackReccs, 
    selectSeed, 
    selectedSeeds, 
    setSelectedSeeds 
  } = useContext(ReccsContext);

  const { selectedTracks } = useContext(StorageContext);
  const router = useRouter();
  const { q } = router.query;

  useEffect(() => {
    if (reccTracks?.length < 1 || selectedTracks?.length < 1) {
      // TODO: display no recommendations found message
      console.log('no recommendations found');
      return;
    }
    router.push('/recommendations');
  }, [reccTracks]);

  useEffect(() => { if (q) fetchSearch(0); }, [q]);
  useEffect(() => { setSelectedSeeds([]); }, [isLoadingSearch]);

  return (
    <div className={styles.screenWrapper}>
      <SearchCard />
      {searchedTracks.length > 0 &&
        <div className={styles.screenWrapper}>
          <TrackView
            tracks={searchedTracks}
            isLoading={isLoadingSearch}
            handleTrackSelect={(isSelected, track) => selectSeed(isSelected, track)}
            handlePaginate={async (updatedPage) => await fetchSearch(updatedPage)}
            pageNumber={page}
          />
          <div className={styles.bottomButtons}>
            <Button text={'Recommend'} isLoading={isLoadingReccs} onClick={async () => await fetchTrackReccs()} disabled={selectedSeeds.length < 1} />
          </div>
        </div>}
      <Button type={'primary'} text={'About'} onClick={() => router.push('/about')} />
    </div>
  );
};

export default SearchPage;