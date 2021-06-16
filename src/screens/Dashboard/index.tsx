import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Storage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionsCard,
  DataTransaction,
} from "../../components/TransactionCard";

import { useAuth } from "../../hooks/auth";

import { TRANSACTIONS_BASE_KEY } from "@env";

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
  LoadContainer,
  IconContainer,
  IconNoTransactions,
} from "./styles";

export interface DataListProps extends DataTransaction {
  id: string;
}

interface HighlightCardProps {
  entries: {
    amount: string;
    lastTransaction: string;
  };
  expensives: {
    amount: string;
    lastTransaction: string;
  };
  total: {
    amount: string;
    lastTransaction: string;
  };
}

export function Dashboard() {
  const { signOut, user } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightCardProps>({
    entries: {
      amount: Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(0),
      lastTransaction: "Opa, ainda não temos entradas",
    },
    expensives: {
      amount: Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(0),
      lastTransaction: "Boa! Ainda sem despesas",
    },
    total: {
      amount: Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(0),
      lastTransaction: "Vixi, sem valores por aqui 🙁",
    },
  });

  const keyTransactions = `${TRANSACTIONS_BASE_KEY}:${user.id}`;

  const theme = useTheme();

  const getLastTransactionDate = (
    collection: DataListProps[],
    type: "positive" | "negative"
  ): string => {
    return new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    ).toLocaleDateString("pt-BR", {
      month: "long",
      day: "2-digit",
    });
  };

  async function loadTransactions(): Promise<void> {
    const currentTransactions = await Storage.getItem(keyTransactions);

    const getTransactions: DataListProps[] = currentTransactions
      ? JSON.parse(currentTransactions)
      : ([] as DataListProps[]);

    let entriesTotal = 0;
    let expensive = 0;

    if (getTransactions.length > 0) {
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

      const lastTransactionEntries = getLastTransactionDate(
        transactionsTrataive,
        "positive"
      );

      const lastTransactionsExpensive = getLastTransactionDate(
        transactionsTrataive,
        "negative"
      );

      const totalInterval =
        lastTransactionEntries > lastTransactionsExpensive
          ? lastTransactionEntries !== "Invalid Date"
            ? `01 a ${lastTransactionEntries}`
            : `01 a ${lastTransactionsExpensive}`
          : lastTransactionsExpensive !== "Invalid Date"
          ? `01 a ${lastTransactionsExpensive}`
          : `01 a ${lastTransactionEntries}`;

      setHighlightData({
        entries: {
          amount: Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(Number(entriesTotal)),
          lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
        },
        expensives: {
          amount: Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(Number(expensive)),
          lastTransaction:
            lastTransactionsExpensive === "Invalid Date"
              ? "Nenhuma saída registrada"
              : `Última saída dia ${lastTransactionsExpensive}`,
        },
        total: {
          amount: Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(Number(entriesTotal) - Number(expensive)),
          lastTransaction: totalInterval,
        },
      });
    }
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>

              <SignOut onPress={signOut}>
                <Icon name="power" />
              </SignOut>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
              type="up"
            />

            <HighlightCard
              title="Saídas"
              amount={highlightData.expensives.amount}
              lastTransaction={highlightData.expensives.lastTransaction}
              type="down"
            />

            <HighlightCard
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
              type="total"
            />
          </HighlightCards>

          <Transactions>
            {transactions.length > 0 && (
              <>
                <Title>Listagem</Title>

                <TransactionsList
                  keyExtractor={(item) => item.id}
                  data={transactions}
                  renderItem={({ item }) => <TransactionsCard data={item} />}
                />
              </>
            )}

            {transactions.length === 0 && (
              <IconContainer>
                <IconNoTransactions name="dollar-sign" />
              </IconContainer>
            )}
          </Transactions>
        </>
      )}
    </Container>
  );
}
