import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Title } from "./style";

interface ButtonProps extends RectButtonProps {
  title: string;
  onPress: () => void;
  test: string;
}

export function Button({ title, onPress, test, ...rest }: ButtonProps) {
  return (
    <Container testID={test} onPress={onPress} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
