import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * A reusable modal component that displays content in a layer above the page.
 * It includes an overlay and can be closed by clicking the overlay, a close button, or pressing the Escape key.
 * @param {object} props - The properties for the component.
 * @param {boolean} props.isOpen - Whether the modal is currently open.
 * @param {Function} props.onClose - The function to call to close the modal.
 * @param {React.ReactNode} props.children - The content to display inside the modal.
 * @param {string} [props.title] - An optional title to display at the top of the modal.
 * @returns {JSX.Element|null} The rendered modal component or null if it's not open.
 */
const Modal = ({ isOpen, onClose, children, title }) => {
  // This effect adds an event listener to the window to handle the 'Escape' key press.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    // Cleanup function to remove the event listener when the component unmounts or re-renders.
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]); // The effect re-runs if isOpen or onClose changes.

  // If the modal is not supposed to be open, we render nothing.
  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Semi-transparent overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-60"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal content panel */}
      <div className="relative bg-white w-full max-w-lg mx-auto rounded-lg shadow-xl p-6 z-10">
        {/* Modal Header */}
        <div className="flex justify-between items-start mb-4">
          {title && (
            <h2 id="modal-title" className="text-xl font-bold text-gray-900">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            {/* A simple 'X' icon made with SVG */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Modal Body where the main content goes */}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

// Define prop types for type-checking and developer guidance.
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Modal;
