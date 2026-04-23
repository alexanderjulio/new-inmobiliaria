"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Search, User } from 'lucide-react';
import { PremiumButton } from './PremiumButton';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 'var(--header-height)',
      display: 'flex',
      alignItems: 'center',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      background: isScrolled ? 'var(--glass-bg)' : 'transparent',
      backdropFilter: isScrolled ? 'var(--glass-blur)' : 'none',
      borderBottom: isScrolled ? '1px solid var(--glass-border)' : 'none',
      padding: '0 2rem'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        {/* Logo */}
        <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-serif)', letterSpacing: '1px' }}>
          ELITE<span className="accent-text">INMOBILIARIA</span>
        </div>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-menu">
          <a href="#" style={{ fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ventas</a>
          <a href="#" style={{ fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Arriendos</a>
          <a href="#" style={{ fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Proyectos</a>
          <a href="#" style={{ fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nosotros</a>
          
          <div style={{ display: 'flex', gap: '1rem', marginLeft: '1rem' }}>
            <PremiumButton variant="outline" style={{ padding: '0.5rem 1.25rem' }}>Publicar</PremiumButton>
            <PremiumButton style={{ padding: '0.5rem 1.25rem' }}>Ingresar</PremiumButton>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div style={{ display: 'none' }} className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};
