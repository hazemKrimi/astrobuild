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
    | 'gray'
    | 'white';
  error?: boolean;
  errorMessage?: string;
  type?: 'text' | 'email' | 'password' | 'file' | 'number';
  label: string;
  fullWidth?: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  .select {
    width: inherit;
    height: inherit;
    border-radius: 5px;
    padding: 1rem;
    position: relative;
    color: ${({ theme }) => theme.colors.black.main};
    background: ${({ theme }) => theme.colors.white.main};
    background-clip: padding-box;
    border: 2px solid transparent;
    display: flex;
    flex-direction: row;
    align-items: center;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: inherit;
      height: inherit;
      z-index: -1;
      margin: -2px;
      border-radius: inherit;
    }
  }

  .info {
    margin-bottom: 5px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;

    p {
      background: ${({ theme }) => theme.colors.gray.dark};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .label {
      justify-self: flex-start;
    }

    .error-message {
      justify-self: flex-end;
    }
  }

  select {
    width: 100%;
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.black.main};
    background-image: url('../../assets/icons/chevron-down.svg');
  }

  .icon {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
  }

  .icon.left {
    margin-right: 0.5rem;
  }

  ${({ color, theme }) => {
    switch (color) {
      case 'client':
        return css`
          .select:before {
            background: ${theme.colors.client.light};
          }

          .icon svg path {
            stroke: ${theme.colors.client.main};
          }
        `;
      case 'productOwner':
        return css`
          .select:before {
            background: ${theme.colors.productOwner.light};
          }

          .icon svg path {
            stroke: ${theme.colors.productOwner.main};
          }
        `;
      case 'developer':
        return css`
          .select:before {
            background: ${theme.colors.developer.light};
          }

          .icon svg path {
            stroke: ${theme.colors.developer.main};
          }
        `;
      case 'admin':
        return css`
          .select:before {
            background: ${theme.colors.admin.light};
          }

          .icon svg path {
            stroke: ${theme.colors.admin.main};
          }
        `;
      case 'success':
        return css`
          .select:before {
            background: ${theme.colors.success.main};
          }

          .icon svg path {
            stroke: ${theme.colors.success.main};
          }
        `;
      case 'warning':
        return css`
          .select:before {
            background: ${theme.colors.warning.main};
          }

          .icon svg path {
            stroke: ${theme.colors.warning.main};
          }
        `;
      case 'error':
        return css`
          .select:before {
            background: ${theme.colors.error.main};
          }

          .icon svg path {
            stroke: ${theme.colors.error.main};
          }
        `;
      case 'black':
        return css`
          .select:before {
            background: ${theme.colors.black.main};
          }

          .icon svg path {
            stroke: ${theme.colors.black.main};
          }
        `;
      case 'white':
        return css`
          .select:before {
            background: ${theme.colors.white.main};
          }

          .icon svg path {
            stroke: ${theme.colors.white.main};
          }
        `;
      default:
        return css`
          .select:before {
            background: ${theme.colors.client.light};
          }

          .icon svg path {
            stroke: ${theme.colors.client.main};
          }
        `;
    }
  }}

  ${({ error, theme }) =>
    error &&
    css`
      .info p {
        background: ${theme.colors.error.main};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .select:before {
        background: ${theme.colors.error.main};
      }

      .icon svg path {
        stroke: ${theme.colors.error.main};
      }
    `}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
      font-size: 1.25rem;

      .icon svg {
        width: 1.25rem;
        height: 1.25rem;
      }
    `};
`;