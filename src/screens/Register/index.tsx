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
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../hooks/auth";

import { categories } from "../../utils/categories";
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

import { TRANSACTIONS_BASE_KEY } from "@env";

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
  const { user } = useAuth();
  const keyTransactions = `${TRANSACTIONS_BASE_KEY}:${user.id}`;

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const [typeTransaction, setTypeTransaction] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
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

    const iconCategory = categories.find(
      (categoryIcon) => categoryIcon.key === category.key
    );

    const newTransaction = {
      id: String(uuid.v4()),
      title: form.name,
      amount: form.amount,
      type: typeTransaction === "up" ? "positive" : "negative",
      category: {
        key: category.key,
        name: category.name,
        icon: iconCategory ? iconCategory.icon : "shopping-bag",
      },
      date: new Date(),
    };

    try {
      const transactions = await Storage.getItem(keyTransactions);
      const currentTransactions = transactions ? JSON.parse(transactions) : [];

      const newTransactions = [...currentTransactions, newTransaction];

      await Storage.setItem(keyTransactions, JSON.stringify(newTransactions));

      setTypeTransaction("");
      setCategory({
        key: "category",
        name: "Categoria",
      });
      reset();

      navigation.navigate("Listagem");
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
                  testID="button-register-category"
                  isDefault={category.name === "Categoria"}
                  title={category.name}
                  onPress={handleOpenSelectCategoryModal}
                />
              </Fields>

              <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
            </Form>
          </ScrollView>
        </KeyboardAvoidingView>

        <Modal testID="modal-register-category" visible={categoryModalOpen} animationType="slide">
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
