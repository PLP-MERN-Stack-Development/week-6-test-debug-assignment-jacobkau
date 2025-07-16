import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const sizeClasses = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
};

const Button = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  variant = 'primary',
  size = 'md',
  ...rest
}) => {
  const baseClasses = 'btn';
  const sizeClass = sizeClasses[size] || '';
  const variantClass = `btn-${variant}`;
  const disabledClass = disabled ? 'btn-disabled' : '';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(baseClasses, variantClass, sizeClass, disabledClass, className)}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
};

export default Button;
