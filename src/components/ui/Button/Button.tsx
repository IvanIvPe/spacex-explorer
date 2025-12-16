import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'removeButton' | 'favorite';
  children: React.ReactNode;
  isFavorite?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  isFavorite = false,
  ...props 
}) => {
  const favoriteClass = variant === 'favorite' && isFavorite ? styles.favoriteActive : '';
  
  return (
    <button 
      className={`${styles.button} ${styles[variant]} ${favoriteClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
