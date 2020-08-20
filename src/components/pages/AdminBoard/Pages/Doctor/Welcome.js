import React from 'react';
import styled from 'styled-components';
import { welcomeClip } from '../../../../../static/images/admins';

const Welcome = () => {
  return (
    <WelcomeMessage className='container-fluid'>
      <div className='welcome-message__container d-flex align-items-center justify-content-between'>
        <div className='text-container'>
          <h1>Hello Shaun!</h1>
          <p>
            Here are your important tasks, updates and alerts. <br /> You can
            set your in app preferences here
          </p>
        </div>

        <img src={welcomeClip} alt='' />
      </div>
    </WelcomeMessage>
  );
};

const WelcomeMessage = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 30px;
  margin-bottom: 10px;
  width: 100%;

  .welcome-message__container {
    padding: 10px 20px;
    height: 250px;
    background: mediumslateblue;
    color: #fff;
    border-radius: 7px;

    .text-container {
      padding-left: 10px;
      flex-grow: 1;

      h1 {
        font-size: 3.5rem;
      }
      p {
        font-size: 1rem;
      }
    }

    img {
      width: 500px;
      height: 650px;
    }
  }
`;

export default Welcome;
