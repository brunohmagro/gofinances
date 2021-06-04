import React from "react";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionsCard,
  DataTransaction,
} from "../../components/TransactionCard";

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
  Transactions,
  Title,
  TransactionsList,
} from "./styles";

export interface DataListProps extends DataTransaction {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      title: "Salário",
      amount: "R$ 12.000,00",
      date: "20/05/2021",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      type: "positive",
    },
    {
      id: "2",
      title: "Compra mercado",
      amount: "R$ 12.000,00",
      date: "20/05/2021",
      category: {
        name: "Vendas",
        icon: "coffee",
      },
      type: "negative",
    },
    {
      id: "3",
      title: "Aluguel",
      amount: "R$ 1.800,00",
      date: "20/05/2021",
      category: {
        name: "Vendas",
        icon: "shopping-bag",
      },
      type: "positive",
    },
  ];

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

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => <TransactionsCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
