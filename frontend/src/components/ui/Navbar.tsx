"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, Home, Search as SearchIcon, Building } from 'lucide-react';
import { PremiumButton } from './PremiumButton';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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

  const navLinks = [
    { label: 'Ventas', href: '/search?status=SALE', icon: <Home size={20} /> },
    { label: 'Arriendos', href: '/search?status=RENT', icon: <SearchIcon size={20} /> },
    { label: 'Proyectos', href: '#', icon: <Building size={20} /> },
  ];

  return (
    <>
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
        background: isScrolled || mobileMenuOpen ? 'var(--glass-bg)' : 'transparent',
        backdropFilter: isScrolled || mobileMenuOpen ? 'var(--glass-blur)' : 'none',
        borderBottom: isScrolled || mobileMenuOpen ? '1px solid var(--glass-border)' : 'none',
        padding: '0 2rem'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          {/* Logo */}
          <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-serif)', letterSpacing: '1px' }}>
            ELITE<span className="accent-text">INMOBILIARIA</span>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-menu">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} style={{ fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {link.label}
              </Link>
            ))}
            
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

          {/* Mobile Menu Toggle */}
          <button 
            className="show-mobile"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 'var(--header-height)',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'var(--surface-1)',
              zIndex: 999,
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {navLinks.map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '1rem' }}
                >
                  <span className="accent-text">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <PremiumButton fullWidth>Ir al Panel</PremiumButton>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    style={{ background: 'none', border: '1px solid #ef4444', color: '#ef4444', padding: '1rem', borderRadius: 'var(--border-radius)', fontWeight: 600 }}
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <PremiumButton fullWidth>Ingresar</PremiumButton>
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    <PremiumButton fullWidth variant="outline">Registrarme</PremiumButton>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

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
