import React, { useState } from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Storage from "@react-native-async-storage/async-storage";

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

const schema = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor numérico")
    .required("O valor é obrigatório")
    .positive("O valor não pode ser negativo"),
});

export function Register() {
  const keyTransactions = "@gofinances:transactions";

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const [typeTransaction, setTypeTransaction] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleTransactionsTypeSelect = (type: "up" | "down"): void => {
    setTypeTransaction(type);
  };

  const handleOpenSelectCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseSelectCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  const handleRegister = async (form: FormData) => {
    if (!typeTransaction) {
      return Alert.alert("Selecione o tipo da transação");
    }

    if (category.key === "category") {
      return Alert.alert("Selecione uma categoria");
    }

    const data = {
      name: form.name,
      amount: form.amount,
      typeTransaction,
      category: category.key,
    };

    try {
      await Storage.setItem(keyTransactions, JSON.stringify(data));
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possivel salvar");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          enabled
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flex: 1 }}
          >
            <Form>
              <Fields>
                <InputForm
                  name="name"
                  control={control}
                  placeholder="Nome"
                  autoCapitalize="sentences"
                  autoCorrect={false}
                  error={errors.name && errors.name.message}
                />

                <InputForm
                  name="amount"
                  control={control}
                  placeholder="Preço"
                  keyboardType="numeric"
                  error={errors.amount && errors.amount.message}
                />
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
          </ScrollView>
        </KeyboardAvoidingView>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
