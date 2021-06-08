import React from "react";

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  DateTransaction,
} from "./style";

type Category = {
  name: string;
  icon: string;
};

export type DataTransaction = {
  title: string;
  amount: string;
  category: Category;
  date: string;
  type: "positive" | "negative";
};

interface TransactionsCardProps {
  data: DataTransaction;
}

export function TransactionsCard({ data }: TransactionsCardProps) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount type={data.type}>
        {data.type === "positive" ? data.amount : "- " + data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <DateTransaction>{data.date}</DateTransaction>
      </Footer>
    </Container>
  );
}