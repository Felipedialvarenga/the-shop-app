import React from "react";
import { Button } from "react-native";
import {
  ProductActions,
  ProductContainer,
  ProductImage,
  ProductPrice,
  ProductTitle,
} from "./styles";

const ProductItem = (props) => {
  return (
    <ProductContainer>
      <ProductImage source={{ uri: props.image }} />
      <ProductTitle>{props.title}</ProductTitle>
      <ProductPrice>${props.price.toFixed(2)}</ProductPrice>
      <ProductActions>
        <Button title="View Details" onPress={props.onViewDetail} />
        <Button title="To Cart" onPress={props.onAddToCart} />
      </ProductActions>
    </ProductContainer>
  );
};

export default ProductItem;
