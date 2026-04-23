"use client";

import React from 'react';

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseClass = "premium-button";
  const variantClass = variant === 'secondary' ? 'secondary' : variant === 'outline' ? 'outline' : '';
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button 
      className={`${baseClass} ${variantClass} ${widthClass} ${className}`}
      style={{
        width: fullWidth ? '100%' : 'auto',
      }}
      {...props}
    >
      {children}
    </button>
  );
};
