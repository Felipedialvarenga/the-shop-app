import React from "react";
import { TouchableOpacity } from "react-native";
import {
  ImageContainer,
  ProductActions,
  ProductContainer,
  ProductDetails,
  ProductImage,
  ProductPrice,
  ProductTitle,
} from "./styles";

export const ProductItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <ProductContainer>
        <ImageContainer>
          <ProductImage source={{ uri: props.image }} />
        </ImageContainer>
        <ProductDetails>
          <ProductTitle>{props.title}</ProductTitle>
          <ProductPrice>${props.price.toFixed(2)}</ProductPrice>
        </ProductDetails>
        <ProductActions>{props.children}</ProductActions>
      </ProductContainer>
    </TouchableOpacity>
  );
};
