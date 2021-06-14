import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import AppleSvg from "../../assets/icons/apple.svg";
import GoogleSvg from "../../assets/icons/google.svg";
import LogoSvg from "../../assets/icons/logo.svg";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
} from "./styles";

export const SignIn: React.FC = () => (
  <Container>
    <Header>
      <TitleWrapper>
        <LogoSvg width={RFValue(120)} height={RFValue(68)} />

        <Title>
          Controle suas {"\n"}
          finanças de forma {"\n"}
          muito simples
        </Title>

        <SignInTitle>
          Faça seu login com{"\n"}
          uma das contas abaixo
        </SignInTitle>
      </TitleWrapper>
    </Header>

    <Footer></Footer>
  </Container>
);
