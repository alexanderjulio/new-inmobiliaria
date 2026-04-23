"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { PremiumButton } from './PremiumButton';
import Link from 'next/link';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

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
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-serif)', letterSpacing: '1px' }}>
          ELITE<span className="accent-text">INMOBILIARIA</span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-menu">
          <Link href="/search?status=SALE" style={{ fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ventas</Link>
          <Link href="/search?status=RENT" style={{ fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Arriendos</Link>
          <Link href="#" style={{ fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Proyectos</Link>
          
          <div style={{ display: 'flex', gap: '1rem', marginLeft: '1rem' }}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                  <User size={18} className="accent-text" /> Mi Cuenta
                </Link>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <>
                <Link href="/register">
                  <PremiumButton variant="outline" style={{ padding: '0.5rem 1.25rem' }}>Registrarme</PremiumButton>
                </Link>
                <Link href="/login">
                  <PremiumButton style={{ padding: '0.5rem 1.25rem' }}>Ingresar</PremiumButton>
                </Link>
              </>
            )}
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
