import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Avatar = (props) => {
  const [avatarSize, setAvatarSize] = useState('');
  const [avatarName, setAvatarName] = useState('');
  const [avatarColor, setAvatarColor] = useState('');
  let {
    name = '',
    img = '',
    imgBackground = '',
    size = null,
    rounded = true,
    primary = true,
  } = props;

  const sizeClass = () => {
    const validator = () =>
      ['tiny', 'smaller', 'small', 'medium', 'large', 'extra', null].includes(
        size
      );
    if (validator) {
      setAvatarSize('avatar--' + size);
      return;
    }
    return null;
  };

  const nameAcronym = () => {
    if (name) {
      let matches = name.match(/\b(\w)/g);
      let acronym = matches.join('').substring(0, 2);

      setAvatarName(acronym);
      return;
    }
    return null;
  };

  const avatarTextColor = () => {
    let colors = ['grey', 'yellow', 'purple'];
    if (primary) {
      setAvatarColor('avatar-text--yellow');
      return;
    }
    setAvatarColor('avatar-text--' + colors[name.length % 3]);
    return;
  };

  useEffect(() => {
    avatarTextColor();
    nameAcronym();
    sizeClass();
  });

  return (
    <AvatarContainer>
      <div className={`${avatarSize} avatar`}>
        {avatarName || img || imgBackground ? (
          <div className={`avatar-icon ${rounded && 'avatar-rounded'}`}>
            {imgBackground ? (
              <div
                style={{ backgroundImage: `url('${imgBackground}')` }}
                className='avatar-picture'
              />
            ) : img ? (
              <img src={img} alt='' className='avatar-picture' />
            ) : (
              <span className={`${avatarColor} avatar-text`}>{avatarName}</span>
            )}
          </div>
        ) : (
          <div
            style={{
              backgroundImage: `url(../static/images/avatar-icon.png)`,
              backgroundColor: '#ffffff',
              border: 'solid 1px #c6c6c6',
            }}
            className={`${'avatar-rounded' && rounded}  avatar-fallback`}
          />
        )}
      </div>
    </AvatarContainer>
  );
};

const AvatarContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  margin: 0;

  & > .avatar-info {
    position: absolute;
    width: 88%;
    height: 88%;
    z-index: 0;
    top: 0;
    right: 0;
  }

  &--info {
    padding-top: 27px;
    padding-right: 27px;
  }

  .avatar {
    position: relative;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: 0.1px;
    position: relative;

    &-text {
      width: 100%;
      height: 100%;
      display: block;
      text-transform: uppercase;

      &--purple {
        background-color: #9013fe;
        color: #fff;
      }

      &--yellow {
        background-color: #f5a623;
        color: #000;
      }

      &--grey {
        background-color: #c9c9c9;
        color: #000;
      }
    }

    &--tiny {
      width: 18px;
      height: 18px;
      line-height: 18px;
      font-size: 7px;
    }

    &--smaller {
      width: 25px;
      height: 25px;
      line-height: 25px;
      font-size: 9px;
    }

    &--small {
      width: 30px;
      height: 30px;
      line-height: 30px;
      font-size: 10px;
    }

    &--medium {
      width: 50px;
      height: 50px;
      line-height: 50px;
      font-size: 10px;
    }

    &--large {
      width: 100px;
      height: 100px;
      line-height: 85px;
      font-size: 16px;
    }

    &--extra {
      width: 168px;
      height: 168px;
      line-height: 150px;
      font-size: 48px;
    }

    & > .avatar-icon {
      width: 100%;
      height: 100%;
      overflow: hidden;

      & > .avatar-picture {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center center;
      }
    }

    & > .avatar-fallback {
      background-size: 70%;
      background-position: center center;
      background-repeat: no-repeat;
      height: 100%;
      width: 100%;
    }

    & > .avatar-rounded {
      border-radius: 100%;
    }
  }
`;

export default Avatar;
