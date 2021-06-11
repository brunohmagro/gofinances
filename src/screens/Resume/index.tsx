import React from "react";

import { Container, Header, Title } from "./styles";

import { HistoryCard } from "../../components/HistoryCard";

export const Resume: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <HistoryCard color="#12A454" title="Entradas" amount="R$ 16.000,00" />
    </Container>
  );
};
