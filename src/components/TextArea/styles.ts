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
    padding: 2px;
    color: ${({ theme }) => theme.colors.black.main};

    div {
      background: ${({ theme }) => theme.colors.white.main};
      padding: 1rem;
      border-radius: 5px;
    }
  }

  .info {
    margin-bottom: 5px;
    display: grid;
    grid-template-columns: 1fr auto;
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
          .textarea {
            background: ${theme.colors.client.light};
          }
        `;
      case 'productOwner':
        return css`
          .textarea {
            background: ${theme.colors.productOwner.light};
          }
        `;
      case 'developer':
        return css`
          .textarea {
            background: ${theme.colors.developer.light};
          }
        `;
      case 'admin':
        return css`
          .textarea {
            background: ${theme.colors.admin.light};
          }
        `;
      case 'success':
        return css`
          .textarea {
            background: ${theme.colors.success.main};
          }
        `;
      case 'warning':
        return css`
          .textarea {
            background: ${theme.colors.warning.main};
          }
        `;
      case 'error':
        return css`
          .textarea {
            background: ${theme.colors.error.main};
          }
        `;
      case 'black':
        return css`
          .textarea {
            background: ${theme.colors.black.main};
          }
        `;
      case 'white':
        return css`
          .textarea {
            background: ${theme.colors.white.main};
          }
        `;
      default:
        return css`
          .textarea {
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

      .textarea {
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
