"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize, Heart } from 'lucide-react';
import Link from 'next/link';
import { propertyApi } from '@/lib/api';
import Image from 'next/image';

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  isInitialFavorite?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  image,
  title,
  price,
  location,
  beds,
  baths,
  sqft,
  type,
  isInitialFavorite = false
}) => {
  const [isFavorite, setIsFavorite] = React.useState(isInitialFavorite);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await propertyApi.toggleFavorite(id);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite", error);
      // Redirect to login if unauthorized
      if ((error as any).response?.status === 401) {
        window.location.href = '/login';
      }
    }
  };

  return (
    <Link href={`/properties/${id}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="property-card"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--border-radius)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        border: '1px solid var(--border)'
      }}
    >
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
        <Image 
          src={image} 
          alt={title} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} 
        />
        <div style={{ 
          position: 'absolute', 
          top: '1rem', 
          left: '1rem', 
          background: 'var(--accent)', 
          color: 'white', 
          padding: '0.25rem 0.75rem', 
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }}>
          {type}
        </div>
        <button 
          onClick={handleFavorite}
          style={{ 
            position: 'absolute', 
            top: '1rem', 
            right: '1rem', 
            background: 'rgba(255,255,255,0.2)', 
            backdropFilter: 'blur(4px)',
            border: 'none',
            color: isFavorite ? '#ef4444' : 'white', 
            padding: '0.5rem', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          <Heart size={20} fill={isFavorite ? '#ef4444' : 'none'} />
        </button>
      </div>
      
      <div style={{ padding: '1.5rem' }}>
        <div style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
          {price}
        </div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {title}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
          <MapPin size={14} style={{ marginRight: '0.25rem' }} />
          {location}
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          borderTop: '1px solid var(--border)', 
          paddingTop: '1rem',
          color: 'var(--text-muted)',
          fontSize: '0.875rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Bed size={16} style={{ marginRight: '0.25rem' }} />
            {beds} <span style={{ marginLeft: '0.25rem' }}>Hab</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Bath size={16} style={{ marginRight: '0.25rem' }} />
            {baths} <span style={{ marginLeft: '0.25rem' }}>Baños</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Maximize size={16} style={{ marginRight: '0.25rem' }} />
            {sqft} <span style={{ marginLeft: '0.25rem' }}>m²</span>
          </div>
        </div>
      </div>
    </motion.div>
    </Link>
  );
};
