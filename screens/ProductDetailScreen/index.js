import React from "react";
import { ScrollView, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import { addToCart } from "../../store/Cart";
import {
  ProductActions,
  ProductDescription,
  ProductImage,
  ProductPrice,
} from "./styles";

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(selectedProduct));
  };

  return (
    <ScrollView>
      <ProductImage source={{ uri: selectedProduct.imageUrl }} />
      <ProductActions>
        <Button
          title="Add to Cart"
          onPress={addToCartHandler}
          color={Colors.primary}
        />
      </ProductActions>
      <ProductPrice>${selectedProduct.price.toFixed(2)}</ProductPrice>
      <ProductDescription>{selectedProduct.description}</ProductDescription>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navigationData) => {
  const productTitle = navigationData.navigation.getParam("productTitle");

  return {
    headerTitle: productTitle,
  };
};

export default ProductDetailScreen;
