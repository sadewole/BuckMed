import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Checkbox = ({ checked, indeterminate, value }) => {
  return (
    <Box>
      <label className='checkbox'>
        <span className='checkbox__input'>
          <input
            type='checkbox'
            name='checkbox'
            checked={checked}
            value={value}
          />
          <span className={indeterminate ? 'checkmark' : 'somechecks'}></span>
          <span className='checkbox__control'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              aria-hidden='true'
              focusable='false'
            >
              <path
                fill='none'
                stroke='currentColor'
                stroke-width='3'
                d='M1.73 12.91l6.37 6.37L22.79 4.59'
              />
            </svg>
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
    display: inline-grid;
    width: 1em;
    height: 1em;
    border-radius: 0.25em;
    border: 0.1em solid currentColor;
  }

  .checkbox__input {
    display: grid;
    grid-template-areas: 'checkbox';

    > * {
      grid-area: checkbox;
    }
  }

  // .checkbox__control svg {
  //   cursor: pointer;
  //   transition: transform 0.1s ease-in 25ms;
  //   transform: scale(0);
  //   transform-origin: bottom left;
  // }

  .checkbox__input input:checked + .checkbox__control svg {
    transform: scale(1);
  }

  .checkbox__input input:focus + .checkbox__control {
    box-shadow: 0 0 0 0.05em #fff, 0 0 0.15em 0.1em currentColor;
  }

  .checkbox__input input:focus + .checkmarks {
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

Checkbox.propTypes = {};

export default Checkbox;
