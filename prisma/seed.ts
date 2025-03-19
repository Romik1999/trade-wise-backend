import { EnumUnitMeasure, PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      password: await hash('123456'),
    },
  });

  const components = [
    {
      id: 'cm8gap6ez00000cjp0xur51kg',
      title: 'Цепочка 2 мм',
      price: 52,
      remainder: 10,
      unit_measure: 'METERS',
      size: 100,
    },
    {
      id: 'cm8gaq9hz00010cjpg3eh3jd2',
      title: 'Подвеска сердце 8 мм вытянутое',
      price: 150,
      remainder: 20,
      unit_measure: 'PIECES',
      size: 200,
    },
    {
      id: 'cm8gargh000020cjp4jwr0cin',
      title: 'Пин золотой',
      price: 45,
      remainder: 30,
      unit_measure: 'PIECES',
      size: 300,
    },
    {
      id: 'cm8gatr7w00030cjp23g47unw',
      title: 'Кольцо соединительное',
      price: 100,
      remainder: 40,
      unit_measure: 'PACKAGING',
      size: 400,
    },
    {
      id: 'cm8gav4hn00050cjpbqsjb1z2',
      title: 'Замочек золотой 4мм',
      price: 35,
      remainder: 50,
      unit_measure: 'PACKAGING',
      size: 500,
    },
  ];

  await Promise.all(
    components.map(({ id, title, price, remainder, unit_measure, size }) =>
      prisma.component.upsert({
        where: { id },
        update: {},
        create: {
          title,
          description: `Description ${title.toLowerCase()}`,
          price,
          images: [''],
          seller_link:
            'https://www.ozon.ru/product/krossovki-nike-nike-1473285214/',
          remainder,
          unit_measure: unit_measure as EnumUnitMeasure,
          length: size,
          width: size,
          height: size,
          diameter: size,
        },
      }),
    ),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
