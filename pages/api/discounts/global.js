import prisma from '/lib/prisma';

export default async function handler(req, res) {
    const globalDiscounts = await prisma.discounts.findMany({
        select: { id: true, name: true, discount_percentage: true },
        where: {
            isGlobal: {
                equals: true,
            },
        },
    });

    res.status(200).json({
        globalDiscounts,
    });
}
