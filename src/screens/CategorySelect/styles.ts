import { Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  height: ${Platform.OS === "ios" ? RFValue(113) : RFValue(90)}px;
  background: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${RFValue(19)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

interface CategoryProps {
  isActive: boolean;
}

export const Category = styled.TouchableOpacity<CategoryProps>`
  padding: ${RFValue(15)}px;
  flex-direction: row;
  align-items: center;
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.secondary_light : theme.colors.background};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: ${RFValue(16)}px;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`
  height: ${RFValue(1)}px;
  background: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.SafeAreaView``;

export const ContentFooter = styled.View`
  padding: 0 ${RFValue(24)}px;
  margin-bottom: ${Platform.OS === "ios" ? 0 : RFValue(20)}px;
`;
