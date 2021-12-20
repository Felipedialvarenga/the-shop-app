import React from "react";
import { Button, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
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
    <TouchableOpacity onPress={props.onViewDetail}>
      <ProductContainer>
        <ImageContainer>
          <ProductImage source={{ uri: props.image }} />
        </ImageContainer>
        <ProductDetails>
          <ProductTitle>{props.title}</ProductTitle>
          <ProductPrice>${props.price.toFixed(2)}</ProductPrice>
        </ProductDetails>
        <ProductActions>
          <Button
            title="View Details"
            onPress={props.onViewDetail}
            color={Colors.primary}
          />
          <Button
            title="To Cart"
            onPress={props.onAddToCart}
            color={Colors.primary}
          />
        </ProductActions>
      </ProductContainer>
    </TouchableOpacity>
  );
};
