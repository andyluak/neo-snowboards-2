import React from 'react';

import MainLayout from '/components/layouts/main-layout/MainLayout';
import CategoryList from '/components/category/category-list/CategoryList';

import { server } from '/config';

function CategoryType({ category, productsByCategory }) {
  return (
    <section>
      <h1 className="capitalize">{category}</h1>
      {Object.keys(productsByCategory).map((key, index) => {
        return (
          <CategoryList
            key={index}
            products={productsByCategory[key]}
            category={productsByCategory[key][0]['categories'][1]}
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
