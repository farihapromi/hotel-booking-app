import React from 'react';

export const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className='flex gap-3 items-center cursor-pointer'>
      <input
        type='checkbox'
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
        className={`w-5 h-5 rounded border-gray-300 focus:ring-2 focus:ring-blue-400 
                    accent-blue-500`} // ✅ this makes the checkmark blue
      />
      <span className='select-none text-gray-700 font-light'>{label}</span>
    </label>
  );
};

export const RadioButton = ({
  label,
  selected = false,
  onChange = () => {},
}) => {
  return (
    <label className='flex gap-3 items-center cursor-pointer'>
      <input
        type='radio'
        name='sortOption'
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
        className={`w-5 h-5 rounded-full border-gray-300 focus:ring-2 focus:ring-blue-400 
                    accent-blue-500`} // ✅ makes the radio dot blue
      />
      <span className='select-none text-gray-700 font-light'>{label}</span>
    </label>
  );
};
