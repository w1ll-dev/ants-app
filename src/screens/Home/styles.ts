import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
`;

export const Separator = styled.View`
  height: 15px;
`;

export const Footer = styled.View`
  justify-self: flex-end;
  padding: 25px 20px 0px;
`;
