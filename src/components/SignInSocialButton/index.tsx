import React, { FunctionComponent, SVGAttributes } from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Button, ImageContainer, Title } from "./styles";

interface SignInSocialButtonProps extends RectButtonProps {
  title: string;
  svg: FunctionComponent<SVGAttributes<SVGElement>>;
}

export const SignInSocialButton: React.FC<SignInSocialButtonProps> = ({
  title,
  svg: Svg,
  ...rest
}: SignInSocialButtonProps) => (
  <Button {...rest}>
    <ImageContainer>
      <Svg />
    </ImageContainer>

    <Title>{title}</Title>
  </Button>
);
