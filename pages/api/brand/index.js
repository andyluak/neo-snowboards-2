import prisma from '/lib/prisma';
import { getBrandsByType } from '/utils/filters/getFilterValue';

export default async function handler(req, res) {
    // get the snowboards count for each brand
    let brandsWithCount = await prisma.products.groupBy({
        by: ['brand'],
        where: {
            categories: {
                every: {
                    category_name: { in: ['snowboards', 'men'] },
                },
            },
        },
        _count: true,
    });

    res.status(200).json(brandsWithCount);
}
