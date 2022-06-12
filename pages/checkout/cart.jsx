import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import MainLayout from '/components/layouts/main-layout/MainLayout.jsx';
import QuantitySelector from 'components/utils/QuantitySelector/QuantitySelector';
import Button from 'components/utils/button/Button';

import s from 'styles/cart.module.scss';

import getStore from 'redux/store';
import {
    selectCartTotalQuantity,
    selectCartItems,
    selectCartTotal,
    selectGlobalDiscounts,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    setQuantity,
    getGlobalDiscounts,
    setDiscountCode,
} from 'redux/slices/cartSlice';

function CartPage() {
    const dispatch = useDispatch();
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    const globalDiscounts = useSelector(selectGlobalDiscounts);
    console.log(globalDiscounts);

    const [discountCode, setDiscountCodeInput] = React.useState('');
    const [discountError, setDiscountError] = React.useState('');

    const handleApplyDiscountCode = () => {
        if (discountCode.length === 0) return;

        let isValidCode =
            globalDiscounts.find(
                (discount) => discount.name === discountCode
            ) || false;

        isValidCode
            ? dispatch(setDiscountCode(isValidCode.discount_percentage))
            : setDiscountError('Invalid discount code');
        setDiscountCode('');
    };
    if (cartItems.length === 0) {
        return (
            <section className={s['cart']}>
                <h1>You don't have any items</h1>
                <Link href="/">Go to the shop</Link>
            </section>
        );
    }

    return (
        <section className={s['cart']}>
            <h1>
                Your Shopping Cart <span>{cartTotalQuantity} items</span>
            </h1>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th className={s['price_col']}>Price</th>
                        <th className={s['quantity_col']}>Quantity</th>
                        <th className={s['total_col']}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <div className={s['cart_item_info']}>
                                        <div
                                            className={
                                                s['cart_item_info_details']
                                            }
                                        >
                                            <h2>{item.product.product_name}</h2>
                                            <p>
                                                SKU:
                                                <span>
                                                    NEO{item.product.id}
                                                </span>
                                            </p>
                                            <p>
                                                Size: <span>{item.size}</span>
                                            </p>
                                        </div>
                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    removeFromCart({
                                                        product: item.product,
                                                        quantity: item.quantity,
                                                    })
                                                )
                                            }
                                            className={s['remove_item']}
                                        >
                                            Remove Item
                                        </button>
                                    </div>
                                </td>
                                <td>${item.product.price}</td>
                                <td>
                                    <QuantitySelector
                                        onIncrement={() =>
                                            dispatch(incrementQuantity(item))
                                        }
                                        onDecrement={() =>
                                            dispatch(decrementQuantity(item))
                                        }
                                        onSetQuantity={(e) =>
                                            dispatch(
                                                setQuantity({
                                                    product: item.product,
                                                    quantity: e.target.value,
                                                })
                                            )
                                        }
                                        quantity={item.quantity}
                                    />
                                </td>
                                <td>
                                    $
                                    {(
                                        item.quantity * item.product.price
                                    ).toFixed(2)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className={s['cart_total']}>
                <h2>Subtotal: ${cartTotal}</h2>
                <div className={s['discount']}>
                    <span>Have a discount code ?</span>
                    <div className={s['code_input']}>
                        <label>Enter Code</label>
                        <input
                            type="text"
                            value={discountCode}
                            onChange={(e) =>
                                setDiscountCodeInput(e.target.value)
                            }
                        />
                        <Button
                            variant={'secondary'}
                            value={'Apply'}
                            onClick={handleApplyDiscountCode}
                        />
                    </div>
                </div>
                <Button
                    variant="primary"
                    value="Checkout Now"
                    link={`/checkout/delivery`}
                    icon="/utils/chevron-right.svg"
                    hasLink={true}
                />
            </div>
        </section>
    );
}

CartPage.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps(context) {
    const store = getStore();
    const globalDiscounts = await store.dispatch(getGlobalDiscounts());

    return {
        props: {
            initialState: store.getState(),
        },
    };
}

export default CartPage;
