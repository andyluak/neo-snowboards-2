import React from 'react';
import MobileNavigation from './mobile-navigation/MobileNavigation';

import styles from './style.module.scss';

function Navigation({ isMobile }) {
  if (isMobile) {
    return <MobileNavigation />;
  }
  return (
    <nav className={styles['navigation']}>
      <ul>
        <li>
          <a href="#">Snowboards</a>
        </li>
        <li>
          <a href="#">Boots</a>
        </li>
        <li>
          <a href="#">Bindings</a>
        </li>
        <li>
          <a href="#">Accesories</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
