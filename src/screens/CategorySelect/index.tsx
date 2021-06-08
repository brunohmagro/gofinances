import React from "react";
import { FlatList } from "react-native";
import { Button } from "../../components/Form/Button";
import { categories } from "../../utils/categories";

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
  ContentFooter,
} from "./styles";

interface Category {
  key: string;
  name: string;
}

interface CategorySelectProps {
  category: string;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export const CategorySelect: React.FC<CategorySelectProps> = ({
  category,
  setCategory,
  closeSelectCategory,
}: CategorySelectProps) => (
  <Container>
    <Header>
      <Title>Categoria</Title>
    </Header>

    <FlatList
      data={categories}
      style={{ flex: 1, width: "100%" }}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <Category>
          <Icon name={item.icon} />
          <Name>{item.name}</Name>
        </Category>
      )}
      ItemSeparatorComponent={() => <Separator />}
    />

    <Footer>
      <ContentFooter>
        <Button title="Selecionar" />
      </ContentFooter>
    </Footer>
  </Container>
);
