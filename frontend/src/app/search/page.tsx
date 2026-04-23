"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { propertyApi } from '@/lib/api';
import { Search, MapPin, Filter } from 'lucide-react';
import { PremiumButton } from '@/components/ui/PremiumButton';

import { MapComponent } from '@/components/ui/MapComponent';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(true);

  // Advanced Filter States
  const [filters, setFilters] = useState({
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
    minArea: searchParams.get('minArea') || '',
  });

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

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    window.location.href = `/search?${params.toString()}`;
  };

  useEffect(() => {
    fetchProperties();
  }, [searchParams]);

  return (
    <main style={{ paddingTop: 'var(--header-height)', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      {/* Search Header */}
      <div style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border)', padding: '1rem 0', zIndex: 10 }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--surface-2)', padding: '0.6rem 1rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border)' }}>
              <Search size={18} style={{ marginRight: '0.75rem', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Ciudad, zona o barrio..." 
                defaultValue={searchParams.get('city') || ''}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('city', (e.target as HTMLInputElement).value);
                    window.location.href = `/search?${params.toString()}`;
                  }
                }}
                style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem' }} 
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <PremiumButton 
                variant="outline" 
                onClick={() => setShowMap(!showMap)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem' }}
              >
                <MapPin size={18} /> {showMap ? 'Ocultar Mapa' : 'Ver Mapa'}
              </PremiumButton>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section Split View */}
      <div className="search-split-container" style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        
        {/* Advanced Filters Sidebar */}
        <aside className="search-sidebar" style={{ width: '300px', background: 'var(--surface-1)', borderRight: '1px solid var(--border)', padding: '2rem', overflowY: 'auto' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '1.1rem' }}>
            <Filter size={18} /> Filtros Avanzados
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Price Range */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>Rango de Precio (COP)</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input 
                  type="number" 
                  placeholder="Mínimo" 
                  value={filters.minPrice}
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--surface-2)' }}
                />
                <input 
                  type="number" 
                  placeholder="Máximo" 
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--surface-2)' }}
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>Habitaciones</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['1', '2', '3', '4', '5+'].map((num) => (
                  <button 
                    key={num}
                    onClick={() => setFilters({...filters, bedrooms: num.replace('+', '')})}
                    style={{ 
                      flex: 1, 
                      padding: '0.5rem', 
                      borderRadius: '4px', 
                      border: '1px solid var(--border)', 
                      background: filters.bedrooms === num.replace('+', '') ? 'var(--accent)' : 'var(--surface-2)',
                      color: filters.bedrooms === num.replace('+', '') ? 'white' : 'inherit',
                      cursor: 'pointer'
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Bathrooms */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>Baños</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['1', '2', '3', '4+'].map((num) => (
                  <button 
                    key={num}
                    onClick={() => setFilters({...filters, bathrooms: num.replace('+', '')})}
                    style={{ 
                      flex: 1, 
                      padding: '0.5rem', 
                      borderRadius: '4px', 
                      border: '1px solid var(--border)', 
                      background: filters.bathrooms === num.replace('+', '') ? 'var(--accent)' : 'var(--surface-2)',
                      color: filters.bathrooms === num.replace('+', '') ? 'white' : 'inherit',
                      cursor: 'pointer'
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Area */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>Área Mínima (m²)</label>
              <input 
                type="number" 
                placeholder="Ej: 80" 
                value={filters.minArea}
                onChange={(e) => setFilters({...filters, minArea: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--surface-2)' }}
              />
            </div>

            <PremiumButton onClick={applyFilters}>Aplicar Filtros</PremiumButton>
            <button 
              onClick={() => {
                setFilters({ minPrice: '', maxPrice: '', bedrooms: '', bathrooms: '', minArea: '' });
                window.location.href = '/search';
              }}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.875rem', cursor: 'pointer' }}
            >
              Limpiar filtros
            </button>
          </div>
        </aside>

        {/* Left: Scrollable Results */}
        <section className="search-results-list" style={{ 
          flex: showMap ? '0 0 500px' : '1', 
          overflowY: 'auto', 
          padding: '2rem',
          background: 'var(--surface-2)',
          borderRight: showMap ? '1px solid var(--border)' : 'none'
        }}>
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '1.25rem' }}>
              {loading ? 'Buscando...' : `${properties.length} Propiedades encontradas`}
            </h1>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>Cargando propiedades de lujo...</div>
          ) : properties.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: showMap ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))', 
              gap: '2rem' 
            }}>
              {properties.map((prop: any) => (
                <PropertyCard 
                  key={prop.id} 
                  id={prop.id}
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
            <div style={{ textAlign: 'center', padding: '6rem', background: 'var(--surface-1)', borderRadius: 'var(--border-radius)' }}>
              <h3 style={{ marginBottom: '1rem' }}>No encontramos lo que buscas</h3>
              <PremiumButton variant="outline" onClick={() => window.location.href = '/'}>
                Volver al inicio
              </PremiumButton>
            </div>
          )}
        </section>

        {/* Right: Map (Fixed/Sticky) */}
        {showMap && (
          <section className="search-map-section" style={{ flex: 1, background: '#121212' }}>
            <MapComponent properties={properties} />
          </section>
        )}
      </div>
    </main>
  );
}
