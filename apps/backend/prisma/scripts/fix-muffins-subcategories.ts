/// <reference types="node" />
import { PrismaClient } from '../../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const muffins = await prisma.subcategories.findFirst({
    where: { name_en: 'Muffins' },
  });
  const muffinsCupcakes = await prisma.subcategories.findFirst({
    where: { name_en: 'Muffins & Cupcakes' },
  });

  if (!muffins) {
    console.log('Run seed first to create "Muffins" subcategory');
    return;
  }
  if (!muffinsCupcakes) {
    console.log('"Muffins & Cupcakes" not found');
    return;
  }

  // Get savory category id
  const savory = await prisma.categories.findFirst({
    where: { name_en: 'Savory' },
  });
  if (!savory) {
    console.log('Savory category not found');
    return;
  }

  // Remove savory from Muffins & Cupcakes (sweet only)
  const deleted = await prisma.categorySubcategories.deleteMany({
    where: {
      category_id: savory.id,
      subcategory_id: muffinsCupcakes.id,
    },
  });
  console.log(`Removed savory from Muffins & Cupcakes (${deleted.count} link(s))`);

  // Migrate savory recipes from Muffins & Cupcakes to Muffins
  const savoryRecipeIds = (
    await prisma.recipes.findMany({
      where: { category_id: savory.id },
      select: { id: true },
    })
  ).map((r) => r.id);

  const updated = await prisma.recipeSubcategories.updateMany({
    where: {
      subcategory_id: muffinsCupcakes.id,
      recipe_id: { in: savoryRecipeIds },
    },
    data: { subcategory_id: muffins.id },
  });
  console.log(`Migrated ${updated.count} savory recipe(s) from Muffins & Cupcakes to Muffins`);

  console.log('Fix completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
