import React, { useContext, useEffect } from 'react';
import styles from './index.module.scss';
import TrackCard from 'components/cards/TrackCard/TrackCard';
import Button from 'components/UserInput/Button/Button';
import { useRouter } from 'next/router';
import Loader from 'components/Loader/Loader';
import { ReccsContext } from 'contexts/ReccsContext';
import { StorageContext } from 'contexts/StorageContext';

const RecommendationsPage = () => {
  const { selectedTracks } = useContext(StorageContext);
  const { fetchTrackReccs, reccTracks, isLoadingReccs, selectedSeeds, selectSeed } = useContext(ReccsContext);
  const router = useRouter();

  const handleFinish = () => {
    router.push('/result');
  };

  useEffect(() => {
    if (selectedTracks.length < 1) router.push('/');
  }, []);

  return (
    <div className={styles.screenWrapper}>
      <div className={styles.tracks}>
        {(reccTracks || []).map((track, key) => {
          return (
            <div key={key}>
              <Loader isLoading={isLoadingReccs}>
                <TrackCard track={track} onSelect={(e) => selectSeed(e, track)} />
              </Loader>
            </div>
          );
        })}
      </div>
      <div className={styles.bottomButtons}>
        <Button text={'Recommend'} type={'primary'} isLoading={isLoadingReccs} onClick={async () => await fetchTrackReccs(selectedSeeds)} disabled={selectedSeeds.length < 1 || selectedTracks.length > 15} />
        <Button text={'Finish'} onClick={() => handleFinish()} />
      </div>
    </div >
  );
};

export default RecommendationsPage;