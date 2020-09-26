import React from 'react';
import PropTypes from 'prop-types';

const TextInput = (props) => {
  let { name, label, type = 'text', placeholder = label } = props;

  return (
    <div className='form-group mt-2'>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className='form-control'
        {...props}
      />
    </div>
  );
};

const TextArea = (props) => {
  let { name, label, placeholder = label } = props;

  return (
    <div className='form-group mt-2'>
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        placeholder={placeholder}
        className='form-control'
        {...props}
      />
    </div>
  );
};

const SelectInput = ({ children, ...props }) => {
  let { name, label } = props;
  return (
    <div className='mt-2 form-group'>
      <label className='hidden block text-sm font-bold mb-2' htmlFor={name}>
        {label}
      </label>
      <select id={name} placeholder={label} name={name} {...props}>
        {children}
      </select>
    </div>
  );
};

TextInput.propTypes = TextArea.propTypes = SelectInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
};

export { TextInput, TextArea, SelectInput };
