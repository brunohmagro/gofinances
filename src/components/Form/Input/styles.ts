import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface ContainerProps {
  active: boolean
}

export const Container = styled(TextInput)<ContainerProps>`
  padding: ${RFValue(16)}px ${RFValue(18)}px;

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.textDark};
  background: ${({ theme }) => theme.colors.shape};
  border-radius: ${RFValue(5)}px;

  margin-bottom: ${RFValue(8)}px;

  ${({ active, theme }) => active && css`
    border-width: ${RFValue(3)}px;
    border-color: ${theme.colors.attention};
  `}
`;
