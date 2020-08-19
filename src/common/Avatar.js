import React from 'react';
import styled from 'styled-components';

const Avatar = (props) => {
  let {
    name = '',
    img = '',
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
      return 'avatar--' + size;
    }
    return null;
  };

  const nameAcronym = () => {
    if (name) {
      let matches = name.match(/\b(\w)/g);
      let acronym = matches.join('').substring(0, 2);
      return acronym;
    }
    return null;
  };

  const avatarTextColor = () => {
    let colors = ['grey', 'yellow', 'purple'];
    if (primary) {
      return 'avatar-text--yellow';
    }
    return 'avatar-text--' + colors[name.length % 3];
  };

  return (
    <AvatarContainer>
      <div className={`${sizeClass} avatar`}>
        {nameAcronym || img ? (
          <div className={rounded && 'avatar-rounded'}>
            <div class='avatar-icon'>
              {img ? (
                <div
                  style={{ 'background-image': `url('${img}')` }}
                  class='avatar-picture'
                />
              ) : (
                <span className={`${avatarTextColor} avatar-text`}>
                  {nameAcronym}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div
            style={{
              backgroundImage: `url()`,
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

    &--tiny {
      @include set-size(18px);
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
      width: 35px;
      height: 35px;
      line-height: 35px;
      font-size: 10px;
    }

    &--large {
      width: 55px;
      height: 55px;
      line-height: 55px;
      font-size: 16px;
    }

    &--extra {
      width: 168px;
      height: 168px;
      line-height: 168px;
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
