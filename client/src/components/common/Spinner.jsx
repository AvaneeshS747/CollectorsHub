import React from 'react';
import PropTypes from 'prop-types';

/**
 * A reusable loading spinner component.
 * It can be customized with different sizes.
 * @param {object} props - The properties for the component.
 * @param {string} [props.size='md'] - The size of the spinner ('sm', 'md', 'lg').
 * @param {string} [props.className=''] - Additional CSS classes to apply to the container.
 * @returns {JSX.Element} The rendered spinner component.
 */
const Spinner = ({ size = 'md', className = '' }) => {
  // Map size prop to corresponding Tailwind CSS classes
  const sizeClasses = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4',
  };

  const spinnerClasses = `
    animate-spin 
    rounded-full 
    border-indigo-600 
    border-t-transparent 
    ${sizeClasses[size]}
  `;

  return (
    <div role="status" className={`flex justify-center items-center ${className}`}>
      <div className={spinnerClasses}></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

// Define prop types for type-checking.
Spinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Spinner;
