import { PrismaClient, Role, PropertyType, PropertyStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.property.deleteMany();
  await prisma.project.deleteMany();
  await prisma.city.deleteMany();
  await prisma.user.deleteMany();

  // Create Cities
  const bogota = await prisma.city.create({ data: { name: 'Bogotá' } });
  const medellin = await prisma.city.create({ data: { name: 'Medellín' } });
  const chia = await prisma.city.create({ data: { name: 'Chía' } });

  // Create a Seller User
  const hashedPassword = await bcrypt.hash('password123', 10);
  const seller = await prisma.user.create({
    data: {
      email: 'seller@elite.com',
      password: hashedPassword,
      name: 'Elite Seller',
      role: Role.SELLER,
    },
  });

  // Create Properties
  await prisma.property.create({
    data: {
      title: 'Villa Contemporánea en La Calera',
      description: 'Una joya arquitectónica con vista a las montañas.',
      price: 2400000000,
      type: PropertyType.HOUSE,
      status: PropertyStatus.SALE,
      area: 450,
      bedrooms: 5,
      bathrooms: 6,
      address: 'Vía La Calera Km 5',
      cityId: bogota.id,
      ownerId: seller.id,
      mainImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
      featured: true,
    },
  });

  await prisma.property.create({
    data: {
      title: 'Penthouse de Lujo en El Poblado',
      description: 'El mejor penthouse con vista 360 de la ciudad.',
      price: 12000000,
      type: PropertyType.APARTMENT,
      status: PropertyStatus.RENT,
      area: 280,
      bedrooms: 3,
      bathrooms: 4,
      address: 'Carrera 35 El Poblado',
      cityId: medellin.id,
      ownerId: seller.id,
      mainImage: 'https://images.unsplash.com/photo-1600607687940-4e524cb35a36?q=80&w=2070&auto=format&fit=crop',
      featured: true,
    },
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
