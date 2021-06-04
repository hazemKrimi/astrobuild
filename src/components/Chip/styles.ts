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
  variant: 'outlined' | 'filled';
};

export const Wrapper = styled.div<WrapperProps>`
  padding: 5px 15px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ variant, color, theme }) =>
    variant === 'outlined'
      ? css`
          border: 2px solid ${theme.colors[color].main};
          color: ${theme.colors[color].main};
        `
      : css`
          background: ${theme.colors[color].main};
          color: ${theme.colors.white.main};
        `}
`;
