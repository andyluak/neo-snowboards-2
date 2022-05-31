import prisma from '/lib/prisma';

export default async function handler(req, res) {
    // get all distinct brand names based from category
    const brandNames = await prisma.products.findMany({
        select: {
            brand: true,
            categories: {
                where: {
                    category_name: {
                        contains: 'snowboards',
                    },
                },
            },
        },
        distinct: ['brand'],
    });

    //   const groupBrandNames = await prisma.products.groupBy({
    //     by: ['brand'],
    //     _count: {
    //       _all: true,
    //       brand: true,
    //     },
    //   });

    res.status(200).json(brandNames);
}
