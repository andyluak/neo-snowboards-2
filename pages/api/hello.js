export default async function handler(req, res) {
    res.status(200).json('');
}

// ADD SNOWBOARDS
/**

  const formattedDataKids = kids.map((p) => {
    return {
      product_name: p.title,
      product_slug: formatSlug(p.formattedTitle),
      SKU: generateRandomId(),
      brand: p.brand,
      image: p.image,
      description: p.description,
      price: parseFloat(p.price),
      stock: p.stock,
      discount: {
        connect: {
          id: discountId.id,
        },
      },
      type: 'snowboard',
      categories: {
        connect: [
          { id: mapCategoryToID[p.gender]['id'] },
          { id: mapCategoryToID.snowboards.id },
        ],
      },
      snowboards: {
        create: {
          sizes: p.sized.join(' '),
          ability_level: p.ability_level,
          terrain: p.terrain,
          rocker_type: p.rocker_type,
          shape: p.shape,
          flex_rating: p.flex_rating,
          core: p.core,
        },
      },
    };
  });

  const formattedDataWomen = women.map((p) => {
    return {
      product_name: p.title,
      product_slug: formatSlug(p.formattedTitle),
      SKU: generateRandomId(),
      brand: p.brand,
      image: p.image,
      description: p.description,
      price: parseFloat(p.price),
      stock: p.stock,
      discount: {
        connect: {
          id: discountId.id,
        },
      },
      type: 'snowboard',
      categories: {
        connect: [
          { id: mapCategoryToID[p.gender]['id'] },
          { id: mapCategoryToID.snowboards.id },
        ],
      },
      snowboards: {
        create: {
          sizes: p.sized.join(' '),
          ability_level: p.ability_level,
          terrain: p.terrain,
          rocker_type: p.rocker_type,
          shape: p.shape,
          flex_rating: p.flex_rating,
          core: p.core,
        },
      },
    };
  });

  const formattedDataMen = men.map((p) => {
    return {
      product_name: p.title,
      product_slug: formatSlug(p.formattedTitle),
      SKU: generateRandomId(),
      brand: p.brand,
      image: p.image,
      description: p.description,
      price: parseFloat(p.price),
      stock: p.stock,
      discount: {
        connect: {
          id: discountId.id,
        },
      },
      type: 'snowboard',
      categories: {
        connect: [
          { id: mapCategoryToID[p.gender]['id'] },
          { id: mapCategoryToID.snowboards.id },
        ],
      },
      snowboards: {
        create: {
          sizes: p.sized.join(' '),
          ability_level: p.ability_level,
          terrain: p.terrain,
          rocker_type: p.rocker_type,
          shape: p.shape,
          flex_rating: p.flex_rating,
          core: p.core,
        },
      },
    };
  });

  const dataArray = [ ...formattedDataKids, ...formattedDataWomen, ...formattedDataMen ];

 */

//ADD BOOTS
/**
    let bootsDataArray = [ ...menBoots, ...womenBoots, ...kidsBoots];

  bootsDataArray = bootsDataArray.map( p => {
    return {
      product_name: p.title,
      product_slug: formatSlug(p.formattedTitle),
      SKU: generateRandomId(),
      brand: p.brand,
      image: p.image,
      description : p.description,
      price: parseFloat(p.price),
      stock: p.stock,
      discount: {
        connect: {
          id: discountId.id,
        },
      },
      type: 'boots',
      categories: {
        connect: [
          {
            id: mapCategoryToID.boots.id,
          },
          {
            id: mapCategoryToID[p.gender]['id']
          }
        ]
      },
      boots: {
        create: {
          ability_level: p.ability_level,
          flex_rating : p.flex_rating,
          lacing_system: p.lacing_system,
          binding_style: p.binding_style
        }
      }
    }
  })
   */

