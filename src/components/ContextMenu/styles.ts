import styled from 'styled-components';

type WrapperProps = {
  top: number;
  left: number;
};

export const Wrapper = styled.div<WrapperProps>`
  ul {
    position: fixed;
    top: ${({ top }) => top}px;
    left: ${({ left }) => left}px;
    background: #1f1b1b;
    display: grid;
    grid-template-columns: auto;
    row-gap: 0.5rem;
    color: ${({ theme }) => theme.colors.white.main};
    border-radius: 3px;
    padding: 5px 20px 5px 10px;

    li {
      cursor: pointer;
    }
  }
`;
