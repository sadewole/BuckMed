import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Checkbox = ({
  checked = false,
  indeterminate = false,
  onChange,
  ...rest
}) => {
  return (
    <Box>
      <label className='checkbox'>
        <span className='checkbox__input'>
          <input
            type='checkbox'
            name='checkbox'
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            {...rest}
          />
          <span className='checkbox__control'>
            <span
              className={indeterminate ? 'indeterminate' : undefined}
            ></span>
            <span className={checked ? 'checkmark' : undefined}></span>
          </span>
        </span>
      </label>
    </Box>
  );
};

const Box = styled.div`
  .checkbox {
    display: grid;
    grid-template-columns: min-content auto;
    grid-gap: 0.5em;
    font-size: 1.2rem;
    color: var(--color);
    margin: 0 !important;
  }

  .checkbox__input {
    input {
      opacity: 0;
      width: 1em;
      height: 1em;
      cursor: pointer;
    }
  }

  .somechecks {
    width: 10px;
    height: 3px;
    background: #fff;
  }

  .checkmarks {
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .checkbox__control {
    position: relative;
    display: inline-grid;
    width: 1em;
    height: 1em;
    border-radius: 0.25em;
    border: 0.1em solid currentColor;
    cursor: pointer;

    .checkmark {
      margin-top: -5px;
      margin-left: 5px;
      width: 0.5rem;
      height: 1rem;
      border: solid currentColor;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      display: none;
      transition: all 0.1s ease-in 25ms;
    }

    .indeterminate {
      width: 90%;
      height: 3px;
      background: currentColor;
      border: 2px solid currentColor;
      margin: 5px auto;
    }
  }

  .checkbox__input {
    display: grid;
    grid-template-areas: 'checkbox';

    > * {
      grid-area: checkbox;
    }
  }

  .checkbox__input input:checked + .checkbox__control .checkmark {
    display: block;
  }

  .checkbox__input input:focus + .checkbox__control {
    box-shadow: 0 0 0 0.05em #fff, 0 0 0.15em 0.1em currentColor;
  }

  :root {
    --disabled: #959495;
  }

  .checkbox__input input:checkbox:disabled + .checkbox__control {
    color: var(--disabled);
  }

  .checkbox--disabled {
    color: var(--disabled);
  }
`;

Checkbox.propTypes = {
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Checkbox;
