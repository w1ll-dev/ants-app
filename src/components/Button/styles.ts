import styled from 'styled-components/native';

export const Background = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.silver};
`;
