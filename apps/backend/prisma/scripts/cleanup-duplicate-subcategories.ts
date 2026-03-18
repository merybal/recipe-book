/// <reference types="node" />
import { PrismaClient } from '../../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Find subcategories to remove and their replacements
  const iceCreamOld = await prisma.subcategories.findFirst({
    where: { name_en: 'Ice cream' },
  });
  const iceCreamNew = await prisma.subcategories.findFirst({
    where: { name_en: 'Ice Cream' },
  });

  const muffinsOld = await prisma.subcategories.findFirst({
    where: { name_en: 'Muffins' },
  });
  const muffinsNew = await prisma.subcategories.findFirst({
    where: { name_en: 'Muffins & Cupcakes' },
  });

  if (iceCreamOld && iceCreamNew) {
    const updated = await prisma.recipeSubcategories.updateMany({
      where: { subcategory_id: iceCreamOld.id },
      data: { subcategory_id: iceCreamNew.id },
    });
    console.log(`Migrated ${updated.count} recipes from "Ice cream" to "Ice Cream"`);

    await prisma.subcategories.delete({ where: { id: iceCreamOld.id } });
    console.log('Deleted subcategory "Ice cream"');
  } else if (iceCreamOld && !iceCreamNew) {
    console.log('Warning: "Ice cream" exists but "Ice Cream" does not. Run seed first.');
  } else if (!iceCreamOld) {
    console.log('"Ice cream" not found, nothing to do');
  }

  if (muffinsOld && muffinsNew) {
    const updated = await prisma.recipeSubcategories.updateMany({
      where: { subcategory_id: muffinsOld.id },
      data: { subcategory_id: muffinsNew.id },
    });
    console.log(`Migrated ${updated.count} recipes from "Muffins" to "Muffins & Cupcakes"`);

    await prisma.subcategories.delete({ where: { id: muffinsOld.id } });
    console.log('Deleted subcategory "Muffins"');
  } else if (muffinsOld && !muffinsNew) {
    console.log('Warning: "Muffins" exists but "Muffins & Cupcakes" does not. Run seed first.');
  } else if (!muffinsOld) {
    console.log('"Muffins" not found, nothing to do');
  }

  console.log('Cleanup completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
