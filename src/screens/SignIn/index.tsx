import React, { useContext } from "react";
import { RFValue } from "react-native-responsive-fontsize";

import { AuthContext } from "../../AuthContext";

import AppleSvg from "../../assets/icons/apple.svg";
import GoogleSvg from "../../assets/icons/google.svg";
import LogoSvg from "../../assets/icons/logo.svg";

import { SignInSocialButton } from "../../components/SignInSocialButton";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

export const SignIn: React.FC = () => {
  const data = useContext(AuthContext);

  console.log(data);

  return (
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

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com o Google"
            svg={GoogleSvg}
            onPress={() => console.log("Quero entrar com o Google")}
          />
          <SignInSocialButton
            title="Entrar com Apple"
            svg={AppleSvg}
            onPress={() => console.log("Quero entrar com a Apple")}
          />
        </FooterWrapper>
      </Footer>
    </Container>
  );
};
