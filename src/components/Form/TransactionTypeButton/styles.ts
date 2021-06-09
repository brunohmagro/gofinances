import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

interface ContainerProps {
  isActive: boolean;
  type: "up" | "down";
}

export const Container = styled.View<ContainerProps>`
  width: 48%;

  border: ${RFValue(1)}px solid ${({ theme }) => theme.colors.text_light};
  border-radius: ${RFValue(5)}px;

  ${({ isActive, type, theme }) =>
    isActive &&
    type === "up" &&
    css`
      background: ${theme.colors.success_light};
      border: 0;
    `}

  ${({ isActive, type, theme }) =>
    isActive &&
    type === "down" &&
    css`
      background: ${theme.colors.attention_light};
      border: 0;
    `}
`;

interface IconProps {
  type: "up" | "down";
}

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: ${RFValue(8)}px;
  color: ${({ type, theme }) =>
    type === "up" ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const ButtonTransactionType = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: ${RFValue(16)}px;
`;
