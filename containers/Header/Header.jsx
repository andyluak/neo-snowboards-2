import React from 'react';
import Image from 'next/image';

import CustomImage from 'components/utils/CustomImage';
import Navigation from 'components/navigation/Navigation';
import useDeviceSize from 'utils/hooks/useDeviceSize';

import styles from './style.module.scss';

function Header() {
  const [width, height] = useDeviceSize();
  const isMobile = width < 768;
  return (
    <header className={styles['header']}>
      <div className={styles['header_logo_container']}>
        <Image src="/logo.svg" alt="Snowboard Shop" layout="fill" />
      </div>

      <Navigation isMobile={isMobile} />
      {!isMobile && (
        <div className={styles['header_actions']}>
          <a href="#">Sign In</a>
          <CustomImage src="/utils/heart.svg" alt="favorites" layout="fill" width="24px" height="24px" />
          <CustomImage src="/utils/basket.svg" alt="cart" layout="fill" width="24px" height="24px" />
        </div>
      )}
    </header>
  );
}

export default Header;
