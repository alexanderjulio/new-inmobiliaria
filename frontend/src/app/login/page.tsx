"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { authApi } from '@/lib/api';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await authApi.login(formData);
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/'; // Redirect to home
    } catch (err: any) {
      setError('Credenciales inválidas. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--surface-2)' }}>
      <Navbar />
      
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 2rem' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass"
          style={{ 
            width: '100%', 
            maxWidth: '450px', 
            padding: '3rem', 
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Bienvenido <span className="accent-text">Elite</span></h1>
            <p style={{ color: 'var(--text-muted)' }}>Ingresa tus credenciales para continuar.</p>
          </div>

          {error && (
            <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 }}>Email</label>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--surface-1)', padding: '0.75rem 1rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
                <Mail size={18} style={{ color: 'var(--accent)', marginRight: '0.75rem' }} />
                <input 
                  type="email" 
                  required
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%' }} 
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 }}>Contraseña</label>
                <Link href="#" style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>¿Olvidaste tu contraseña?</Link>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--surface-1)', padding: '0.75rem 1rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
                <Lock size={18} style={{ color: 'var(--accent)', marginRight: '0.75rem' }} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%' }} 
                />
              </div>
            </div>

            <PremiumButton type="submit" fullWidth disabled={loading}>
              {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </PremiumButton>

            <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              ¿No tienes una cuenta? <Link href="/register" style={{ color: 'var(--accent)', fontWeight: 600 }}>Regístrate ahora</Link>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
