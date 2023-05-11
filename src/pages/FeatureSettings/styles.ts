import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 35px 45px 35px 120px;

  .feature-type {
    background: ${({ theme }) => theme.colors.gray.dark};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
