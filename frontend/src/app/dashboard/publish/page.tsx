"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { propertyApi } from '@/lib/api';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Upload, 
  Info, 
  MapPin, 
  Camera, 
  Layout, 
  CheckCircle2 
} from 'lucide-react';
import Link from 'next/link';

export default function PublishPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    type: 'APARTMENT',
    status: 'SALE',
    area: '',
    bedrooms: '',
    bathrooms: '',
    address: '',
    city: 'Bogotá',
    mainImage: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mocking submission since we need accurate city ID from backend
      // In a real scenario, we'd fetch cities first
      console.log("Publishing property:", formData);
      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error publishing", error);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main style={{ minHeight: '100vh', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--accent)', marginBottom: '2rem' }}><CheckCircle2 size={80} style={{ margin: '0 auto' }} /></div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>¡Propiedad Publicada!</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Tu inmueble ya está visible para miles de potenciales clientes.</p>
          <Link href="/dashboard">
            <PremiumButton>Volver al Panel</PremiumButton>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--surface-2)', paddingBottom: '6rem' }}>
      <Navbar />
      
      <div style={{ paddingTop: 'calc(var(--header-height) + 2rem)' }} className="container">
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.875rem' }}>
          <ArrowLeft size={16} /> Volver al Panel
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
          {/* Form */}
          <section>
            <div className="glass" style={{ padding: '3rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border)' }}>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Publicar <span className="accent-text">Inmueble</span></h1>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {/* General Info */}
                <div>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
                    <Info size={20} className="accent-text" /> Información General
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Título de la Publicación</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ej: Penthouse de Lujo con Terraza"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        style={{ background: 'var(--surface-1)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border)', outline: 'none' }} 
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Descripción Detallada</label>
                      <textarea 
                        required
                        rows={6}
                        placeholder="Describe los acabados, la vista, el sector..."
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        style={{ background: 'var(--surface-1)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border)', outline: 'none', resize: 'none' }} 
                      />
                    </div>
                  </div>
                </div>

                {/* Price and Type */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Precio (COP)</label>
                    <input 
                      type="number" 
                      required
                      placeholder="Ej: 1500000000"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      style={{ background: 'var(--surface-1)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border)', outline: 'none' }} 
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Operación</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      style={{ background: 'var(--surface-1)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border)', outline: 'none' }}
                    >
                      <option value="SALE">Venta</option>
                      <option value="RENT">Arriendo</option>
                      <option value="PROJECT">Proyecto</option>
                    </select>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
                    <Layout size={20} className="accent-text" /> Especificaciones
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Área (m²)</label>
                      <input type="number" required value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})} style={{ background: 'var(--surface-1)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border)' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Habitaciones</label>
                      <input type="number" required value={formData.bedrooms} onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} style={{ background: 'var(--surface-1)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border)' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Baños</label>
                      <input type="number" required value={formData.bathrooms} onChange={(e) => setFormData({...formData, bathrooms: e.target.value})} style={{ background: 'var(--surface-1)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border)' }} />
                    </div>
                  </div>
                </div>

                {/* Multimedia */}
                <div>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
                    <Camera size={20} className="accent-text" /> Multimedia
                  </h3>
                  <div style={{ 
                    border: '2px dashed var(--border)', 
                    padding: '3rem', 
                    textAlign: 'center', 
                    borderRadius: 'var(--border-radius)',
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.05)'
                  }}>
                    <Upload size={40} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
                    <div style={{ fontWeight: 600 }}>Sube fotos de alta resolución</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Mínimo 5 fotos para destacar tu propiedad.</p>
                  </div>
                </div>

                <PremiumButton type="submit" fullWidth disabled={loading}>
                  {loading ? 'Publicando...' : 'Publicar Propiedad'}
                </PremiumButton>
              </form>
            </div>
          </section>

          {/* Sidebar Info */}
          <aside>
            <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border)' }}>
              <h4 style={{ marginBottom: '1rem' }}>Consejos para vender más rápido</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <li>• Usa fotos con luz natural.</li>
                <li>• Describe detalladamente el sector.</li>
                <li>• Sé honesto con el precio de mercado.</li>
                <li>• Responde rápido a los interesados.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
