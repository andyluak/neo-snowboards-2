import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import ProductImage from '../ProductImage/ProductImage';
import ProductDetails from '../ProductDetails/ProductDetails';
import CustomImage from 'components/utils/CustomImage';

import s from './style.module.scss';

function ProductWrapper({ product }) {
    const { image, product_name, price } = product;
    const router = useRouter();
    const { type, gender } = router.query;
    const stringGender = gender[0];
    const hasDiscount = false;
    return (
        <div className={s['products_product_wrapper']}>
            <div className={s['product_image_wrapper']}>
                <Image
                    src={`/images/${type}/${stringGender}/${image}`}
                    alt={product_name}
                    width={300}
                    height={300}
                    className={s['product_image']}
                />
                <div className={s['product_image_header']}>
                    <span className={s['product_image_header_discount']}>
                        NO
                    </span>
                    <CustomImage
                        src="/utils/black_heart.svg"
                        alt="favorites"
                        layout="fill"
                        width="24px"
                        height="24px"
                    />
                </div>
            </div>
            <div
                className={s['product_product_wrapper_details']}
                style={{ maxWidth: '275px' }}
            >
                <h4 className={s['product_details_name']}>{product_name}</h4>
                <p className={s['product_details_price']}>${price}</p>
            </div>
        </div>
    );
}

export default ProductWrapper;
