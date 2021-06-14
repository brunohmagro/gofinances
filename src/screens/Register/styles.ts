import { Platform } from "react-native";
import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background: ${({ theme }) => theme.colors.primary};
  height: ${Platform.OS === "ios" ? RFValue(113) : RFValue(90)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${RFValue(19)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
`;

export const Form = styled.View`
  flex: 1;
  justify-content: space-between;

  padding: ${RFValue(24)}px;
`;

export const Fields = styled.View``;

export const TransactionsType = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${RFValue(8)}px;
  margin-bottom: ${RFValue(16)}px;
`;
