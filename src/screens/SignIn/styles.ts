import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  height: 70%;

  background: ${({ theme }) => theme.colors.primary};

  justify-content: flex-end;
  align-items: center;
`;

export const TitleWrapper = styled.View`
  align-items: center;
`;

export const LogoSvg = styled.View``;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(30)}px;

  text-align: center;

  margin-top: ${RFValue(45)}px;
`;

export const SignInTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(16)}px;

  text-align: center;

  margin-top: ${RFValue(80)}px;
  margin-bottom: ${RFValue(67)}px;
`;

export const Footer = styled.View`
  height: 30%;
  background: ${({ theme }) => theme.colors.secondary};
`;

export const FooterWrapper = styled.View`
  margin-top: ${RFPercentage(-4)}px;
  padding: 0 ${RFValue(32)}px;
`;
