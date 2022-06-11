import { useRouter } from 'next/router';
import React from 'react';
import cx from 'classnames';

import CustomImage from '/components/utils/CustomImage';
import CreativeImage from '/components/creative/creative-image/CreativeImage';
import Button from '/components/utils/button/Button';

import s from './style.module.scss';

function CategoryList({ products, category }) {
    const router = useRouter();
    const currentCategory = router.query.category[0];
    return (
        <>
            <p className={cx('capitalize', s['category_list_title'])}>
                {`${category.category_name} ${currentCategory}`}
            </p>
            <div className={s['category_list']}>
                <Button
                    variant="tertiary"
                    value="See All"
                    link={`/shop/${currentCategory}/${category.category_name}`}
                    hasLink={true}
                />
                {products.map((product) => {
                    return (
                        <CreativeImage
                            title={product.product_name}
                            key={product.id}
                            image={`/images/${currentCategory}/${category.category_name}/${product.image}`}
                            alt={product.name}
                            width="150px"
                            height="200px"
                            className={s['category_list_item']}
                            buttonText="Shop Now"
                            buttonLink={`/product/${product.id}`}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default CategoryList;
