import React, { forwardRef } from 'react';
import styles from './Button.module.css';

interface SlotProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

function Slot({ children, ...props }: SlotProps) {
  if (!React.isValidElement(children)) {
    console.warn('Slot: Expected a single valid React element as child');
    return <>{children}</>;
  }

  if (React.Children.count(children) > 1) {
    throw new Error('Slot component expects exactly one child element');
  }

  const childProps = children.props as Record<string, unknown>;
  
  return React.cloneElement(children, {
    ...props,
    ...childProps,
    className: [props.className, childProps.className].filter(Boolean).join(' '),
    ref: (props as { ref?: React.Ref<unknown> }).ref ?? (children as { ref?: React.Ref<unknown> }).ref,
  } as React.Attributes);
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
      <Slot className={combinedClassName} ref={ref} {...props}>
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
