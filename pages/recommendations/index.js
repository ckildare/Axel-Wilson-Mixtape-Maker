import React, { useContext, useEffect } from 'react';
import styles from './index.module.scss';
import Button from 'components/UserInput/Button/Button';
import { useRouter } from 'next/router';
import { ReccsContext } from 'contexts/ReccsContext';
import { StorageContext } from 'contexts/StorageContext';
import TrackView from 'components/TrackView/TrackView';

const RecommendationsPage = () => {
  const { selectedTracks } = useContext(StorageContext);
  const {
    fetchTrackReccs,
    reccTracks,
    isLoadingReccs,
    selectedSeeds,
    selectSeed
  } = useContext(ReccsContext);
  const router = useRouter();

  const handleFinish = () => {
    router.push('/result');
  };

  useEffect(() => {
    if (selectedTracks.length < 1) router.push('/');
  }, []);

  return (
    <div className={styles.screenWrapper}>
      <TrackView
        tracks={reccTracks}
        isLoading={isLoadingReccs}
        handleTrackSelect={(isSelected, track) => selectSeed(isSelected, track)}
      />
      <div className={styles.bottomButtons}>
        <Button text={'Recommend'} type={'primary'} isLoading={isLoadingReccs} onClick={async () => await fetchTrackReccs()} disabled={selectedSeeds.length < 1 || selectedTracks.length > 15} />
        <Button text={'Finish'} onClick={() => handleFinish()} />
      </div>
    </div >
  );
};

export default RecommendationsPage;