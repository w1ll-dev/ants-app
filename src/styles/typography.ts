import styled, { css } from 'styled-components/native';

export const ButtonLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.default};
  font-size: 20px;
`;

export const AntInfo = styled.Text<{ bold?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.default};
  font-size: 13px;

  ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;
    `}
`;
