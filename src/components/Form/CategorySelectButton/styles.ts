import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton).attrs({
  activeOpacity: 0.7,
})`
  background: ${({ theme }) => theme.colors.shape};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: ${RFValue(5)}px;
  padding: ${RFValue(18)}px ${RFValue(16)}px;
  margin-bottom: ${RFValue(16)}px;
`;

interface CategoryProps {
  titleDefault: boolean;
}

export const Category = styled.Text<CategoryProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ titleDefault, theme }) =>
    titleDefault ? theme.colors.text : theme.colors.textDark};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;
