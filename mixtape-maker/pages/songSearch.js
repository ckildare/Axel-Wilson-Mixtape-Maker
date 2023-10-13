import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Card from '../components/cards/Card/Card';
import styles from '../styles/songSearch.module.scss';

const SongSearchPage = () => {

  const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>;

  const [isMobile, setIsMobile] = useState(false);

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
    <Card>
      penis
    </Card>
  )
};

export default SongSearchPage;