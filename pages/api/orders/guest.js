import prisma from '/lib/prisma';

export default async function handler(req, res) {
    const { isGuestSession } = req.cookies;
    if (!isGuestSession) return res.status(404).send('Not found');

    const { first_name, last_name, delivery_adress, phone_number, email } =
        req.body;
    const { cartItems, subtotal, total, totalQuantity } = req.body;
    const { payment_method } = req.body;

    const order = await prisma.orderDetails.create({
        data: {
            first_name,
            last_name,
            delivery_adress,
            phone: phone_number,
            email,
            total,
        },
    });

    cartItems.forEach(async (item) => {
        await prisma.orderItems.create({
            data: {
                orderDetails: {
                    connect: {
                        id: order.id,
                    },
                },
                products: {
                    connect: {
                        id: item.product.id,
                    },
                },
                quantity: item.quantity,
            },
        });
    });

    const payment = await prisma.paymentDetails.create({
        data: {
            orderDetails: {
                connect: { id: order.id },
            },
            payment_method,
        },
    });

    // console.log(req.body);
    res.status(200).json('caca');
}
