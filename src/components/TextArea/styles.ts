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
  label?: string;
  fullWidth?: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  .textarea {
    width: inherit;
    height: inherit;
    border-radius: 5px;
    padding: 1rem;
    position: relative;
    color: ${({ theme }) => theme.colors.black.main};
    background: ${({ theme }) => theme.colors.white.main};
    background-clip: padding-box;
    border: 2px solid transparent;

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

  textarea {
    width: 100%;
    background: none;
    border: none;
    resize: none;
    color: ${({ theme }) => theme.colors.black.main};
  }

  ${({ color, theme }) => {
    switch (color) {
      case 'client':
        return css`
          .textarea:before {
            background: ${theme.colors.client.light};
          }
        `;
      case 'productOwner':
        return css`
          .textarea:before {
            background: ${theme.colors.productOwner.light};
          }
        `;
      case 'developer':
        return css`
          .textarea:before {
            background: ${theme.colors.developer.light};
          }
        `;
      case 'admin':
        return css`
          .textarea:before {
            background: ${theme.colors.admin.light};
          }
        `;
      case 'success':
        return css`
          .textarea:before {
            background: ${theme.colors.success.main};
          }
        `;
      case 'warning':
        return css`
          .textarea:before {
            background: ${theme.colors.warning.main};
          }
        `;
      case 'error':
        return css`
          .textarea:before {
            background: ${theme.colors.error.main};
          }
        `;
      case 'black':
        return css`
          .textarea:before {
            background: ${theme.colors.black.main};
          }
        `;
      case 'white':
        return css`
          .textarea:before {
            background: ${theme.colors.white.main};
          }
        `;
      default:
        return css`
          .textarea:before {
            background: ${theme.colors.client.light};
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

      .textarea:before {
        background: ${theme.colors.error.main};
      }
    `}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
      font-size: 1.25rem;
    `};
`;
