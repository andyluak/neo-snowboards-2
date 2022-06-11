import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import Image from 'next/image';

import { server } from '/config';
import MainLayout from '/components/layouts/main-layout/MainLayout.jsx';
import Button from 'components/utils/button/Button';

import getStore from '/redux/store';
import {
    setSize,
    selectQuantity,
    selectProduct,
    selectSize,
    incrementQuantity,
    decrementQuantity,
    getProduct,
} from 'redux/slices/productSlice';

import s from '/styles/product.module.scss';

function ProductPage() {
    const dispatch = useDispatch();
    const setProductSize = (size) => {
        dispatch(setSize(size));
    };
    const product = useSelector(selectProduct);
    const selectedSize = useSelector(selectSize);
    const selectedQuantity = useSelector(selectQuantity);
    const { image, brand, product_name, price } = product;

    const router = useRouter();
    const { type, gender } = router.query;
    const sizes = product[type][0].sizes.split(' ');

    const imageUrl = `/images/${type}/${gender}/${image}`;

    return (
        <section>
            <div className={s['product_grid']}>
                <div className={s['product_column']}>
                    <div className={s['product_image']}>
                        <Image
                            src={imageUrl}
                            alt={product_name}
                            layout={'fill'}
                        />
                    </div>
                </div>
                <div className={s['product_column']}>
                    <div className={s['product_info']}>
                        <h1 className={s['product_title']}>{product_name}</h1>
                        <p>SKU NEO{product.id}</p>
                        <p className={s['product_price']}>${price}</p>
                    </div>

                    <div className={s['product_actions']}>
                        <div className={s['product_action_size']}>
                            <p>Size</p>
                            <div className={s['product_sizes']}>
                                {sizes.map((size, i) => {
                                    return (
                                        <button
                                            className={cx({
                                                [s['selected']]: selectedSize === size, //prettier-ignore
                                            })}
                                            onClick={() =>
                                                dispatch(setSize(size))
                                            }
                                            key={i}
                                            value={size}
                                        >
                                            {size}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className={s['product_action_quantity']}>
                            <p>Quantity</p>
                            <div className={s['product_quantity']}>
                                <span
                                    onClick={() =>
                                        dispatch(decrementQuantity())
                                    }
                                >
                                    -
                                </span>
                                <input
                                    type="text"
                                    value={selectedQuantity}
                                    onChange={() => {}}
                                />
                                <span
                                    onClick={() =>
                                        dispatch(incrementQuantity())
                                    }
                                >
                                    +
                                </span>
                            </div>
                        </div>

                        <div className={s['product_action_add_to_cart']}>
                            <button>Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s['product_description']}>
                <h2>Product Details</h2>
                <p>{product.description}</p>
            </div>
        </section>
    );
}

ProductPage.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps(context) {
    const { id, type } = context.query;
    const store = getStore();

    await store.dispatch(getProduct({ id, type }));

    return {
        props: {
            initialState: store.getState(),
        },
    };
}

export default ProductPage;
