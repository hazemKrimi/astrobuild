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
    background: ${({ theme }) => theme.colors.white.main};
    display: grid;
    grid-template-columns: auto;
    row-gap: 0.5rem;
    border-radius: 3px;
    padding: 15px 30px 15px 15px;
    box-shadow: 1px 1px 15px 0px rgba(50, 59, 105, 0.25);

    li {
      cursor: pointer;
      display: flex;
      flex-direction: row;

      .icon {
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        svg path {
          stroke: ${({ theme }) => theme.colors.black.main};
        }

        &.avoid svg path {
          stroke: ${({ theme }) => theme.colors.error.main};
        }
      }
    }
  }
`;
