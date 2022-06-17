import React from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';

import MainLayout from '/components/layouts/main-layout/MainLayout';
import CategoryList from '/components/category/category-list/CategoryList';

import { server } from 'config';

import s from '/styles/Category.module.scss';

function CategoryType({ category, productsByCategory }) {
    const router = useRouter();
    const categoryType = router.query.category[0];
    return (
        <section className={s['category_page']}>
            <h1 className={cx('capitalize', s['category_page_title'])}>
                {category}
            </h1>
            {Object.keys(productsByCategory).map((key, index) => {
                return (
                    <CategoryList
                        key={index}
                        products={productsByCategory[key]}
                        category={productsByCategory[key][0]['categories'][1]}
                        categoryType={categoryType}
                    />
                );
            })}
        </section>
    );
}

CategoryType.getLayout = (page) => {
    return <MainLayout category={page.props.category}>{page}</MainLayout>;
};

export async function getServerSideProps(context) {
    const categoryType = context.params.category[0];
    const res = await fetch(`${server}/api/categories/${categoryType}`);

    const data = await res.json();
    return {
        props: {
            productsByCategory: data,
            category: categoryType,
        },
    };
}

export default CategoryType;
