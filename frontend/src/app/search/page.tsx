"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { propertyApi } from '@/lib/api';
import { Search, MapPin, Filter } from 'lucide-react';
import { PremiumButton } from '@/components/ui/PremiumButton';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(searchParams.entries());
      const res = await propertyApi.getAll(params);
      setProperties(res.data);
    } catch (error) {
      console.error("Error fetching properties", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [searchParams]);

  return (
    <main style={{ paddingTop: 'var(--header-height)' }}>
      <Navbar />
      
      {/* Search Header */}
      <div style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border)', padding: '2rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--surface-2)', padding: '0.75rem 1rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border)' }}>
              <Search size={18} style={{ marginRight: '0.75rem', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Ciudad, zona o barrio..." 
                defaultValue={searchParams.get('city') || ''}
                style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '1rem' }} 
              />
            </div>
            <PremiumButton style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={18} /> Filtros
            </PremiumButton>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <section style={{ padding: '4rem 0', minHeight: '60vh' }}>
        <div className="container">
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '1.5rem' }}>
              {loading ? 'Buscando...' : `${properties.length} Propiedades encontradas`}
            </h1>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Ordenar por: <span style={{ fontWeight: 600, color: 'var(--foreground)' }}>Relevancia</span>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>Cargando propiedades de lujo...</div>
          ) : properties.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
              gap: '2rem' 
            }}>
              {properties.map((prop: any, i) => (
                <PropertyCard 
                  key={prop.id} 
                  image={prop.mainImage}
                  title={prop.title}
                  price={new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(prop.price)}
                  location={`${prop.city.name}, Colombia`}
                  beds={prop.bedrooms}
                  baths={prop.bathrooms}
                  sqft={prop.area}
                  type={prop.status}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '6rem', background: 'var(--surface-2)', borderRadius: 'var(--border-radius)' }}>
              <h3 style={{ marginBottom: '1rem' }}>No encontramos lo que buscas</h3>
              <p style={{ color: 'var(--text-muted)' }}>Prueba ajustando tus filtros o buscando en otra ubicación.</p>
              <PremiumButton variant="outline" style={{ marginTop: '2rem' }} onClick={() => window.location.href = '/'}>
                Volver al inicio
              </PremiumButton>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
