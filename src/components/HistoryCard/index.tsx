import React from "react";

import { Container, Title, Amount } from "./styles";

interface HistoryCardProps {
  color: string;
  title: string;
  amount: string;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({
  color,
  title,
  amount,
}: HistoryCardProps) => (
  <Container color={color}>
    <Title>{title}</Title>
    <Amount>{amount}</Amount>
  </Container>
);
