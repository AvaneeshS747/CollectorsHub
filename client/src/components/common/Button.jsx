import React from 'react';
import PropTypes from 'prop-types';

/**
 * A reusable button component with consistent styling.
 * It can be customized via props.
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The content to display inside the button (e.g., text, an icon).
 * @param {Function} [props.onClick] - The function to call when the button is clicked.
 * @param {string} [props.type='button'] - The type of the button ('button', 'submit', 'reset').
 * @param {string} [props.variant='primary'] - The style variant ('primary', 'secondary').
 * @param {string} [props.className=''] - Additional CSS classes to apply to the button.
 * @returns {JSX.Element} The rendered button component.
 */
const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '' }) => {
  // Base styles that apply to all buttons
  const baseStyles = 'px-4 py-2 rounded-lg font-semibold text-white shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-transform transform hover:scale-105';

  // Styles specific to the button variant
  const variantStyles = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-400',
  };

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClasses}
    >
      {children}
    </button>
  );
};

// Define prop types for type-checking and better developer experience
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary']),
  className: PropTypes.string,
};

export default Button;
