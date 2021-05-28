import styled, { css } from 'styled-components';

type WrapperProps = {
  color?:
    | 'client'
    | 'productOwner'
    | 'developer'
    | 'admin'
    | 'success'
    | 'warning'
    | 'error'
    | 'black'
    | 'white';
  error?: boolean;
  deletable?: boolean;
  image: { name: string; src: string } | undefined;
};

export const Wrapper = styled.div<WrapperProps>`
  .preview {
    width: 175px;
    height: 325px;
    background: url(${({ image }) => image?.src});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    padding: 150px 30px;
    position: relative;

    &:hover {
      ${({ deletable, color, theme }) =>
        deletable &&
        css`
          border: 2px solid ${theme.colors[color || 'client'].main};
        `}

      .close {
        display: block;
      }
    }

    .close {
      background: ${({ color, theme }) => theme.colors[color || 'client'].main};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: -11.5px;
      right: -11.5px;
      padding: 5px;
      cursor: pointer;
      display: none;

      svg {
        width: 15px;
        height: 15px;
        stroke: ${({ theme }) => theme.colors.white.main};
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .upload {
    padding: 150px 30px;
    position: relative;
    border: 2px solid
      ${({ color, theme }) => theme.colors[color || 'client'].main};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    input {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;

      &::-webkit-file-upload-button {
        display: none;
      }
    }

    svg {
      width: 25px;
      height: 25px;

      path {
        stroke: ${({ color, theme }) => theme.colors[color || 'client'].main};
      }
    }
  }
`;
