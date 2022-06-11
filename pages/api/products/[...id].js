import prisma from '/lib/prisma';

export default async function handler(req, res) {
    const { id } = req.query;
    const { type } = JSON.parse(req.body);

    const product = await prisma.products.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            [type]: true,
        },
    });

    res.status(200).json(product);
}
