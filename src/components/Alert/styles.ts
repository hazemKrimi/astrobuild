import styled, { css } from 'styled-components';

type WrapperProps = {
  color:
    | 'client'
    | 'productOwner'
    | 'developer'
    | 'admin'
    | 'success'
    | 'warning'
    | 'error';
};

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: auto;
  padding: 0.938rem;
  border-radius: 10px;

  ${({ color, theme }) => {
    switch (color) {
      case 'client':
        return css`
          border: 1px solid ${theme.colors.client.main};
          color: ${theme.colors.client.main};
          background: ${theme.colors.client.light};
        `;
      case 'productOwner':
        return css`
          border: 1px solid ${theme.colors.productOwner.main};
          color: ${theme.colors.productOwner.main};
          background: ${theme.colors.productOwner.light};
        `;
      case 'developer':
        return css`
          border: 1px solid ${theme.colors.developer.main};
          color: ${theme.colors.developer.main};
          background: ${theme.colors.developer.light};
        `;
      case 'admin':
        return css`
          border: 1px solid ${theme.colors.admin.main};
          color: ${theme.colors.admin.main};
          background: ${theme.colors.admin.light};
        `;
      case 'success':
        return css`
          border: 1px solid ${theme.colors.success.main};
          color: ${theme.colors.success.main};
          background: ${theme.colors.success.light};
        `;
      case 'warning':
        return css`
          border: 1px solid ${theme.colors.warning.main};
          color: ${theme.colors.warning.main};
          background: ${theme.colors.warning.light};
        `;
      case 'error':
        return css`
          border: 1px solid ${theme.colors.error.main};
          color: ${theme.colors.error.main};
          background: ${theme.colors.error.light};
        `;
      default:
        return css`
          border: 1px solid ${theme.colors.client.main};
          color: ${theme.colors.client.main};
          background: ${theme.colors.client.light};
        `;
    }
  }}
`;
