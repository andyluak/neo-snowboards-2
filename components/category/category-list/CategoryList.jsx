import { useRouter } from 'next/router';
import React from 'react';
import cx from 'classnames';

import CreativeImage from 'components/creative/creative-image/CreativeImage';
import Button from 'components/utils/button/Button';

import s from './style.module.scss';

function CategoryList({ products, category, categoryType }) {
    return (
        <>
            <p className={cx('capitalize', s['category_list_title'])}>
                {`${category.category_name} ${categoryType}`}
            </p>
            <div className={s['category_list']}>
                <Button
                    variant="tertiary"
                    value="See All"
                    link={`/shop/${categoryType}/${category.category_name}`}
                    hasLink={true}
                />
                {products.map((product) => {
                    return (
                        <CreativeImage
                            title={product.product_name}
                            key={product.id}
                            image={`/images/${categoryType}/${category.category_name}/${product.image}`}
                            alt={product.product_name}
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
