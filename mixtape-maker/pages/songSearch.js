import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Card from '../components/cards/Card/Card';
import Button from '../components/Button/Button';
import TextInput from '../components/TextInput/TextInput';
import styles from '../styles/songSearch.module.scss';

const SongSearchPage = () => {

  const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>;

  const [isMobile, setIsMobile] = useState(false);
  const [inputSongTitle, setInputSongTitle] = useState('');

  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobile(window.innerWidth < 1150);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  return (
    <Card >
      penis
      <Button type={'tertiary'} text={"also penis"} />
      <TextInput
        rowNumber={1}
        required
        autocorrect
        type={'tertiary'}
        placeHolder={'Enter Song Title'}
        onChange={(e => {console.log(`e Object: ${JSON.stringify(e)}`)})}
      />
    </Card>
  )
};

export default SongSearchPage;