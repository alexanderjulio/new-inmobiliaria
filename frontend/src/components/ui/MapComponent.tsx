"use client";

import React, { useState } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';

interface MapComponentProps {
  properties: any[];
  center?: { lat: number; lng: number };
}

// TODO: Replace with real Mapbox token
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWxleGFuZGVyanVsaW8iLCJhIjoiY2x3dzN4bnB6MDBreTJqcXp6amF6amZ6ayJ9.placeholder';

export const MapComponent: React.FC<MapComponentProps> = ({ properties, center }) => {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  
  const initialViewState = {
    longitude: center?.lng || -74.0721,
    latitude: center?.lat || 4.7110,
    zoom: 11
  };

  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 'var(--border-radius)', overflow: 'hidden' }}>
      <Map
        initialViewState={initialViewState}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <NavigationControl position="top-right" />
        
        {properties.map((prop) => (
          <Marker 
            key={prop.id} 
            longitude={prop.lng || -74.0721 + (Math.random() - 0.5) * 0.1} 
            latitude={prop.lat || 4.7110 + (Math.random() - 0.5) * 0.1}
            anchor="bottom"
            onClick={e => {
              e.originalEvent.stopPropagation();
              setSelectedProperty(prop);
            }}
          >
            <div style={{ 
              color: 'var(--accent)', 
              cursor: 'pointer',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            }}>
              <MapPin size={32} fill="rgba(197, 160, 89, 0.3)" />
            </div>
          </Marker>
        ))}

        {selectedProperty && (
          <Popup
            longitude={selectedProperty.lng || -74.0721}
            latitude={selectedProperty.lat || 4.7110}
            anchor="top"
            onClose={() => setSelectedProperty(null)}
            closeButton={false}
            style={{ padding: 0 }}
          >
            <div style={{ width: '200px', padding: '0.5rem', fontFamily: 'var(--font-sans)' }}>
              <img 
                src={selectedProperty.mainImage} 
                style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px', marginBottom: '0.5rem' }} 
              />
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{selectedProperty.title}</div>
              <div style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.875rem' }}>
                {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(selectedProperty.price)}
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};
