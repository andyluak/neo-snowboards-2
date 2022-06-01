import {
    getBrandsByType,
    getMinMaxPriceByType,
    getSizesByValue,
} from '/utils/filters/getFilterValue';

export default async function handler(req, res) {
    const { type, gender } = JSON.parse(req.body);
    const brandNames = await getBrandsByType(type, gender[0]);
    const minMaxPrice = await getMinMaxPriceByType(type, gender[0]);
    const sizes = await getSizesByValue(type, gender[0]);

    res.status(200).json({ brandNames, minMaxPrice, sizes });
}
