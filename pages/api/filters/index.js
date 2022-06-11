import {
    getBrandsByType,
    getMinMaxPriceByType,
    getSizesByValue,
} from '/utils/filters/getFilterValue';

export default async function handler(req, res) {
    const { type, gender } = JSON.parse(req.body);
    const brand = await getBrandsByType(type, gender[0]);
    const price = await getMinMaxPriceByType(type, gender[0]);
    const size = await getSizesByValue(type, gender[0]);

    res.status(200).json({ brand, price, size });
}
