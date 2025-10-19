import React from 'react';
import PropTypes from 'prop-types';

/**
 * A reusable input field component with a label and error message display.
 * @param {object} props - The properties for the component.
 * @param {string} props.label - The text for the input field's label.
 * @param {string} props.name - The name attribute for the input element, used to identify the form data.
 * @param {string} [props.type='text'] - The type of the input ('text', 'email', 'password', etc.).
 * @param {string} props.value - The current value of the input field.
 * @param {Function} props.onChange - The function to call when the input value changes.
 * @param {string} [props.placeholder=''] - The placeholder text for the input field.
 * @param {string} [props.error=null] - An error message to display below the input field.
 * @param {string} [props.className=''] - Additional CSS classes for the component's container.
 * @returns {JSX.Element} The rendered input field component.
 */
const InputField = ({ label, name, type = 'text', value, onChange, placeholder = '', error = null, className = '' }) => {
  const containerClasses = `mb-4 ${className}`;
  const inputClasses = `w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-colors ${error ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-indigo-500'}`;

  return (
    <div className={containerClasses}>
      <label htmlFor={name} className="block text-gray-700 font-semibold mb-2">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${name}-error` : null}
      />
      {error && (
        <p id={`${name}-error`} className="text-red-500 text-sm mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

// Define prop types for type-checking
InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
};

export default InputField;
