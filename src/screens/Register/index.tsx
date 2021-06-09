import React, { useState } from "react";
import { Modal } from "react-native";
import { useForm } from "react-hook-form";

import { Input } from "../../components/Form/Input";
import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsType,
} from "./styles";

interface FormData {
  name: string;
  amount: string;
}

export function Register() {
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const [typeTransaction, setTypeTransaction] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { control, handleSubmit } = useForm();

  const handleTransactionsTypeSelect = (type: "up" | "down"): void => {
    setTypeTransaction(type);
  };

  const handleOpenSelectCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseSelectCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  const handleRegister = (form: FormData) => {
    const data = {
      name: form.name,
      amount: form.amount,
      typeTransaction,
      category: category.key,
    };

    console.log(data);
  };

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm name="name" control={control} placeholder="Nome" />
          <InputForm name="amount" control={control} placeholder="Preço" />
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

          <CategorySelectButton
            isDefault={category.name === "Categoria"}
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>

        <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}
