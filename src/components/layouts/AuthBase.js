import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AuthBase = ({ children }) => {
  return (
    <div className='container mt-5 h-100 d-flex justify-content-center align-items-center'>
      <AuthWrapper className='mx-auto p-4 my-5'>
        {children}
        <Foot>
          <Link to='/'>
            <i className='fas fa-arrow-left mr-2' />
            Go back home
          </Link>
        </Foot>
      </AuthWrapper>
    </div>
  );
};

const Foot = styled.div`
  width: 100%;
  margin: 15px 5px;
  bottom: 0px;
  font-size: 0.7558rem;
`;

const AuthWrapper = styled.div`
  display: block;
  width: 600px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export default AuthBase;
