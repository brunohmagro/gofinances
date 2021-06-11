import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
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

export interface DataListProps extends DataTransaction {
  id: string;
}

interface HighlightCardProps {
  entries: {
    amount: string;
  };
  expensives: {
    amount: string;
  };
  total: {
    amount: string;
  };
}

export function Dashboard() {
  const keyTransactions = "@gofinances:transactions";
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightCardProps>(
    {} as HighlightCardProps
  );

  async function loadTransactions() {
    const currentTransactions = await Storage.getItem(keyTransactions);

    const getTransactions: DataListProps[] = currentTransactions
      ? JSON.parse(currentTransactions)
      : ([] as DataListProps[]);

    let entriesTotal = 0;
    let expensive = 0;

    if (getTransactions) {
      const transactionsTrataive = getTransactions.map((transaction) => {
        if (transaction.type === "positive") {
          entriesTotal += Number(transaction.amount);
        } else {
          expensive += Number(transaction.amount);
        }

        return {
          ...transaction,
          dateFormatted: new Date(transaction.date).toLocaleDateString(
            "pt-BR",
            { year: "2-digit", month: "2-digit", day: "2-digit" }
          ),
          amountFormatted: Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(Number(transaction.amount)),
        };
      });

      setTransactions(transactionsTrataive);
    }

    setHighlightData({
      entries: {
        amount: Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(entriesTotal)),
      },
      expensives: {
        amount: Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(expensive)),
      },
      total: {
        amount: Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(entriesTotal) - Number(expensive)),
      },
    });

    console.log(transactions);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

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
          amount={highlightData.entries.amount}
          lastTransaction="Última entrada dia 13 de abril"
          type="up"
        />

        <HighlightCard
          title="Saídas"
          amount={highlightData.expensives.amount}
          lastTransaction="Última saída dia 19 de abril"
          type="down"
        />

        <HighlightCard
          title="Total"
          amount={highlightData.total.amount}
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
