"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Home, 
  PlusCircle, 
  Settings, 
  BarChart3, 
  User,
  LogOut,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    else window.location.href = '/login'; // Protect route
  }, []);

  if (!user) return null;

  const sidebarItems = [
    { id: 'overview', label: 'Resumen', icon: <LayoutDashboard size={20} /> },
    { id: 'my-properties', label: 'Mis Propiedades', icon: <Home size={20} /> },
    { id: 'publish', label: 'Publicar Inmueble', icon: <PlusCircle size={20} />, href: '/dashboard/publish' },
    { id: 'analytics', label: 'Estadísticas', icon: <BarChart3 size={20} /> },
    { id: 'profile', label: 'Mi Perfil', icon: <Settings size={20} /> },
  ];

  return (
    <main style={{ minHeight: '100vh', background: 'var(--surface-2)' }}>
      <Navbar />
      
      <div style={{ paddingTop: 'var(--header-height)', display: 'flex' }}>
        {/* Sidebar */}
        <aside style={{ 
          width: '280px', 
          height: 'calc(100vh - var(--header-height))', 
          background: 'var(--surface-1)', 
          borderRight: '1px solid var(--border)',
          position: 'fixed',
          left: 0,
          padding: '2rem 1.5rem'
        }}>
          <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.25rem' }}>
              {user.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>{user.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{user.role}</div>
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {sidebarItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => !item.href && setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--border-radius)',
                  cursor: 'pointer',
                  background: activeTab === item.id ? 'rgba(197, 160, 89, 0.1)' : 'transparent',
                  color: activeTab === item.id ? 'var(--accent)' : 'inherit',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {item.icon}
                  <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{item.label}</span>
                </div>
                {activeTab === item.id && <ChevronRight size={16} />}
              </div>
            ))}
          </nav>

          <div style={{ position: 'absolute', bottom: '2rem', left: '1.5rem', right: '1.5rem' }}>
            <button 
              onClick={() => { localStorage.clear(); window.location.href = '/'; }}
              style={{ 
                width: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                padding: '0.75rem 1rem', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                color: '#b91c1c'
              }}
            >
              <LogOut size={20} />
              <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>Cerrar Sesión</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <div style={{ marginLeft: '280px', flex: 1, padding: '3rem' }}>
          <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Bienvenido de nuevo, <span className="accent-text">{user.name.split(' ')[0]}</span></h1>
              <p style={{ color: 'var(--text-muted)' }}>Gestiona tus inmuebles y revisa el rendimiento de tus publicaciones.</p>
            </div>
            <Link href="/dashboard/publish">
              <PremiumButton style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <PlusCircle size={20} /> Publicar Nuevo
              </PremiumButton>
            </Link>
          </header>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { label: 'Propiedades Activas', value: '12', icon: <Home /> },
              { label: 'Vistas Totales', value: '1.240', icon: <BarChart3 /> },
              { label: 'Leads Generados', value: '45', icon: <User /> },
              { label: 'Valor Portafolio', value: '$4.2B', icon: <BarChart3 /> },
            ].map((stat, i) => (
              <div key={i} className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border)' }}>
                <div style={{ color: 'var(--accent)', marginBottom: '1rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>{stat.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Recent Activity / Properties Table */}
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Publicaciones Recientes</h2>
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              Aún no tienes propiedades publicadas. ¡Empieza creando tu primera publicación!
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
