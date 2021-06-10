import React, { useEffect, useState } from "react";
import Storage from "@react-native-async-storage/async-storage";

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
import { date } from "yup/lib/locale";

export interface DataListProps extends DataTransaction {
  id: string;
}

export function Dashboard() {
  const keyTransactions = "@gofinances:transactions";
  const [transactions, setTransactions] = useState<DataListProps[]>([]);

  async function loadTransactions() {
    const currentTransactions = await Storage.getItem(keyTransactions);

    const getTransactions: DataListProps[] = currentTransactions
      ? JSON.parse(currentTransactions)
      : false;

    if (getTransactions) {
      const transactionsTrataive = getTransactions.map((transaction) => {
        return {
          ...transaction,
          dateFormatted: new Date(transaction.date).toLocaleDateString(
            "pt-BR",
            { year: "numeric", month: "2-digit", day: "2-digit" }
          ),
          amountFormatted: Number(transaction.amount).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
        };
      });

      setTransactions(transactionsTrataive);
    }
  }

  useEffect(() => {
    loadTransactions();
  }, []);

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
          data={transactions}
          renderItem={({ item }) => <TransactionsCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
