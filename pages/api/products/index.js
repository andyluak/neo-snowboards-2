import prisma from '/lib/prisma';

export default async function handler(req, res) {
    const { type, gender } = JSON.parse(req.body);

    const getProductsByType = await prisma.products.findMany({
        include: {
            [type]: true,
        },
        where: {
            categories: {
                every: {
                    category_name: { in: [type, gender[0]] },
                },
            },
        },
        take: 10,
    });

    res.status(200).json({ getProductsByType });
}
