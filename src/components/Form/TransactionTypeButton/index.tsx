import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Icon, Title, ButtonTransactionType } from "./styles";

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

interface TransactionTypeButtonProps extends RectButtonProps {
  title: string;
  type: "up" | "down";
  isActive: boolean;
}

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: TransactionTypeButtonProps) {
  return (
    <Container testID={`Register-TransactionTypeButton-${type}`} isActive={isActive} type={type}>
      <ButtonTransactionType {...rest}>
        <Icon type={type} name={icons[type]} />
        <Title>{title}</Title>
      </ButtonTransactionType>
    </Container>
  );
}
