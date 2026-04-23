"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { propertyApi } from '@/lib/api';
import { MapPin, Bed, Bath, Maximize, Calendar, User, Phone, Mail, Share2, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await propertyApi.getOne(id as string);
        setProperty(res.data);
      } catch (error) {
        console.error("Error fetching property", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Cargando detalles de lujo...</div>;
  if (!property) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Propiedad no encontrada.</div>;

  const images = property.images.length > 0 ? property.images : [property.mainImage];

  return (
    <main style={{ background: 'var(--surface-2)', minHeight: '100vh', paddingBottom: '4rem' }}>
      <Navbar />
      
      {/* Header / Breadcrumbs */}
      <div style={{ paddingTop: 'var(--header-height)', background: 'var(--surface-1)' }}>
        <div className="container" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{property.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)', gap: '0.5rem' }}>
              <MapPin size={16} />
              {property.address}, {property.city.name}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: 'var(--accent)', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(property.price)}
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button style={{ background: 'none', border: '1px solid var(--border)', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' }}><Heart size={20} /></button>
              <button style={{ background: 'none', border: '1px solid var(--border)', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' }}><Share2 size={20} /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Left Column: Content */}
        <section>
          {/* Gallery */}
          <div style={{ background: 'var(--surface-1)', padding: '1rem', borderRadius: 'var(--border-radius)', marginBottom: '2rem' }}>
            <div style={{ height: '500px', borderRadius: 'var(--border-radius)', overflow: 'hidden', marginBottom: '1rem' }}>
              <img src={images[activeImage]} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {images.map((img: string, i: number) => (
                <div 
                  key={i} 
                  onClick={() => setActiveImage(i)}
                  style={{ 
                    width: '100px', 
                    height: '70px', 
                    borderRadius: '4px', 
                    overflow: 'hidden', 
                    cursor: 'pointer',
                    border: activeImage === i ? '2px solid var(--accent)' : '2px solid transparent',
                    opacity: activeImage === i ? 1 : 0.7
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div style={{ background: 'var(--surface-1)', padding: '2.5rem', borderRadius: 'var(--border-radius)', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>Descripción</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
              {property.description}
            </p>
          </div>

          {/* Features Grid */}
          <div style={{ background: 'var(--surface-1)', padding: '2.5rem', borderRadius: 'var(--border-radius)', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>Características Principales</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ color: 'var(--accent)', background: 'rgba(197, 160, 89, 0.1)', padding: '0.75rem', borderRadius: '50%' }}><Bed size={24} /></div>
                <div>
                  <div style={{ fontWeight: 700 }}>{property.bedrooms}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Habitaciones</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ color: 'var(--accent)', background: 'rgba(197, 160, 89, 0.1)', padding: '0.75rem', borderRadius: '50%' }}><Bath size={24} /></div>
                <div>
                  <div style={{ fontWeight: 700 }}>{property.bathrooms}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Baños</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ color: 'var(--accent)', background: 'rgba(197, 160, 89, 0.1)', padding: '0.75rem', borderRadius: '50%' }}><Maximize size={24} /></div>
                <div>
                  <div style={{ fontWeight: 700 }}>{property.area} m²</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Área Construida</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Sidebar */}
        <aside>
          {/* Contact Card */}
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--border-radius)', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Contactar Agente</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent)' }}>
                <img src={property.owner.avatar || "https://ui-avatars.com/api/?name=" + property.owner.name} alt={property.owner.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>{property.owner.name}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Asesor Elite</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <PremiumButton fullWidth style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Phone size={18} /> Ver Teléfono
              </PremiumButton>
              <PremiumButton fullWidth variant="outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Mail size={18} /> Enviar Mensaje
              </PremiumButton>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input type="text" placeholder="Tu Nombre" style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--surface-2)' }} />
                <input type="email" placeholder="Tu Email" style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--surface-2)' }} />
                <textarea placeholder="Hola, estoy interesado en esta propiedad..." rows={4} style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--surface-2)', resize: 'none' }}></textarea>
                <PremiumButton type="button" fullWidth>Solicitar Información</PremiumButton>
              </form>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
