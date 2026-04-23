"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Home, Building2, Trees, Building } from 'lucide-react';
import { Navbar } from '@/components/ui/Navbar';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { PropertyCard } from '@/components/ui/PropertyCard';

export default function LandingPage() {
  const [searchCity, setSearchCity] = useState('');
  const [searchType, setSearchType] = useState('Todos los tipos');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchCity) params.append('city', searchCity);
    if (searchType !== 'Todos los tipos') params.append('type', searchType);
    window.location.href = `/search?${params.toString()}`;
  };

  const categories = [
    { icon: <Home size={24} />, name: "Casas" },
    { icon: <Building2 size={24} />, name: "Apartamentos" },
    { icon: <Building size={24} />, name: "Apartaestudios" },
    { icon: <Trees size={24} />, name: "Lotes" },
    { icon: <Trees size={24} />, name: "Campestres" },
  ];

  const featuredProperties = [
    {
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
      title: "Villa Contemporánea en La Calera",
      price: "$2.400.000.000",
      location: "La Calera, Cundinamarca",
      beds: 5,
      baths: 6,
      sqft: 450,
      type: "Venta"
    },
    {
      image: "https://images.unsplash.com/photo-1600607687940-4e524cb35a36?q=80&w=2070&auto=format&fit=crop",
      title: "Penthouse de Lujo en El Poblado",
      price: "$12.000.000 / mes",
      location: "El Poblado, Medellín",
      beds: 3,
      baths: 4,
      sqft: 280,
      type: "Arriendo"
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      title: "Residencia Moderna en Chía",
      price: "$1.850.000.000",
      location: "Chía, Cundinamarca",
      beds: 4,
      baths: 4,
      sqft: 320,
      type: "Venta"
    }
  ];

  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section style={{ 
        height: '100vh', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Hero Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1
        }}>
          <img 
            src="/hero.png" 
            alt="Luxury Villa" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7))'
          }} />
        </div>

        <div className="container" style={{ textAlign: 'center', color: 'white', zIndex: 10 }}>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: '4.5rem', marginBottom: '1.5rem', fontWeight: 700 }}
          >
            Encuentra tu próximo <span className="accent-text">Legado</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem auto', opacity: 0.9 }}
          >
            Propiedades exclusivas, proyectos de vanguardia y una experiencia inigualable en el mercado inmobiliario de alta gama.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass"
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              padding: '1.5rem',
              borderRadius: 'var(--border-radius)',
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              gap: '1rem',
              alignItems: 'center'
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block', opacity: 0.8 }}>¿Dónde?</label>
              <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '4px' }}>
                <MapPin size={18} style={{ marginRight: '0.5rem' }} />
                <input 
                  type="text" 
                  placeholder="Ciudad o Sector" 
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '100%' }} 
                />
              </div>
            </div>
            <div style={{ textAlign: 'left' }}>
              <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block', opacity: 0.8 }}>Tipo</label>
              <select 
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                style={{ width: '100%', background: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '4px', border: 'none', color: 'white', outline: 'none' }}
              >
                <option style={{color: 'black'}}>Todos los tipos</option>
                <option value="APARTMENT" style={{color: 'black'}}>Apartamento</option>
                <option value="HOUSE" style={{color: 'black'}}>Casa</option>
              </select>
            </div>
            <div style={{ textAlign: 'left' }}>
              <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block', opacity: 0.8 }}>Precio</label>
              <select style={{ width: '100%', background: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '4px', border: 'none', color: 'white', outline: 'none' }}>
                <option style={{color: 'black'}}>Cualquier precio</option>
                <option style={{color: 'black'}}>$$$ - Alto</option>
              </select>
            </div>
            <PremiumButton onClick={handleSearch} style={{ height: '100%', padding: '0' }}>
              <Search size={20} style={{ margin: '0 auto' }} />
            </PremiumButton>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '6rem 0', background: 'var(--surface-1)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '1rem',
                  cursor: 'pointer'
                }}
              >
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%', 
                  background: 'var(--surface-2)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'var(--accent)',
                  border: '1px solid var(--border)'
                }}>
                  {cat.icon}
                </div>
                <span style={{ fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase' }}>{cat.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Propiedades <span className="accent-text">Destacadas</span></h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>Selección curada de los inmuebles más exclusivos del mercado actual.</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '2.5rem' 
          }}>
            {featuredProperties.map((prop, i) => (
              <PropertyCard key={i} {...prop} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <PremiumButton variant="outline">Ver todas las propiedades</PremiumButton>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '8rem 0', 
        background: 'var(--primary)', 
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>¿Eres <span className="accent-text">Constructora</span> o Vendedor?</h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem auto', opacity: 0.8 }}>
            Únete a la plataforma más exclusiva y llega a los clientes más exigentes del país.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            <PremiumButton style={{ background: 'var(--accent)', border: 'none' }}>Registrarme ahora</PremiumButton>
            <PremiumButton variant="outline" style={{ borderColor: 'white', color: 'white' }}>Más información</PremiumButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '4rem 0', background: 'var(--surface-2)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>
            ELITE<span className="accent-text">INMOBILIARIA</span>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            © 2026 Inmobiliaria Elite. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </main>
  );
}
