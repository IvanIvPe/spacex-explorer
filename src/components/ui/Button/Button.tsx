import React, { forwardRef } from 'react';
import styles from './Button.module.css';

function Slot({ 
  children, 
  ...props 
}: React.HTMLAttributes<HTMLElement> & { children: React.ReactNode }) {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ...children.props,
      className: [props.className, children.props.className].filter(Boolean).join(' '),
    });
  }
  
  if (React.Children.count(children) > 1) {
    React.Children.only(null);
  }
  
  return null;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'removeButton' | 'favorite';
  children: React.ReactNode;
  isFavorite?: boolean;

  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  variant = 'primary', 
  children, 
  className = '',
  isFavorite = false,
  asChild = false,
  ...props 
}, ref) => {
  const favoriteClass = variant === 'favorite' && isFavorite ? styles.favoriteActive : '';
  const combinedClassName = `${styles.button} ${styles[variant]} ${favoriteClass} ${className}`.trim();

  if (asChild) {
    return (
      <Slot className={combinedClassName} {...props}>
        {children}
      </Slot>
    );
  }
  
  return (
    <button 
      ref={ref}
      className={combinedClassName}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
