import { Metadata } from 'next';
import { propertyApi } from '@/lib/api';
import PropertyDetailClient from '@/components/property-detail/PropertyDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

// Dynamic Metadata Generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    // We use a direct fetch here or the api utility
    // Since this is server-side, we need to handle the absolute URL if necessary
    // For now, we use a mock-up approach or fetch from backend if available
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/properties/${id}`);
    const property = await res.json();

    return {
      title: `${property.title} | Inmobiliaria Elite`,
      description: property.description.substring(0, 160),
      openGraph: {
        title: property.title,
        description: property.description.substring(0, 160),
        images: [property.mainImage],
      },
    };
  } catch (error) {
    return {
      title: 'Propiedad | Inmobiliaria Elite',
    };
  }
}

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;
  
  // Fetch data on the server
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/properties/${id}`, { cache: 'no-store' });
  const property = await res.json();

  if (!property) return <div>Propiedad no encontrada.</div>;

  return <PropertyDetailClient property={property} />;
}
