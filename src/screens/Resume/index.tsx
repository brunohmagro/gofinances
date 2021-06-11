import React, { useCallback } from "react";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Storage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { addMonths, subMonths, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import {
  Container,
  Header,
  ContainerHistoryCard,
  ChartContainer,
  Title,
  MonthSelect,
  MonthSelectButton,
  SelectIcon,
  Month,
  LoadContainer,
} from "./styles";

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
  total: number;
  totalFormatted: string;
  color: string;
  percent: number;
  percentFormatted: string;
}

export const Resume: React.FC = () => {
  const theme = useTheme();
  const keyTransactions = "@gofinances:transactions";

  const [isLoading, setIsLoading] = useState(false);
  const [infoHistoryCard, setInfoHistoryCard] = useState<TotalByCategory[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (action: "next" | "previous"): void => {
    if (action === "next") {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  };

  async function loadData() {
    setIsLoading(true);
    const currentTransactions = await Storage.getItem(keyTransactions);
    const getTransactions: DataListProps[] = currentTransactions
      ? JSON.parse(currentTransactions)
      : ([] as DataListProps[]);

    const expensives = getTransactions.filter(
      (expensive) =>
        expensive.type === "negative" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensivesTotal = expensives.reduce((acc, expensice) => {
      return acc + Number(expensice.amount);
    }, 0);

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
          total: Number(categorySum),
          totalFormatted: Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(Number(categorySum)),
          color: category.color,
          percent: Number(((categorySum / expensivesTotal) * 100).toFixed(0)),
          percentFormatted:
            ((categorySum / expensivesTotal) * 100).toFixed(0) + "%",
        });
      }
    });

    setInfoHistoryCard(totalByCategory);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <ContainerHistoryCard
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange("previous")}>
              <SelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>
              {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
            </Month>

            <MonthSelectButton onPress={() => handleDateChange("next")}>
              <SelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={infoHistoryCard}
              x="percentFormatted"
              y="total"
              colorScale={infoHistoryCard.map((category) => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={70}
            />
          </ChartContainer>

          {infoHistoryCard.map((transaction) => {
            return (
              <HistoryCard
                key={transaction.key}
                color={transaction.color}
                title={transaction.name}
                amount={transaction.totalFormatted}
              />
            );
          })}
        </ContainerHistoryCard>
      )}
    </Container>
  );
};
