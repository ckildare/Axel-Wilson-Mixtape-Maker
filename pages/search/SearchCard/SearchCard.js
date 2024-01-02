import { useRouter } from 'next/router';
import TextInput from 'components/UserInput/TextInput/TextInput';
import styles from './SearchCard.module.scss';
import React, { useContext } from 'react';
import ToggleSwitch from 'components/UserInput/ToggleSwitch/ToggleSwitch';
import Button from 'components/UserInput/Button/Button';
import { SearchContext } from 'contexts/SearchContext';

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
      <Button
        isLoading={isLoadingSearch}
        type={'tertiary'}
        text={'Search'}
        onClick={async () => router.push(`/search${mapSearchParams(searchQuery)}`)}
      />
    </div>
  );
};

export default SearchCard;