import React from "react";
import { HighlightCard } from "../../components/HighlightCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  SignOut,
  Icon,
  HighlightCards,
} from "./styles";

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/48726014?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Bruno</UserName>
            </User>
          </UserInfo>

          <SignOut onPress={() => console.log("Quero sair do app")}>
            <Icon name="power" />
          </SignOut>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          title="Entradas"
          amount="R$ 17.000,00"
          lastTransaction="Última entrada dia 13 de abril"
          type="up"
        />

        <HighlightCard
          title="Saídas"
          amount="R$ 200,00"
          lastTransaction="Última saída dia 19 de abril"
          type="down"
        />

        <HighlightCard
          title="Total"
          amount="R$ 16.800,00"
          lastTransaction="01 a 19 de abril"
          type="total"
        />
      </HighlightCards>
    </Container>
  );
}
