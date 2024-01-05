import { useRouter } from 'next/router';
import TextInput from 'components/UserInput/TextInput/TextInput';
import styles from './SearchCard.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import ToggleSwitch from 'components/UserInput/ToggleSwitch/ToggleSwitch';
import Button from 'components/UserInput/Button/Button';
import { SearchContext } from 'contexts/SearchContext';
import { StorageContext } from 'contexts/StorageContext';

const SearchCard = () => {
  const {
    isLoadingSearch,
    mapSearchParams,
    setIsTitleSearch,
    isTitleSearch,
    searchQuery,
    setSearchQuery
  } = useContext(SearchContext);
  const router = useRouter();
  const [token, setToken] = useState('');
  const { getAccessToken } = useContext(StorageContext);

  const getToken = async () => {
    await fetch('/auth/token');
    const token = getAccessToken();
    if (token) setToken(token);
  };

  useEffect(() => { getToken(); }, []);

  useEffect(() => {
    console.log('token', token);
  }, [token]);

  return (
    <div className={styles.searchCard}>
      <div className={styles.topRow}>
        <div className={styles.searchText}>Search for songs by</div>
        <ToggleSwitch
          className={styles.seedSettingPill}
          handleToggle={(isOn) => setIsTitleSearch(!isOn)}
          onText={'Artist'}
          offText={'Title'}
          name={'artistOrTitle'}
        />
      </div>
      <TextInput
        rowNumber={1}
        required
        autocorrect
        type={'tertiary'}
        placeHolder={`Enter the song${isTitleSearch ? ' title' : '\'s artist'}...`}
        onChange={(e) => setSearchQuery(e)}
      />
      <div className={styles.searchButton}>
        <Button
          isLoading={isLoadingSearch}
          type={'tertiary'}
          text={'Search'}
          onClick={async () => router.push(`/search${mapSearchParams(searchQuery)}`)}
        />
        <Button
          isLoading={isLoadingSearch}
          type={'tertiary'}
          text={'Login with Spotify'}
          onClick={async () => await getToken()}
        />
      </div>
    </div>
  );
};

export default SearchCard;