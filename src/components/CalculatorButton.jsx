import React from 'react'

const CalculatorButton = ({ children, color='', className='', ...rest}) => {
    const colors = {
        grey: 'bg-gray-500',
        orange: 'bg-orange-400'
    }
    const isMultiCol = className.includes('col-span');

  return (
    <button className={`p-6 ${!isMultiCol ? 'aspect-square' : ''} rounded-3xl shadow-sm hover:brightness-90 hover:cursor-pointer active:brightness-85 transition-all duration-100 text-3xl max-sm:1xl text-white ${colors[color] || 'bg-gray-600'}
    ${className}`} 
        {...rest}>
        {children}
    </button>
  );
};

export default CalculatorButton;
