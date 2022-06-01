import prisma from '/lib/prisma';

export const getBrandsByType = async (type, gender) => {
    const brandNames = await prisma.products.findMany({
        select: {
            brand: true,
        },
        where: {
            categories: {
                every: {
                    category_name: { in: [type, gender] },
                },
            },
        },
        distinct: ['brand'],
    });
    return brandNames;
};

export const getSizesByValue = async (type, gender) => {
    const sizes = await prisma[type].findMany({
        select: {
            sizes: true,
        },
        distinct: ['sizes'],
        where: {
            product: {
                categories: {
                    every: {
                        category_name: { in: [type, gender] },
                    },
                },
            },
        },
    });

    if (type !== 'snowboards') return sizes;

    // convert all sizes from string to int and remove duplicates
    const formattedSizes = sizes.reduce((prev, curr) => {
        const sizes = curr.sizes.split(',');
        const formattedSizes = sizes.map((size) => {
            return parseInt(size);
        });
        return [...prev, ...formattedSizes];
    }, []);

    const uniqueSizes = [...new Set(formattedSizes)];
    return uniqueSizes;
};

export const getMinMaxPriceByType = async (type, gender) => {
    const minPrice = await prisma.products.findMany({
        where: {
            categories: {
                every: {
                    category_name: { in: [type, gender] },
                },
            },
        },
        orderBy: {
            price: 'asc',
        },
        take: 1,
        select: {
            price: true,
        },
    });

    const maxPrice = await prisma.products.findMany({
        where: {
            categories: {
                every: {
                    category_name: { in: [type, gender] },
                },
            },
        },
        orderBy: {
            price: 'desc',
        },
        take: 1,
        select: {
            price: true,
        },
    });

    const minMaxPrice = {
        minPrice: minPrice[0].price,
        maxPrice: maxPrice[0].price,
    };

    return minMaxPrice;
};
