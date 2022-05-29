import prisma from '/lib/prisma';

export default async function handler(req, res) {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      category_name: true,
    },
  });
  res.status(200).json({
    categories,
  });
}
