import React, { useState } from 'react';
import cx from 'classnames';

import CustomImage from 'components/utils/CustomImage';

import styles from './style.module.scss';

function MobileNavigation() {
  const [isHidden, setIsHidden] = useState(true);
  const onClickHamburger = () => setIsHidden(!isHidden);

  return (
    <nav>
      <CustomImage
        className={styles['hamburger']}
        src="/utils/hamburger.svg"
        alt="hamburger"
        layout="fill"
        width="32px"
        height="32px"
        onClick={onClickHamburger}
        aria-label="Open menu"
      />
      <div
        className={cx(styles['mobile_menu'], {
          [styles['is_hidden']]: isHidden,
        })}
      >
        <ul className={styles['mobile_menu_nav']}>
          <CustomImage
            className={cx(styles['hamburger'], styles['close'])}
            src="/utils/close.svg"
            alt="close"
            layout="fill"
            width="24px"
            height="24px"
            onClick={onClickHamburger}
          />
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
      </div>
    </nav>
  );
}

export default MobileNavigation;
