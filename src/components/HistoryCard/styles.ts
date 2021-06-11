import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ContainerProps {
  color: string;
}

export const Container = styled.View<ContainerProps>`
  background: ${({ theme }) => theme.colors.shape};

  flex-direction: row;
  justify-content: space-between;

  padding: ${RFValue(13)}px ${RFValue(24)}px;
  margin-bottom: ${RFValue(8)}px;

  border-radius: ${RFValue(5)}px;
  border-left-width: ${RFValue(5)}px;
  border-left-color: ${({ color, theme }) =>
    color ? color : theme.colors.success};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;
`;
