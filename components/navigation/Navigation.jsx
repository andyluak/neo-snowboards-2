import Link from 'next/link';
import React from 'react';

import MobileNavigation from './mobile-navigation/MobileNavigation';
import { navItems } from '/config/navItems';

import styles from './style.module.scss';

function Navigation({ isMobile }) {
  if (isMobile) {
    return <MobileNavigation />;
  }

  return (
    <nav className={styles['navigation']}>
      <ul>
        {navItems.map(({ name, url }) => (
          <li key={name}>
            <Link href={`/categories${url}`}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
