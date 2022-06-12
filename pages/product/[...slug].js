import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import Image from 'next/image';

import MainLayout from '/components/layouts/main-layout/MainLayout.jsx';
import QuantitySelector from 'components/utils/QuantitySelector/QuantitySelector';

import getStore from '/redux/store';
import {
    setSize,
    selectQuantity,
    selectProduct,
    selectSize,
    incrementQuantity,
    decrementQuantity,
    setQuantity,
    getProduct,
} from 'redux/slices/productSlice';

import { addToCart } from 'redux/slices/cartSlice';

import s from '/styles/product.module.scss';

function ProductPage() {
    const [error, setError] = React.useState(false);
    const dispatch = useDispatch();
    const product = useSelector(selectProduct);
    const size = useSelector(selectSize);
    const quantity = useSelector(selectQuantity);
    const { image, product_name, price } = product;

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
                                {sizes.map((mapSize, i) => {
                                    return (
                                        <button
                                            className={cx({
                                                [s['selected']]: size === mapSize, //prettier-ignore
                                            })}
                                            onClick={() =>
                                                dispatch(setSize(mapSize))
                                            }
                                            key={i}
                                            value={mapSize}
                                        >
                                            {mapSize}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className={s['product_action_quantity']}>
                            <p>Quantity</p>
                            <QuantitySelector
                                quantity={quantity}
                                onIncrement={() =>
                                    dispatch(incrementQuantity())
                                }
                                onDecrement={() =>
                                    dispatch(decrementQuantity())
                                }
                                onSetQuantity={(e) =>
                                    dispatch(setQuantity(e.target.value))
                                }
                            />
                        </div>

                        <div className={s['product_action_add_to_cart']}>
                            <button
                                onClick={() => {
                                    // verify if size is selected
                                    if (!size) {
                                        setError('Please select a size');
                                        return;
                                    }
                                    setError(false);
                                    dispatch(
                                        addToCart({ product, quantity, size })
                                    );
                                }}
                            >
                                Add To Cart
                            </button>
                            {error && (
                                <p
                                    className="error"
                                    role="alert"
                                    aria-live="polite"
                                >
                                    {error}
                                </p>
                            )}
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
