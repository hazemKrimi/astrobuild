import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 35px 45px 35px 120px;

  .feature-type {
    background: ${({ theme }) => theme.colors.gray.dark};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
