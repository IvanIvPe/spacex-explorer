import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'removeButton' | 'favorite';
  isFavorite?: boolean;
}

const Button = ({
  variant = 'primary',
  isFavorite = false,
  className,
  ...props
}: ButtonProps) => {
  const favoriteClass = variant === 'favorite' && isFavorite ? styles.favoriteActive : '';
  const combinedClassName = [
    styles.button,
    styles[variant],
    favoriteClass,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <button 
      className={combinedClassName}
      {...props}
    />
  );
};

Button.displayName = 'Button';

export default Button;
