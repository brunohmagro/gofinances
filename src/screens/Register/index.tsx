import React, { useState } from "react";

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../../components/Form/CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsType,
} from "./styles";

export function Register() {
  const [typeTransaction, setTypeTransaction] = useState("");

  const handleTransactionsTypeSelect = (type: "up" | "down"): void => {
    setTypeTransaction(type);
  };

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <TransactionsType>
            <TransactionTypeButton
              title="Entrada"
              type="up"
              isActive={typeTransaction === "up"}
              onPress={() => handleTransactionsTypeSelect("up")}
            />
            <TransactionTypeButton
              title="Saída"
              type="down"
              isActive={typeTransaction === "down"}
              onPress={() => handleTransactionsTypeSelect("down")}
            />
          </TransactionsType>

          <CategorySelect title="Categoria" />
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
