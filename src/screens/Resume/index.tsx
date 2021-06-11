import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Storage from "@react-native-async-storage/async-storage";

import { Container, Header, ContainerHistoryCard, Title } from "./styles";

import { HistoryCard } from "../../components/HistoryCard";
import { DataTransaction } from "../../components/TransactionCard";
import { categories } from "../../utils/categories";
import { useState } from "react";

interface DataListProps extends DataTransaction {
  id: string;
}

interface TotalByCategory {
  key: string;
  name: string;
  total: string;
  color: string;
}

export const Resume: React.FC = () => {
  const keyTransactions = "@gofinances:transactions";

  const [infoHistoryCard, setInfoHistoryCard] = useState<TotalByCategory[]>([]);

  async function loadData() {
    const currentTransactions = await Storage.getItem(keyTransactions);
    const getTransactions: DataListProps[] = currentTransactions
      ? JSON.parse(currentTransactions)
      : ([] as DataListProps[]);

    const expensives = getTransactions.filter(
      (expensive) => expensive.type === "negative"
    );

    const totalByCategory: TotalByCategory[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive) => {
        if (expensive.category.key === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(Number(categorySum)),
          color: category.color,
        });
      }
    });

    setInfoHistoryCard(totalByCategory);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <ContainerHistoryCard>
        {infoHistoryCard.map((transaction) => {
          return (
            <HistoryCard
              key={transaction.key}
              color={transaction.color}
              title={transaction.name}
              amount={transaction.total}
            />
          );
        })}
      </ContainerHistoryCard>
    </Container>
  );
};