// ADD BINDINGS
/**

  let bindingsDataArray = [...menBindings, ...womenBindings, ...kidsBindings];

  bindingsDataArray = bindingsDataArray.map( p => {
    return {
      product_name: p.title,
      product_slug: formatSlug(p.formattedTitle),
      SKU: generateRandomId(),
      brand: p.brand,
      image: p.image,
      description : p.description,
      price: parseFloat(p.price),
      stock: p.stock,
      discount: {
        connect: {
          id: discountId.id,
        },
      },
      type: 'bindings',
      categories: {
        connect: [
          {
            id: mapCategoryToID.bindings.id,
          },
          {
            id: mapCategoryToID[p.gender]['id']
          }
        ]
      },
      bindings: {
        create: {
          ability_level: p.ability_level,
          flex_rating : p.flex_rating,
          binding_style: p.binding_style
        }
      }
    }
  })



  let glovesDataArray = [...menGloves, ...womenGloves, ...kidsGloves];
  let gogglesDataArray = [...menGoggles, ...womenGoggles, ...kidsGoggles];
  let helmetsDataArray = [...menHelmets, ...womenHelmets, ...kidsHelmets];
  let bindingsDataArray = [...menBindings, ...womenBindings, ...kidsBindings];

  bindingsDataArray = bindingsDataArray.map((p) => ({
    product_name: p.title,
    product_slug: formatSlug(p.formattedTitle),
    SKU: generateRandomId(),
    brand: p.brand,
    image: p.image,
    description: p.description,
    price: parseFloat(p.price),
    stock: p.stock,
    discount: {
      connect: {
        id: discountId.id,
      },
    },
    type: 'gloves',
    categories: {
      connect: [
        {
          id: mapCategoryToID.bindings.id,
        },
        {
          id: mapCategoryToID[p.gender]['id'],
        },
      ],
    },
    bindings: {
      create: {
        ability_level: p.ability_level,
        flex_rating: p.flex_rating,
        binding_style: p.binding_style,
      },
    },
  }));

  glovesDataArray = glovesDataArray.map((p) => ({
    product_name: p.title,
    product_slug: formatSlug(p.formattedTitle),
    SKU: generateRandomId(),
    brand: p.brand,
    image: p.image,
    description: p.description,
    price: parseFloat(p.price),
    stock: p.stock,
    discount: {
      connect: {
        id: discountId.id,
      },
    },
    type: 'gloves',
    categories: {
      connect: [
        {
          id: mapCategoryToID.gloves.id,
        },
        {
          id: mapCategoryToID[p.gender]['id'],
        },
      ],
    },
    gloves: {
      create: {
        warmth: p.warmth,
        material: p.material,
        cuff_style: p.cuff_style,
      },
    },
  }));

  gogglesDataArray = gogglesDataArray.map((p) => ({
    product_name: p.title,
    product_slug: formatSlug(p.formattedTitle),
    SKU: generateRandomId(),
    brand: p.brand,
    image: p.image,
    description: p.description,
    price: parseFloat(p.price),
    stock: p.stock,
    discount: {
      connect: {
        id: discountId.id,
      },
    },
    type: 'goggles',
    categories: {
      connect: [
        {
          id: mapCategoryToID.goggles.id,
        },
        {
          id: mapCategoryToID[p.gender]['id'],
        },
      ],
    },
    goggles: {
      create: {
        frame_size: p.frame_size,
        lens_type: p.lens_type,
        quick_lens: p.quick_lens,
        helmet_compatible: p.helmet_compatible,
      },
    },
  }));

  helmetsDataArray = helmetsDataArray.map((p) => ({
    product_name: p.title,
    product_slug: formatSlug(p.formattedTitle),
    SKU: generateRandomId(),
    brand: p.brand,
    image: p.image,
    description: p.description,
    price: parseFloat(p.price),
    stock: p.stock,
    discount: {
      connect: {
        id: discountId.id,
      },
    },
    type: 'helmets',
    categories: {
      connect: [
        {
          id: mapCategoryToID.helmets.id,
        },
        {
          id: mapCategoryToID[p.gender]['id'],
        },
      ],
    },
    helmets: {
      create: {
        material: p.material,
        style: p.style,
        venting: p.venting,
        audio: p.audio,
        removable_ear_pads: p.removable_ear_pads,
        adjustable_fit: p.adjustable_fit,
        weight: p.weight,
      },
    },
  }));

  glovesDataArray.forEach(async (p) => {
    await prisma.products.create({
      data: p,
    });
  });

  gogglesDataArray.forEach(async (p) => {
    await prisma.products.create({
      data: p,
    });
  });

  helmetsDataArray.forEach(async (p) => {
    await prisma.products.create({
      data: p,
    });
  });

  bindingsDataArray.forEach(async (p) => {
    await prisma.products.create({
      data: p,
    });
  });
 */
