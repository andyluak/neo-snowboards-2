import React from 'react';

import ProductWrapper from 'components/Products/ProductWrapper/ProductWrapper';

import s from './style.module.scss';

function Products({ products }) {
    return (
        <section className={s['products_section']}>
            {products.map((product, index) => {
                return <ProductWrapper key={index} product={product} />;
            })}
        </section>
    );
}

export default Products;
