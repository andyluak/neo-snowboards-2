import React from 'react';
import Link from 'next/link';

import CustomImage from 'components/utils/CustomImage';
import Button from 'components/utils/button/Button';

import s from './style.module.scss';

function CartIcon({ cartItems, cartTotalQuantity, cartTotal }) {
    const [isCartOpen, setIsCartOpen] = React.useState(false);
    return (
        <div className={s['cart_container']}>
            <span className={s['cart_quantity']}>{cartTotalQuantity}</span>
            <CustomImage
                src="/utils/basket.svg"
                alt="cart"
                layout="fill"
                width="28px"
                height="28px"
                onClick={() => setIsCartOpen(!isCartOpen)}
            />
            {isCartOpen && (
                <div className={s['cart_items_container']}>
                    {cartTotalQuantity === 0 ? (
                        <div className={s['cart_empty']}>
                            <p>Cart Empty</p>
                            <Link href="/">
                                <a onClick={() => setIsCartOpen(false)}>
                                    Go home
                                </a>
                            </Link>
                        </div>
                    ) : (
                        <>
                            {cartItems.map(({ product }, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <div className={s['cart_item']}>
                                            <span>{product.product_name}</span>
                                            <span>{product.price}</span>
                                        </div>
                                    </React.Fragment>
                                );
                            })}
                            <div className={s['cart_total']}>
                                <p className={s['cart_subtotal']}>
                                    Subtotal: ${cartTotal}
                                </p>
                                <Button
                                    className={s['creative_image_button']}
                                    value={'Go to cart'}
                                    icon="/utils/chevron-right.svg"
                                    hasLink={true}
                                    link={`/checkout/cart`}
                                    onClick={() => setIsCartOpen(!isCartOpen)}
                                />
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default CartIcon;
