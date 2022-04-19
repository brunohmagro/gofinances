import React from "react";

import { Container, Category, Icon } from "./styles";

interface CategorySelectProps {
  title: string;
  isDefault: boolean;
  onPress: () => void;
  testID?: string;
}

export const CategorySelectButton: React.FC<CategorySelectProps> = ({
  title,
  isDefault,
  onPress,
  testID,
}: CategorySelectProps) => (
  <Container testID={testID} onPress={onPress}>
    <Category titleDefault={isDefault}>{title}</Category>
    <Icon name="chevron-down" />
  </Container>
);
