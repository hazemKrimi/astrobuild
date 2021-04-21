import styled, { css } from 'styled-components';

type WrapperProps = {
  color?: 'client' | 'productOwner' | 'developer' | 'admin';
  checked: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  display: inline-flex;
  flex-direction: row;
  user-select: none;

  .checkbox {
    cursor: pointer;
    border-radius: 3px;
    margin-right: 10px;
    width: 17px;
    height: 17px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
    }
  }

  ${({ checked, color, theme }) => {
    if (!checked)
      return css`
        .checkbox {
          border: 2px solid ${theme.colors.black.main};
          background: ${theme.colors.white.main};
        }
      `;
    switch (color) {
      case 'client':
        return css`
          .checkbox {
            border: none;
            background: ${theme.colors.client.main};
          }
        `;
      case 'productOwner':
        return css`
          .checkbox {
            border: none;
            background: ${theme.colors.productOwner.main};
          }
        `;
      case 'developer':
        return css`
          .checkbox {
            border: none;
            background: ${theme.colors.developer.main};
          }
        `;
      case 'admin':
        return css`
          .checkbox {
            border: none;
            background: ${theme.colors.admin.main};
          }
        `;
      default:
        return css`
          .checkbox {
            border: none;
            background: ${theme.colors.client.main};
          }
        `;
    }
  }}
`;
