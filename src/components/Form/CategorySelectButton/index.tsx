import React from "react";

import { Container, Category, Icon } from "./styles";

interface CategorySelectProps {
  title: string;
  isDefault: boolean;
  onPress: () => void;
}

export const CategorySelectButton: React.FC<CategorySelectProps> = ({
  title,
  isDefault,
  onPress,
}: CategorySelectProps) => (
  <Container onPress={onPress}>
    <Category titleDefault={isDefault}>{title}</Category>
    <Icon name="chevron-down" />
  </Container>
);
