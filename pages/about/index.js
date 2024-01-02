import React from 'react';
import { useRouter } from 'next/router';
// import Image from 'next/image';
import styles from './index.module.scss';
import Button from 'components/UserInput/Button/Button';
// import axelWilson from 'public/images/axel.png';
import retro from 'public/images/retro.jpg';
import Card from 'components/Card/Card';

const AboutPage = () => {
  const router = useRouter();

  return (
    <div className={styles.screenWrapper}>
      <Card style={{ background: retro}} className={styles.axelCard}>
        {/* <Image priority src={axelWilson} className={styles.axel} alt={'Photo of website mascot, Axel Wilson.'} /> */}
        <div className={styles.axelInfo}>
          ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultrices, nunc nunc a eros. mus dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultrices, nunc nunc a eros.
        </div>
      </Card>
      <Button type={'primary'} text={'Back To Search'} onClick={() => router.push('/')} />
    </div>
  );
};

export default AboutPage;