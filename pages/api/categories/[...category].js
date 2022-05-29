import prisma from '/lib/prisma';

export default async function handler(req, res) {
  const categoryName = req.query.category[0];
  const categoriesToInclude = ['men', 'women', 'kids'];

  const menProductsByCategory = await prisma.products.findMany({
    where: {
      categories: {
        every: {
          category_name: { in: [categoryName, 'men'] },
        },
      },
    },
    take: 4,
    include: {
      categories: true,
    },
  });

  const womenProductsByCategory = await prisma.products.findMany({
    where: {
      categories: {
        every: {
          category_name: { in: [categoryName, 'women'] },
        },
      },
    },
    take: 4,
    include: {
      categories: true,
    },
  });

  const kidsProductsByCategory = await prisma.products.findMany({
    where: {
      categories: {
        every: {
          category_name: { in: [categoryName, 'kids'] },
        },
      },
    },
    take: 4,
    include: {
      categories: true,
    },
  });

  res.status(200).json({
    menProductsByCategory,
    womenProductsByCategory,
    kidsProductsByCategory,
  });
}
