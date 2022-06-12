import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import CustomImage from 'components/utils/CustomImage';
import CartIcon from 'components/Cart/CartIcon/CartIcon';
import Navigation from 'components/navigation/Navigation';
import useDeviceSize from 'utils/hooks/useDeviceSize';

import {
    selectCartTotalQuantity,
    selectCartItems,
    selectCartTotal,
} from 'redux/slices/cartSlice';

import styles from './style.module.scss';

const Header = () => {
    const [width, height] = useDeviceSize();
    const isMobile = width < 768;
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    return (
        <header className={styles['header']}>
            <div className={styles['header_logo_container']}>
                <Link href="/" passHref>
                    <a>
                        <Image
                            src="/logo.svg"
                            alt="Snowboard Shop"
                            layout="fill"
                        />
                    </a>
                </Link>
            </div>

            <Navigation isMobile={isMobile} />
            {!isMobile && (
                <div className={styles['header_actions']}>
                    <a href="#">Sign In</a>
                    <CustomImage
                        src="/utils/heart.svg"
                        alt="favorites"
                        layout="fill"
                        width="28px"
                        height="28px"
                    />
                    <CartIcon
                        cartItems={cartItems}
                        cartTotalQuantity={cartTotalQuantity}
                        cartTotal={cartTotal}
                    />
                </div>
            )}
        </header>
    );
};

export default Header;
